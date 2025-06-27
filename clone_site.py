import os
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

# === CONFIG ===
OUTPUT_DIR = r"C:\xampp\htdocs\cloneproject\cloned_site"
ASSETS = {"css": "css", "js": "js", "img": "images", "fonts": "fonts"}
for folder in ASSETS.values():
    os.makedirs(os.path.join(OUTPUT_DIR, folder), exist_ok=True)

visited_assets = {}
downloaded_files = set()

# === INPUT PAGES ===
PAGES = [
    {
        "output": "home.html",
        "sections": [
            {
                "url": "https://www.airtel.in/b2b/public-cloud/",
                "selector": "section#banner_section"
            },
            {
                "url": "https://www.airtel.in/b2b/public-cloud/",
                "selector": "section.feature_section"
            }
        ]
    },
    {
        "output": "page1.html",
        "sections": [
            {
                "url": "https://1password.com/enterprise/",
                "selector": "div[data-testid='page-section']"
            },
            {
                "url": "https://1password.com/",
                "selector": "section.styles_marquee__974oy"
            },
            {
                "url": "https://www.airtel.in/b2b/public-cloud/",
                "selector": "section.feature_section"
            }
        ]
    }
]

# === DOWNLOAD STATIC ASSETS ===
def download_asset(url):
    if url in visited_assets:
        return visited_assets[url]
    try:
        r = requests.get(url, timeout=15)
        if r.status_code == 200:
            parsed = urlparse(url)
            filename = os.path.basename(parsed.path.split("?")[0])
            ext = filename.split(".")[-1].lower()
            if not filename or "." not in filename:
                filename = os.path.basename(parsed.path.strip("/").replace("/", "_")) + ".asset"
            folder = (
                ASSETS["css"] if ext == "css" else
                ASSETS["js"] if ext == "js" else
                ASSETS["img"] if ext in ["png", "jpg", "jpeg", "gif", "svg", "webp", "ico"] else
                ASSETS["fonts"] if ext in ["woff", "woff2", "ttf", "eot"] else None
            )
            if folder:
                save_path = os.path.join(OUTPUT_DIR, folder, filename)
                if filename not in downloaded_files:
                    with open(save_path, "wb") as f:
                        f.write(r.content)
                    downloaded_files.add(filename)
                visited_assets[url] = f"{folder}/{filename}"
                return visited_assets[url]
    except Exception as e:
        print(f"❌ Failed to download asset: {url} — {e}")
    return url

# === REWRITE STATIC LINKS ===
def rewrite_html(html, base_url):
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup.find_all(["link", "script", "img"]):
        attr = "src" if tag.name in ["script", "img"] else "href"
        if tag.has_attr(attr):
            full_url = urljoin(base_url, tag[attr])
            if urlparse(full_url).scheme in ["http", "https"]:
                tag[attr] = download_asset(full_url)
    return str(soup)

# === MAIN FUNCTION ===
def clone_pages(pages):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        for page_data in pages:
            output_file = page_data["output"]
            combined_sections = ""
            all_head_links = {}
            print(f"\n🔍 Building: {output_file}")

            for section_info in page_data["sections"]:
                url = section_info["url"]
                selector = section_info["selector"]
                try:
                    page.goto(url, timeout=60000)
                    page.wait_for_load_state("networkidle")
                    page.wait_for_selector(selector, timeout=10000)
                    print(f"✅ Found: {selector} on {url}")

                    section_element = page.query_selector(selector)
                    if section_element:
                        section_html = section_element.inner_html()
                        clean_class = (
                            selector.replace('.', '-')
                                .replace('#', '')
                                .replace('[', '')
                                .replace(']', '')
                                .replace('=', '-')
                                .replace('"', '')
                                .replace("'", '')
                                .replace(' ', '-')
                        )   
                        wrapped = f"<section class='{clean_class}'>\n{section_html}\n</section>"
                        combined_sections += rewrite_html(wrapped, url) + "\n\n"

                    soup = BeautifulSoup(page.content(), "html.parser")
                    for tag in soup.find_all(["link", "script", "style"]):
                        attr = "src" if tag.name == "script" else "href" if tag.name == "link" else None
                        if tag.name == "style" or (attr and tag.has_attr(attr)):
                            if attr:
                                full_url = urljoin(url, tag[attr])
                                if full_url not in all_head_links:
                                    tag[attr] = download_asset(full_url)
                                    all_head_links[full_url] = str(tag)
                            else:
                                tag_str = str(tag)
                                if tag_str not in all_head_links:
                                    all_head_links[tag_str] = tag_str

                except Exception as e:
                    print(f"⚠️ Error loading {url} ({selector}): {e}")

            head_html = "\n".join(all_head_links.values())
            final_html = f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>{output_file}</title>
    {head_html}
</head>
<body>
{combined_sections}
</body>
</html>"""

            save_path = os.path.join(OUTPUT_DIR, output_file)
            with open(save_path, "w", encoding="utf-8") as f:
                f.write(final_html)
            print(f"✅ Saved: {output_file}")

        browser.close()

# === EXECUTE ===
if __name__ == "__main__":
    clone_pages(PAGES)