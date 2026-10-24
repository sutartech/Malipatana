MALIPATANA — ADMIN-MANAGED VILLAGE LOCALITY / SAHI
Frontend FE V3.5.30; compatible with backend BE V1.8.23.

FRONTEND UPLOAD (GITHUB)
1. Download and extract this ZIP.
2. Upload the four HTML files into the root of your existing sutartech/Malipatana GitHub repository. Replace the same-named files.
3. Do not upload Code.gs to public GitHub.
4. Deploy BE V1.8.23 first, refresh the website and confirm FE V3.5.30 / BE V1.8.23.

ADMIN SETTINGS
Sign in as Admin -> left menu Settings -> Manage Sahis.
Alternatively Families / Members -> Manage Sahis.
Enter one approved village locality per line, such as Sutar Sahi or Uttar Sahi.
Click Save Sahi List. The names are saved in the existing Settings sheet
under the single Setting: Village Localities. No new sheet is created.

VILLAGER FORM
register.html: Village Locality/Sahi dropdown; optional Other/not listed input.
entry.html: Family details dropdown; Member details Sahi filter to find the right family; shared-edit family Sahi select.
Admin Families/Subfamilies: locality dropdown.
Admin registration review: locality dropdown; unlisted historical values remain visible.

NOTES
- The official Member record inherits locality from its chosen Family; a second Sahi column is not added to Members.
- Updating/renaming a Sahi in the approved list does NOT automatically change existing Family records. Edit those family records separately if needed.
- Public API returns Sahi names only, never member/family personal details.
- Uploaded photos, existing House No data, parent links and family relationships are retained.
- If backend is not yet deployed, the forms cannot obtain the list.
- Verify public and shared forms before distributing links.

LOCAL VALIDATION
All extracted script blocks passed Node.js syntax checking. Backend catalog parsing, save and validation tests passed. Browser navigation was blocked in the test environment; live end-to-end verification is still necessary.
