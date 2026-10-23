MALIPATANA VILLAGE WELFARE — DIRECT UPLOAD
Frontend version: FE V3.5.23
Compatible backend: BE V1.8.18 (NO BACKEND UPDATE REQUIRED)
Date: 23 October 2026

CONTENTS
index.html — complete latest dashboard with name-field updates
entry.html — existing entry screen (unchanged)
README-FIRST.txt — this guide

CHANGES
1. Family and Members input fields: Given Name(s) and Surname are visibly separate.
   Full Name is automatically shown; users do not type it again.
2. Main register displays Full Name derived from two saved fields, with the
   existing Full Name as fallback for unreviewed older records.
3. Saved surnames are shown normally; old records lacking saved surnames
   show only a marked suggestion. A suggestion does NOT mean data is saved.
4. Admin can review and save missing surnames from Families and Members.
   Each row needs individual confirmation; no silent/bulk automatic updates.
5. Quick Edit cannot independently change Given Name, Surname or Full Name,
   which would otherwise cause inconsistent name records. Use Edit name.
6. Prevent duplicate surnames in Full Name. Supports multiword given names
   and existing known multiword surnames with manual verification.
7. Uses the SAME EXISTING Families/Members Google Sheets and current Apps
   Script backend. No new spreadsheet or sheet.

DIRECT UPLOAD
1. Back up the current repository frontend and Google Spreadsheet.
2. Extract this ZIP on your computer.
3. Open https://github.com/sutartech/Malipatana.
4. Upload index.html and entry.html to the ROOT of the current repository,
   replacing the two existing files, and Commit changes.
5. After GitHub Pages rebuilds, refresh your dashboard and check FE V3.5.23.
6. Sign in as admin > Families > Review missing surnames.
7. Compare each suggested split with the actual full name, tick only correct
   entries, then Save checked names. Repeat in Members.
8. Confirm the Surname filter works for the SAVED names.

NOTES
- No Google Apps Script changes are needed when BE V1.8.18 is deployed.
- Do not upload Code.gs, the spreadsheet, user records or backups to GitHub.
- Existing records are not changed merely by uploading or opening the dashboard.
- Live authenticated functionality must be verified after deployment.
