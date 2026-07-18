import os
import re

directory = r"d:\Srinivas\demo"

def replace_xl_lg(match):
    return match.group(0).replace("xl:", "lg:")

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # We only want to replace xl: with lg: inside the header block
        def replacer(m):
            header_content = m.group(0)
            # Replace all occurrences of xl: with lg: inside the header block
            new_header = header_content.replace("xl:", "lg:")
            return new_header

        new_content = re.sub(r'(<header.*?</header>)', replacer, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {filename}")
