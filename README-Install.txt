MALIPATANA · PLEASANT DATA ENTRY · 31 October 2026

WHAT IT CHANGES
- Logged-in form entries: Family, Member, Expense and Quick Add (form fields).
- Login-free public registration: register.html.
- Login-free shareable data entry: entry.html.
- Separately installed quick-entry page: quick-add.html (if present).
- Typed text: 18 px, semibold, dark, with clear focus outline.
- Labels: 15 px and bolder. Placeholder text: lighter, 16 px.
- Form inputs: comfortable ~52-54 px height and good mobile contrast.
- Saving, duplicate detection, email sign-in and backend logic are unchanged.

EASIEST IF YOU HAVE THE REPOSITORY ON YOUR COMPUTER
1. Unzip this package.
2. Copy 'Apply-Readable-Forms.py' and 'malipatana-readable-entry.css'
   into your local Malipatana repository (alongside index.html).
3. On Mac, double-click Apply-Readable-Forms-Mac.command (or right-click > Open).
   On Windows, double-click Apply-Readable-Forms-Windows.cmd.
   Python 3 is required. Alternatively run from a terminal:
       python3 Apply-Readable-Forms.py
   Windows command line: py Apply-Readable-Forms.py
5. The tool adds one stylesheet link to index.html, register.html,
   entry.html, and quick-add.html if present. It keeps original HTML backups
   in a separate sibling folder outside the repository.
6. Review changes and commit/sync with GitHub Desktop.

IF YOU EDIT DIRECTLY ON GITHUB WEBSITE
1. Create a NEW file in sutartech/Malipatana called:
       malipatana-readable-entry.css
   Paste the provided CSS into that file, and commit.
2. Edit each of index.html, register.html, entry.html and quick-add.html
   and add the following exact link immediately BEFORE </head>:
       <link rel="stylesheet" href="malipatana-readable-entry.css?v=20261031-v2">
3. Commit each file. Check that a stylesheet link is added only once per file.
4. Reopen your pages with browser hard refresh.

NOTE
This package is ready to apply but it is NOT an automatic cloud deployment.
GitHub app access in ChatGPT is currently returning:
  "link_id must identify an eligible linked account"
so this package was NOT committed directly by ChatGPT.
Do NOT upload old copies of index.html/register.html/entry.html over newer files.
Use the additive CSS/link approach above, or reconnect GitHub and request
that ChatGPT apply the patch directly once repository write access works.
