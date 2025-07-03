from builder.models import EditableCSS

def version_tag(request):
    from builder.models import EditableCSS
    try:
        css = EditableCSS.objects.latest('id')
        version = css.version
        return {'version_tag': f"{version:02d}"}
    except:
        return {'version_tag': "00"}