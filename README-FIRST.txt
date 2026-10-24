MALIPATANA DOB / AGE OPTIONAL UPDATE — FRONTEND V3.5.31

This update is built on the existing FE V3.5.30 and is compatible with BE V1.8.23.

CHANGES
* Public registration (register.html): Date of Birth/Age defaults to "I do not know either — leave blank".
* Shareable family/member form (entry.html): same three choices, with the unknown option first and no required birth fields.
* Admin Members form (index.html): clearer instructions that DOB and age are both optional.
* DOB given: Age calculates from DOB.
* Only approximate age given: DOB remains blank; estimated age is recorded.
* Both unknown: both remain blank; backend saves no fabricated age or DOB. The Members register shows a dash/Not recorded.
* No changes to other fields, original records, family structures or spreadsheet setup.

INSTALLATION
1. Back up your current GitHub HTML files.
2. Extract the ZIP and replace index.html, entry.html, register.html, and public.html at the ROOT of the existing Malipatana GitHub repo.
3. Commit. Hard-refresh and verify FE V3.5.31 with backend BE V1.8.23.
4. Test all three cases on public and shareable forms: exact DOB / estimated age / neither.
5. Verify a submission with neither remains blank for both values in the master spreadsheet.

BACKEND
No new backend needed; keep current BE V1.8.23. Both DOB and age were already supported as optional by the backend.

SECURITY
Do not upload Code.gs to public GitHub.
