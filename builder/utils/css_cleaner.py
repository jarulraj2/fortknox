import os
import re
from playwright.sync_api import sync_playwright
from csscompressor import compress

def clean_unused_font_rules(css: str) -> str:
    """
    Removes @font-face, @import, font URLs, and known web fonts like Open Sans/Roboto from CSS.
    """
    patterns = [
        r"@font-face\s*{[^}]*}",                  # remove @font-face blocks
        r"@import\s+url\([^)]+\);",               # remove @import url(...)
        r"url\(['\"]?https?:\/\/[^)]+fonts[^)]+", # remove any URL pointing to fonts
        r"font-family:[^;]*open-sans[^;]*;",      # remove Open Sans
        r"font-family:[^;]*Roboto[^;]*;",         # remove Roboto
    ]
    for pattern in patterns:
        css = re.sub(pattern, "", css, flags=re.IGNORECASE)
    return css.strip()

def minify_css(css: str) -> str:
    """
    Minifies the CSS using csscompressor.
    """
    try:
        return compress(css)
    except Exception as e:
        print(f"[❌ Minify Error] {e}")
        return css

def extract_used_css(section):
    """
    Extracts the used CSS from the section.selector on section.source_url.
    Cleans unused font rules and returns a minified CSS string.
    """
    browser = None
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context()
            page = context.new_page()

            print(f"🌐 Visiting: {section.source_url}")
            page.goto(section.source_url, timeout=60000)

            # ✅ Start coverage tracking
            page.coverage.start_css_coverage()

            page.wait_for_selector(section.selector, timeout=20000)
            page.wait_for_timeout(3000)

            element = page.query_selector(section.selector)
            if not element:
                print(f"[⚠️ Not Found] Selector missing: {section.selector}")
                return ""

            # ✅ Stop CSS coverage
            coverage_data = page.coverage.stop_css_coverage()
            used_css = ""

            for entry in coverage_data:
                for r in entry["ranges"]:
                    used_css += entry["text"][r["start"]:r["end"]] + "\n"

            cleaned_css = clean_unused_font_rules(used_css)
            minified_css = minify_css(cleaned_css)

            print(f"✅ Extracted {len(minified_css)} bytes of CSS after cleanup + minification")
            return minified_css

    except Exception as e:
        print(f"[❌ CSS Extraction Failed] {e}")
        return ""

    finally:
        if browser:
            try:
                browser.close()
            except:
                pass
