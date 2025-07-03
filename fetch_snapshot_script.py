# fetch_snapshot_script.py
import sys
import os
import django

# Set Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cloneproject.settings")
django.setup()

from builder.utils.web_cloner import fetch_section_snapshot
from builder.models import WebSection

def main(section_id):
    section = WebSection.objects.get(pk=section_id)
    html = fetch_section_snapshot(section)
    if html:
        section.html_content = html
        section.save()
        print("✅ Fetched and saved.")
    else:
        print("❌ Failed to fetch section.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 fetch_snapshot_script.py <section_id>")
        sys.exit(1)

    try:
        section_id = int(sys.argv[1])
        main(section_id)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
