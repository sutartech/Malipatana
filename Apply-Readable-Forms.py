#!/usr/bin/env python3
"""Install a presentation-only readable-entry stylesheet into existing Malipatana repo.
No HTML content is removed. No JS or backend code is changed.
"""
from pathlib import Path
from datetime import datetime
import re, shutil, sys

HERE = Path(__file__).resolve().parent
ROOT = Path(sys.argv[1]).expanduser().resolve() if len(sys.argv)>1 else HERE
if not (ROOT/'index.html').is_file():
    print('Could not locate Malipatana repository folder. Put this installer and CSS file beside index.html, register.html and entry.html, then run again.')
    sys.exit(2)
CSS = HERE/'malipatana-readable-entry.css'
if not CSS.is_file():
    print('Missing malipatana-readable-entry.css; keep both files together.')
    sys.exit(2)

required = ['index.html','register.html','entry.html']
optional = ['quick-add.html']
missing = [p for p in required if not (ROOT/p).is_file()]
if missing:
    print('Cannot safely install; missing: '+', '.join(missing));sys.exit(2)

link = '<link rel="stylesheet" href="malipatana-readable-entry.css?v=20261031-v2">'
changes=[]
for filename in required + [p for p in optional if (ROOT/p).is_file()]:
    file = ROOT/filename
    src = file.read_text(encoding='utf-8')
    if 'malipatana-readable-entry.css' in src:
        print('Already linked: '+filename)
        continue
    if len(re.findall(r'</head\s*>',src,flags=re.I)) != 1:
        print('Unexpected </head> count in '+filename+'; no changes written.');sys.exit(3)
    modified = re.sub(r'</head\s*>',lambda m:link+'\n'+m.group(0),src,count=1,flags=re.I)
    changes.append((file,src,modified))

# Preserve originals OUTSIDE repository to avoid unintended public commits.
if changes:
    dest=ROOT.parent/('Malipatana-HTML-Backups-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
    dest.mkdir(parents=True,exist_ok=False)
    for file,src,modified in changes:
        (dest/file.name).write_text(src,encoding='utf-8')
        file.write_text(modified,encoding='utf-8')
    print('Original HTML copies saved outside repo in: '+str(dest))
shutil.copy2(CSS, ROOT/CSS.name) if CSS.resolve() != (ROOT/CSS.name).resolve() else None
print('Stylesheet ready: '+str(ROOT/CSS.name))
for f,_,_ in changes:print('Updated '+f.name)
print('No scripts, backend endpoints, data or form controls changed.')
print('Review the changes, then commit/push the changed HTML and CSS files using GitHub Desktop.')
