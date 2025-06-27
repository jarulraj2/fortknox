import os
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

BASE_URL = 'https://www.scaleway.com/en/'  # 🔁 Change to any site
SAVE_DIR = r'C:\xampp\htdocs\cloneproject\cloned_site'

# Create Django-like folders
HTML_DIR = os.path.join(SAVE_DIR, 'templates')
JS_DIR = os.path.join(SAVE_DIR, 'static', 'js')
CSS_DIR = os.path.join(SAVE_DIR, 'static', 'css')
IMG_DIR = os.path.join(SAVE_DIR, 'static', 'images')
for path in [HTML_DIR, JS_DIR, CSS_DIR, IMG_DIR]:
    os.makedirs(path, exist_ok=True)

visited_pages = set()
visited_assets = set()

def sanitize_filename(url):
    path = urlparse(url).path.strip('/')
    if not path or path.endswith('/'):
        path += 'index.html'
    return path.replace('/', '_')

def save_file(content, path, mode='wb'):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, mode) as f:
        f.write(content)

def download_asset(asset_url):
    if asset_url in visited_assets:
        return asset_url
    visited_assets.add(asset_url)

    try:
        res = requests.get(asset_url, timeout=15)
        if res.status_code == 200:
            file_name = os.path.basename(urlparse(asset_url).path)
            ext = file_name.split('.')[-1].lower()

            if ext == 'js':
                save_path = os.path.join(JS_DIR, file_name)
                local = f'/static/js/{file_name}'
            elif ext == 'css':
                save_path = os.path.join(CSS_DIR, file_name)
                local = f'/static/css/{file_name}'
            elif ext in ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico']:
                save_path = os.path.join(IMG_DIR, file_name)
                local = f'/static/images/{file_name}'
            else:
                return asset_url

            save_file(res.content, save_path)
            return local
    except Exception as e:
        print(f"⚠️ Failed asset {asset_url}: {e}")

    return asset_url

def process_html(html, url):
    soup = BeautifulSoup(html, 'html.parser')

    for tag in soup.find_all(['script', 'link', 'img']):
        attr = 'src' if tag.name in ['script', 'img'] else 'href'
        if tag.has_attr(attr):
            full = urljoin(url, tag[attr])
            if urlparse(full).scheme in ['http', 'https']:
                tag[attr] = download_asset(full)

    filename = sanitize_filename(url)
    file_path = os.path.join(HTML_DIR, f'{filename}.html')
    save_file(str(soup), file_path, mode='w',)
    print(f"✅ Saved page: {file_path}")

def extract_internal_links(html, base):
    soup = BeautifulSoup(html, 'html.parser')
    links = set()
    for tag in soup.find_all('a', href=True):
        href = tag['href']
        full = urljoin(base, href)
        if urlparse(full).netloc == urlparse(base).netloc:
            links.add(full.split('#')[0])
    return links

def crawl_and_save(page, url):
    if url in visited_pages:
        return
    visited_pages.add(url)

    try:
        page.goto(url, timeout=60000)
        html = page.content()
        process_html(html, url)
        internal_links = extract_internal_links(html, BASE_URL)
        for link in internal_links:
            crawl_and_save(page, link)
    except Exception as e:
        print(f"❌ Failed to process {url}: {e}")

# Run using Playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    crawl_and_save(page, BASE_URL)
    browser.close()
