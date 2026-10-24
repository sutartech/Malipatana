MALIPATANA — MEMBER FORM & SAVE FIX
Frontend FE V3.5.28 | Existing Backend BE V1.8.21

Upload these 3 files to the root of sutartech/Malipatana on GitHub:
  index.html  (updated; replaces the old index.html)
  entry.html  (unchanged, retained for compatibility)
  register.html (unchanged, retained for compatibility)

Do NOT upload Code.gs to GitHub. BE V1.8.21 remains unchanged and does
not need a redeploy if it is already live.

FIXES
- Father Name and Mother Name remain visible once each.
- Father ID, Mother ID and Spouse ID are hidden internal family-tree links,
  not extra form questions. Existing values are NOT erased.
- Changes to Given Name + Surname update the saved Full Name correctly.
- Edit of other fields on old records no longer forces confirmation of a
  proposed surname split; proposed names are NOT silently adopted.
- Meaningful error messages are visible beside Save in the form footer.
- Save buttons prevent double submissions while checks/saving are active.
- Uses same master spreadsheet; no new sheet, no migration.

CHECK AFTER UPLOADING
1. Login: confirm FE V3.5.28, BE V1.8.21.
2. Open Members > Edit; verify no Father ID/Mother ID fields.
3. Modify a test member's Mother Name and save; reopen and verify.
4. On another test member change Given Name then Save; check Full Name.
5. If an error appears in red near Save, capture the exact message.

Local Node JavaScript syntax and isolated save-data tests passed.
Live connected saving against your Apps Script deployment has NOT been tested.
