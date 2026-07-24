import fitz
import os

pdf_files = [
    ("src/content/xmuoj _ 2026年程序设计实践例题(05李胜睿班).pdf", "link"),
    ("src/content/xmuoj _ 程序设计实践之剑道试炼(05李胜睿班).pdf", "jd")
]

output_dir = "public/ac-screenshots/"

for filepath, prefix in pdf_files:
    if os.path.exists(filepath):
        doc = fitz.open(filepath)
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            pix = page.get_pixmap(dpi=150) # High quality enough for web
            output_path = os.path.join(output_dir, f"{prefix}_page_{page_num+1}.png")
            pix.save(output_path)
            print(f"Saved {output_path}")
    else:
        print(f"File not found: {filepath}")
