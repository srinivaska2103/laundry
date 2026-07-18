import os
import re

directory = r"d:\Srinivas\demo"

def replacer(m):
    header = m.group(0)
    
    # 1. Nav container
    header = header.replace('class="hidden lg:flex items-center lg:space-x-2"', 
                            'class="hidden lg:flex items-center lg:space-x-0 xl:space-x-2"')
                            
    # 2. Nav links
    header = header.replace('class="px-2 lg:px-3 py-2 text-xs lg:text-sm ', 
                            'class="px-1 lg:px-1.5 xl:px-3 py-2 text-[10px] lg:text-[11px] xl:text-sm whitespace-nowrap ')
                            
    # 3. Right side container
    header = header.replace('<div class="hidden lg:flex items-center lg:space-x-4">', 
                            '<div class="hidden lg:flex items-center lg:space-x-1 xl:space-x-4">')
                            
    # 4. Login button
    header = header.replace('<a href="login.html" class="inline-block px-4 py-2 text-xs lg:text-sm ', 
                            '<a href="login.html" class="inline-block px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 text-[10px] lg:text-[11px] xl:text-sm whitespace-nowrap ')
                            
    # 5. Book Now button
    header = header.replace('class="ripple-btn px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-xs lg:text-sm ', 
                            'class="ripple-btn px-3 lg:px-3 xl:px-5 py-1.5 lg:py-2 xl:py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-[10px] lg:text-[11px] xl:text-sm whitespace-nowrap ')
                            
    return header

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content = re.sub(r'(<header.*?</header>)', replacer, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated spacing for {filename}")
