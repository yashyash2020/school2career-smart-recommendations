from pathlib import Path
import re

def natural_key(s: str):
    # تقسيم النص لأجزاء أرقام + نصوص علشان يترتب طبيعي
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

base = Path(".")  # الفولدر الحالي
files = sorted([p.name for p in base.iterdir() if p.is_file()], key=natural_key)

with open("files_list.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(files))

print("✅ تم إنشاء files_list.txt وفيه", len(files), "ملف")
