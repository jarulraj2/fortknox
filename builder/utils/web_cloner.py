import os
import sys
import re
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from django.conf import settings
from playwright.sync_api import sync_playwright

BLOCKED_DOMAINS = [
    "analytics", "facebook", "googletagmanager", "doubleclick",
    "adsbygoogle", "portalappindustryservice", "excpt.ulanqab",
    "serving-sys", "clevertap", "webengage", "admitad"
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

def clean_css_remove_fonts(css):
    return re.sub(r'@font-face\s*{[^}]+}', '', css, flags=re.DOTALL)

def download_css_images(css, base_url, image_dir, section_id):
    urls = re.findall(r'url\(([^)]+)\)', css)
    for url in urls:
        img_url = url.strip("'\"")
        if img_url.startswith("data:") or img_url.startswith("#"):
            continue
        full_url = urljoin(base_url, img_url)
        if not is_safe_url(full_url):
            continue
        img_name = clean_filename_from_url(img_url)
        img_path = os.path.join(image_dir, img_name)
        if download_file(full_url, img_path):
            css = css.replace(img_url, f"/static/section_assets/{section_id}/images/{img_name}")
    return css

def process_inline_styles(section_html, section, image_dir):
    for tag in section_html.find_all(style=True):
        style = tag['style']
        urls = re.findall(r'url\(([^)]+)\)', style)
        for url in urls:
            img_url = url.strip("'\"")
            if img_url.startswith("data:") or img_url.startswith("#"):
                continue
            full_url = urljoin(section.source_url, img_url)
            if not is_safe_url(full_url):
                continue
            img_name = clean_filename_from_url(img_url)
            img_path = os.path.join(image_dir, img_name)
            if download_file(full_url, img_path):
                local_url = f"/static/section_assets/{section.id}/images/{img_name}"
                tag['style'] = tag['style'].replace(img_url, local_url)

def fetch_section_snapshot(section):
    # ✅ Patch sys.stderr to avoid mod_wsgi crash
    if not hasattr(sys.stderr, 'fileno'):
        sys.stderr = open(os.devnull, 'w')

    section_id = section.id
    base_dir = os.path.join(settings.BASE_DIR, 'static', 'section_assets', str(section_id))
    html_path = os.path.join(base_dir, 'preview.html')
    image_dir = os.path.join(base_dir, 'images')

    # ✅ Ensure directories exist
    os.makedirs(base_dir, exist_ok=True)
    os.makedirs(image_dir, exist_ok=True)

    with sync_playwright() as p:
        try:
            # Launch Chromium first
            browser = p.chromium.launch(
                headless=True,
                args=[
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-blink-features=AutomationControlled",
                    "--disable-features=IsolateOrigins,site-per-process",
                    "--ignore-certificate-errors",
                    "--disable-http2"
                ]
            )
        except Exception as e:
            print(f"❌ Chromium failed, falling back to Firefox: {e}")
            browser = p.firefox.launch(headless=True)

        context = browser.new_context(user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/117.0.0.0 Safari/537.36"
        ))
        page = context.new_page()
        page.goto(section.source_url, timeout=60000, wait_until="load")
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

        final_css = ""
        for link in soup.find_all("link", rel="stylesheet"):
            href = link.get("href")
            if not href:
                continue
            full_url = urljoin(section.source_url, href)
            if not is_safe_url(full_url):
                continue
            try:
                css = requests.get(full_url, timeout=10).text
                css = clean_css_remove_fonts(css)
                css = download_css_images(css, full_url, image_dir, section_id)
                final_css += css + "\n"
            except:
                continue

        for style in soup.find_all("style"):
            css_text = style.get_text()
            if "@font-face" in css_text:
                continue
            final_css += css_text + "\n"

        for tag in section_html.find_all(["link", "style", "script"]):
            tag.decompose()

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

        process_inline_styles(section_html, section, image_dir)

        html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/static/css/global.css">
  <link rel="stylesheet" href="/static/css/font.css">
  <style>
    {final_css}
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  </style>
</head>
<body>
{str(section_html)}
</body>
</html>"""

        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        return html_content