import os

def write_tree(dir_path, out_file, prefix="", is_last=True, is_root=True, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = {"venv", "env", "__pycache__", "node_modules", ".git", ".next", "dist", ".idea"}

    folder_icon = "📂"
    file_icon = "📄"
    root_icon = "📦"

    try:
        entries = sorted(os.listdir(dir_path))
    except PermissionError:
        return  # تجاهل المجلدات اللي مفيش صلاحية الوصول لها

    entries = [
        e for e in entries
        if e not in exclude_dirs and not any(excluded in os.path.join(dir_path, e) for excluded in exclude_dirs)
    ]

    # فصل المجلدات والملفات وفرزهم
    dirs = sorted([e for e in entries if os.path.isdir(os.path.join(dir_path, e))])
    files = sorted([e for e in entries if not os.path.isdir(os.path.join(dir_path, e))])
    entries = dirs + files
    entries_count = len(entries)

    dir_name = os.path.basename(os.path.normpath(dir_path))
    if is_root:
        out_file.write(f"{root_icon} {dir_name}\n")
    else:
        out_file.write(f"{prefix}┣ {folder_icon} {dir_name}\n")

    child_prefix = prefix + ("   " if is_last else "┃  ")

    for idx, entry in enumerate(entries):
        path = os.path.join(dir_path, entry)
        is_entry_last = (idx == entries_count - 1)
        connector = "┗ " if is_entry_last else "┣ "

        if os.path.isdir(path):
            write_tree(
                path,
                out_file,
                prefix=child_prefix,
                is_last=is_entry_last,
                is_root=False,
                exclude_dirs=exclude_dirs
            )
        else:
            out_file.write(f"{child_prefix}{connector}{file_icon} {entry}\n")


if __name__ == "__main__":
    ROOT_FOLDER = os.getcwd()
    OUTPUT_FILE = "tree.txt"
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        write_tree(ROOT_FOLDER, f)
    print(f"✅ تم توليد الملف: {OUTPUT_FILE}")
