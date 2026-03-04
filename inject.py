import os
import glob

base_dir = r"e:\GameSite\games"
dirs_to_process = ["games2d", "games3d"]
injection = '\n    <script src="../mobile_controls.js"></script>\n'

count = 0
for d in dirs_to_process:
    search_path = os.path.join(base_dir, d, "*.html")
    files = glob.glob(search_path)
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        if "mobile_controls.js" not in content:
            # inject before </body>
            if "</body>" in content:
                content = content.replace("</body>", injection + "</body>")
            else:
                content += injection
                
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            count += 1
            print(f"Injected into {os.path.basename(f)}")
        else:
            print(f"Skipped {os.path.basename(f)} (already contains injection)")

print(f"Total files updated: {count}")
