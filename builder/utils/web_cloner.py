import os
import re
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from django.conf import settings
from playwright.sync_api import sync_playwright
from .css_cleaner import extract_used_css
BLOCKED_DOMAINS = [
    "analytics", "facebook", "googletagmanager", "doubleclick",
    "adsbygoogle", "portalappindustryservice", "excpt.ulanqab", "serving-sys",
    "clevertap", "webengage", "admitad"
]

def is_safe_url(url):
    return url and url.startswith("http") and not any(domain in url for domain in BLOCKED_DOMAINS)

def download_file(url, save_path):
    try:
        r = requests.get(url, timeout=10)
        if r.status_code == 200:
            with open(save_path, 'wb') as f:
                f.write(r.content)
            return True
    except:
        pass
    return False

def clean_filename_from_url(url):
    name = os.path.basename(urlparse(url).path)
    return name.split("?")[0]

def embed_fonts_and_download(css, base_url, font_dir, section_id):
    urls = re.findall(r'url\(([^)]+)\)', css)
    for url in urls:
        font_url = url.strip("'\"")
        if font_url.startswith('data:') or font_url.startswith('#'):
            continue
        if "fonts/" in font_url or "open-sans" in font_url or "fonts.googleapis" in font_url:
            continue  # ✅ skip font downloads
        full_url = urljoin(base_url, font_url)
        if not is_safe_url(full_url):
            continue

        media_name = clean_filename_from_url(font_url)
        media_path = os.path.join(font_dir, media_name)
        relative_path = f'/static/section_assets/{section_id}/fonts/{media_name}'

        if download_file(full_url, media_path):
            css = css.replace(font_url, relative_path)
    return css

def embed_source_map(css, base_url, base_dir):
    source_map_match = re.search(r'/\*# sourceMappingURL=([^\s]+) \*/', css)
    if source_map_match:
        map_url = source_map_match.group(1).strip()
        full_map_url = urljoin(base_url, map_url)
        if is_safe_url(full_map_url):
            map_name = clean_filename_from_url(map_url)
            map_path = os.path.join(base_dir, map_name)
            download_file(full_map_url, map_path)
    return css

def fetch_section_snapshot(section):
    section_id = section.id

    # Directories
    base_dir = os.path.join(settings.BASE_DIR, 'static', 'section_assets', str(section_id))
    html_path = os.path.join(base_dir, 'preview.html')
    image_dir = os.path.join(base_dir, 'images')
    font_dir = os.path.join(base_dir, 'fonts')
    os.makedirs(image_dir, exist_ok=True)
    os.makedirs(font_dir, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(section.source_url, timeout=60000)
        page.wait_for_timeout(3000)

        try:
            element = page.wait_for_selector(section.selector, timeout=10000)
            element.scroll_into_view_if_needed()
            page.wait_for_timeout(1000)
            outer_html = element.evaluate("el => el.outerHTML")
        except:
            return None

        soup = BeautifulSoup(page.content(), "html.parser")
        section_html = BeautifulSoup(outer_html, "html.parser")

        # Final CSS
        final_css = ""
        for link in soup.find_all("link", rel="stylesheet"):
            href = link.get("href")
            if not href:
                continue
            if "fonts/" in href or "open-sans" in href or "fonts.googleapis" in href:
                continue  # ❌ Skip font links
            full_url = urljoin(section.source_url, href)
            if not is_safe_url(full_url):
                continue
            try:
                css = requests.get(full_url, timeout=10).text
                css = embed_fonts_and_download(css, full_url, font_dir, section_id)
                css = embed_source_map(css, full_url, base_dir)
                final_css += css + "\n"
            except:
                continue

        for style in soup.find_all("style"):
            css_text = style.get_text()
            if "@font-face" in css_text or "fonts/" in css_text or "open-sans" in css_text:
                continue  # ❌ Remove font-face blocks
            final_css += css_text + "\n"

        # Remove external font and style tags from section HTML
        for tag in section_html.find_all(["link", "style"]):
            content = tag.get("href") or tag.get_text()
            if content and ("fonts.googleapis" in content or "fonts/" in content or "open-sans" in content or "@font-face" in content):
                tag.decompose()

        # Process image/video/src
        for tag in section_html.find_all(["img", "video", "source"]):
            attr = "src" if tag.has_attr("src") else "srcset" if tag.has_attr("srcset") else None
            if attr:
                media_url = tag[attr]
                if media_url.startswith("data:") or media_url.startswith("#"):
                    continue
                full_url = urljoin(section.source_url, media_url)
                if not is_safe_url(full_url):
                    continue
                media_name = clean_filename_from_url(media_url)
                media_path = os.path.join(image_dir, media_name)
                if download_file(full_url, media_path):
                    tag[attr] = f"/static/section_assets/{section_id}/images/{media_name}"

        # Remove scripts
        for script in section_html.find_all("script"):
            script.decompose()

        # Final wrapped HTML
        html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    {final_css}
    * {{
        font-family: 'Inter', sans-serif !important;
    }}
  </style>
</head>
<body>
{str(section_html)}
</body>
</html>"""

        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        return html_content
