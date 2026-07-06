#!/usr/bin/env python3
import sys
import os
from pathlib import Path
def inputdat():
    ignore_path = None
    if len(sys.argv) >= 3:
        input_directory = sys.argv[1]
        output_path = sys.argv[2]
        if len(sys.argv) >= 4:
            ignore_path = sys.argv[3]
    else:
        input_directory = input("Enter directory: ").strip()
        output_path = input("Enter output path: ").strip()
        ignore_input = input("Enter path to ignore file (optional, press Enter to skip): ").strip()
        if ignore_input:
            ignore_path = ignore_input
    if not input_directory or not output_path:
        print("Error: Both input directory and output path are required"); sys.exit(1)
    inp = Path(input_directory).resolve()
    out = Path(output_path).resolve()
    if out.suffix.lower() != ".md":
        out = out.with_suffix(".md")
    resolved_ignore_path = Path(ignore_path).resolve() if ignore_path else None
    return inp, out, resolved_ignore_path 
def parse_ignore_file(ignore_path):
    ignored_paths = set()
    if not ignore_path or not ignore_path.exists():
        return ignored_paths
    with open(ignore_path, 'r', encoding='utf-8') as f:
        for line in f:
            clean_line = line.strip()
            if not clean_line or clean_line.startswith('#'):
                continue
            abs_ignore_item = Path(clean_line).resolve()
            ignored_paths.add(abs_ignore_item)
    return ignored_paths
def dfs_find_tsx(root_path, ignored_paths):
    tsx_files = []
    if not root_path.exists() or not root_path.is_dir():
        print(f"Error: Target directory '{root_path}' does not exist.")
        sys.exit(1)
    stack = [root_path]
    while stack:
        current_dir = stack.pop()
        if current_dir in ignored_paths:
            continue
        try:
            for item in current_dir.iterdir():
                if item.is_dir():
                    stack.append(item)
                elif item.is_file() and (item.suffix == '.tsx' or item.suffix == '.css'):
                    if item in ignored_paths:
                        continue
                    tsx_files.append(item)
        except PermissionError:
            print(f"Warning: Permission denied for directory '{current_dir}'")
    return tsx_files
def sort_tree_style(files, root_path):
    sub_dir_files = []
    root_files = []
    for f in files:
        relative_parent = f.parent.relative_to(root_path)
        if relative_parent == Path('.'):
            root_files.append(f)
        else:
            sub_dir_files.append(f)
    sub_dir_files.sort(key=lambda p: (p.parent.relative_to(root_path), p.name))
    root_files.sort(key=lambda p: p.name)
    return sub_dir_files + root_files
def generate_markdown(sorted_files, root_path, out_file_path):
    root_folder_name = root_path.name
    markdown_lines = ["---", "code_files:"]
    for f in sorted_files:
        rel_path = f.relative_to(root_path)
        markdown_lines.append(f"    - {root_folder_name}/{rel_path}")
    markdown_lines.append("---\n")
    for f in sorted_files:
        rel_path = f.relative_to(root_path)
        display_path = f"{root_folder_name}/{rel_path}"
        markdown_lines.append(f"`{display_path}`")
        markdown_lines.append("```tsx")
        try:
            with open(f, 'r', encoding='utf-8', errors='replace') as code_file:
                markdown_lines.append(code_file.read().rstrip())
        except Exception as e:
            markdown_lines.append(f"// Error reading file: {e}")     
        markdown_lines.append("```\n")
    out_file_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_file_path, 'w', encoding='utf-8') as md_out:
        md_out.write("\n".join(markdown_lines))
def main():
    input_path, out_path, ignore_file_path = inputdat()
    ignored_paths = set()
    if ignore_file_path:
        if ignore_file_path.exists():
            ignored_paths = parse_ignore_file(ignore_file_path)
            print(f"Loaded {len(ignored_paths)} exclusion rules from: {ignore_file_path}")
        else:
            print(f"Warning: Specified ignore file '{ignore_file_path}' not found. Scanning without exclusions.")
    print(f"Scanning target: {input_path}")
    raw_files = dfs_find_tsx(input_path, ignored_paths)
    if not raw_files:
        print("No .tsx files discovered (or all matching files were ignored).")
        return
    sorted_files = sort_tree_style(raw_files, input_path)
    print(f"Writing parsed output dump to: {out_path}")
    generate_markdown(sorted_files, input_path, out_path)
    print("Code dump successfully completed!")
if __name__ == "__main__":
    main()