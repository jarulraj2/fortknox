import os
from playwright.sync_api import sync_playwright

def extract_used_css(section):
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context()
            page = context.new_page()

            print(f"🌐 Loading: {section.source_url}")
            page.goto(section.source_url, timeout=60000)

            # Start CSS coverage
            page.coverage.start_css_coverage()
            page.wait_for_selector(section.selector, timeout=20000)
            page.wait_for_timeout(3000)  # Give time for CSS to load & render

            element = page.query_selector(section.selector)
            if not element:
                print(f"[⚠️ Warning] Selector not found: {section.selector}")
                return ""

            # Stop CSS coverage
            coverage_data = page.coverage.stop_css_coverage()

            # Extract used CSS from coverage
            used_css = ""
            for entry in coverage_data:
                for r in entry["ranges"]:
                    used_css += entry["text"][r["start"]:r["end"]] + "\n"

            return used_css

    except Exception as e:
        print(f"[❌ CSS Extract Error] {e}")
        return ""

    finally:
        try:
            browser.close()
        except:
            pass


