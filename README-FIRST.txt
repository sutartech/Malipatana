MALIPATANA — DIRECT UPLOAD FRONTEND, FE V3.5.24
Expected backend: BE V1.8.18 (NO backend change needed)

UPLOAD
1. Make a backup of existing index.html and entry.html from your GitHub repository.
2. Open your GitHub Malipatana repository > Add file > Upload files.
3. Upload index.html and entry.html from this ZIP, replacing existing files.
4. Commit and refresh your dashboard; verify it reads FE V3.5.24 / BE V1.8.18.
5. Open a family > Subfamilies and try View, Quick Edit, Members, More.

WHAT CHANGED
- Family profile: Village Locality (Sahi) and Surname both visible.
- Subfamily cards: View, Quick Edit, Members; More > Change parent, Deactivate, Full edit.
- Add subfamily: inherit parent Family ID, parent Sahi; prefill selected existing head name/surname.
- Save & add members; Save & add another keeps only parent/surname/Sahi.
- Whole household and family tree: replace House No display with Sahi.
- Prevent invalid circular parent assignments.
- Prevent deletion of families with child families, members or linked financial/welfare entries.
- Preserve older House No and Address/Area fields in existing spreadsheet records. No data migration/deletion.
- Existing member moves use ID and require matching head name; no automatic move from text alone.

RECOMMENDED TESTS
- Existing family's Sahi previously blank: edit and save Sahi.
- Add a subfamily choosing a member already under the parent. Verify no duplicate Member ID.
- Quick Edit a subfamily: verify name fields and Sahi. If renaming the head, separately verify Members record.
- More > Change parent: verify family tree without a cycle.
- More > Deactivate: does not delete any history.
- Add and cancel a test flow before doing bulk updates.

NOTE
Only index.html and entry.html belong in the public GitHub repository.
Do not upload Code.gs or private spreadsheet data to public GitHub.
The frontend uses the existing Apps Script and existing spreadsheet.
