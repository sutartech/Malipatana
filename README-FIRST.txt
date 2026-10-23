MALIPATANA VILLAGE WELFARE — SURNAME FIELD ALREADY FILLED
DIRECT FRONTEND UPLOAD · FE V3.5.21 · 23 OCTOBER 2026

READY FILES
  index.html — full updated dashboard (upload this file)
  entry.html — the existing shared-entry frontend (unchanged)

HOW TO APPLY TO GITHUB
1. Extract this ZIP on your computer. Do not upload the compressed ZIP file itself.
2. Open your GitHub repository: https://github.com/sutartech/Malipatana
3. Choose Add file > Upload files.
4. Drag index.html and entry.html to the ROOT of the repository.
   GitHub should show them replacing existing files of the same names.
5. Commit the changes. Refresh your page using Ctrl+Shift+R.
6. FE version should show V3.5.21. Test one old Member and Family form.

WHAT CHANGED
- Opening a historical Member or Family for EDIT now fills the visible Surname input
  if its existing full name already contains a likely surname.
- Previously stored Surname values are shown directly; a duplicate suffix inside Given
  Name is removed from the edit form.
- Matching known surnames (from the same family or existing records) are preferred.
- If a name has no matching existing surname, the final word is suggested in the box
  with a yellow VERIFY checkbox. Nothing is saved unless the form is saved and the
  uncertain suggestion is confirmed.
- Full Name preview remains automatic. Saving strips an identical trailing Surname
  from Given Name to avoid creating two copies.
- Names are never mass-edited; changes reach Sheets only when an individual record
  is reviewed and saved. All other frontend dashboard features are preserved.

BACKEND
- This surname-form change is frontend-only, based on FE V3.5.20 which expects
  the existing BE V1.8.18 release. Do not upload Code.gs to public GitHub.
- If you are running BE V1.8.17, upgrade to BE V1.8.18 from your existing
  matching backend release package before relying on V3.5.20+ validation features.

BACKUP AND TEST
- Back up the old HTML before overwriting.
- Check the visible Surname on an existing record, verify, save, then reopen.
- The change was syntax checked and tested with local name examples; live
  Apps Script and Google Sheets saving requires your deployment to test.
