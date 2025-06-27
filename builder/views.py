from django.shortcuts import render, get_object_or_404,redirect
from .models import CustomPage, PageSection


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.conf import settings
import os
from mimetypes import guess_type
from .models import WebSection
def render_custom_page(request, slug):
    page = get_object_or_404(CustomPage, slug=slug)
    all_page_sections = page.pagesection_set.select_related('section').order_by('order')

    header_section = None
    footer_section = None
    middle_sections = []

    for ps in all_page_sections:
        section_name = (ps.section.name or "").lower()
        if "header" in section_name and not header_section:
            header_section = ps.section
        elif "footer" in section_name and not footer_section:
            footer_section = ps.section
        else:
            middle_sections.append({
                "section": ps.section,  # include full section object
                "id": ps.section.id,
                "name": ps.section.name,
            })

    return render(request, 'builder/custom_page.html', {
        "page": page,
        "header_section": header_section,
        "footer_section": footer_section,
        "sections": middle_sections,
    })


@csrf_exempt
def upload_to_static(request, section_id):
    print("=== Upload Request ===")
    print("Method:", request.method)
    print("FILES:", request.FILES)
    print("POST:", request.POST)

    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']

        upload_dir = os.path.join(settings.BASE_DIR, 'static', 'section_assets', str(section_id), 'images')
        os.makedirs(upload_dir, exist_ok=True)

        file_path = os.path.join(upload_dir, uploaded_file.name)
        with open(file_path, 'wb+') as f:
            for chunk in uploaded_file.chunks():
                f.write(chunk)

        image_url = f'/static/section_assets/{section_id}/images/{uploaded_file.name}'
        return JsonResponse({'data': [image_url]})

    return JsonResponse({'error': 'Upload failed'}, status=400)


def list_section_images(request, section_id):
    image_folder = os.path.join(settings.BASE_DIR, 'static', 'section_assets', str(section_id), 'images')
    image_urls = []

    if os.path.exists(image_folder):
        for file_name in os.listdir(image_folder):
            file_path = os.path.join(image_folder, file_name)
            mime, _ = guess_type(file_path)
            if mime and mime.startswith('image'):
                image_urls.append(f'/static/section_assets/{section_id}/images/{file_name}')

    return JsonResponse({'assets': image_urls})

from django.contrib import messages
def edit_section(request, section_id):
    print("📝 POST received with content length:", len(request.POST.get('html_content', '')))
    section = get_object_or_404(WebSection, pk=section_id)

    if request.method == 'POST':
        html = request.POST.get('html_content')
        if html:
            section.html_content = html
            section.save()
            messages.success(request, "✅ Section saved successfully!")
        return redirect('edit_section', section_id=section.id)

    return render(request, 'builder/grapes_editor.html', {
            'section': section,
            'section_inner_html': section.html_content,
            'form_action': request.get_full_path(),  # ✅ Add this line
    })