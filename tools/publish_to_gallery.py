#!/usr/bin/env python3
"""
Publish a mini-app to the app gallery.
Usage: python3 publish_to_gallery.py <source_dir> [slug]
"""
import sys
import re
import shutil
from pathlib import Path
from datetime import datetime

GALLERY_DIR = Path("/Users/wineclaw/.openclaw/workspace/app-gallery")
APPS_DIR = GALLERY_DIR / "apps"
INDEX_FILE = GALLERY_DIR / "index.html"

def extract_title(html_path):
    """Extract title from index.html."""
    try:
        with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read(5000)
        match = re.search(r'\u003ctitle\u003e([^\u003c]+)\u003c/title\u003e', content, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    except:
        pass
    return html_path.parent.name

def publish(source_dir, slug=None):
    source = Path(source_dir)
    if not source.exists():
        print(f"Error: Source not found: {source}")
        return False
    
    # Find the HTML file
    html_file = source / "index.html"
    if not html_file.exists():
        # Maybe source is the file itself
        if source.name == "index.html":
            html_file = source
            source = source.parent
        else:
            print(f"Error: No index.html found in {source}")
            return False
    
    # Determine slug and date
    today = datetime.now().strftime("%Y-%m-%d")
    if slug:
        app_slug = f"{today}-{slug}"
    else:
        # Use folder name, prepend date if not present
        folder_name = source.name
        if re.match(r'^\d{4}-\d{2}-\d{2}-', folder_name):
            app_slug = folder_name
        else:
            app_slug = f"{today}-{folder_name}"
    
    # Copy to gallery
    dest_dir = APPS_DIR / app_slug
    if dest_dir.exists():
        print(f"Warning: {dest_dir} already exists, overwriting")
        shutil.rmtree(dest_dir)
    
    shutil.copytree(source, dest_dir)
    print(f"Copied to {dest_dir}")
    
    # Extract title
    title = extract_title(dest_dir / "index.html")
    url = f"https://wine-claw.github.io/app-gallery/apps/{app_slug}/"
    
    # Insert card into index.html
    card_html = f"""        \u003carticle class="card"\u003e
          \u003cdiv class="meta"\u003e{today}\u003c/div\u003e
          \u003ch2\u003e{title}\u003c/h2\u003e
          \u003cdiv class="actions"\u003e
            \u003ca class="button primary" href="{url}"\u003eOpen app\u003c/a\u003e
          \u003c/div\u003e
          \u003cdiv class="url"\u003e{url}\u003c/div\u003e
        \u003c/article\u003e
"""
    
    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the insertion point - after the closing </section> or before the first <article class="card">
    # Better: insert right after <section class="grid">
    if '<section class="grid">' in content:
        insert_point = content.index('<section class="grid">') + len('<section class="grid">')
        new_content = content[:insert_point] + "\n" + card_html + content[insert_point:]
    else:
        print("Error: Could not find insertion point in index.html")
        return False
    
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Added card to index.html")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 publish_to_gallery.py <source_dir> [slug]")
        sys.exit(1)
    
    source = sys.argv[1]
    slug = sys.argv[2] if len(sys.argv) > 2 else None
    
    success = publish(source, slug)
    sys.exit(0 if success else 1)
