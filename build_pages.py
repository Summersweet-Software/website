"""Build all pages for the final distribution"""

ALL_PAGES = ["projects", "projects/compiler-toolkit", "about"]
INDEX_FILE = "index.html"
DIST = "dist/"


import os
import shutil

for page in ALL_PAGES:
    print(f"[ ] Creating page for: {page}")
    os.makedirs(DIST + page)
    shutil.copyfile(DIST + INDEX_FILE, DIST + f"{page}/index.html")
    print(f"[X] Created page for: {page}")

print("Finished Creating Pages")
