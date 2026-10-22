MALIPATANA DASHBOARD — 22 OCTOBER 2026
Frontend V3.3.0 / Backend V1.7.0

CONTENTS
index.html     Main dashboard (GitHub Pages)
entry.html     Temporary login-free data entry (GitHub Pages)
public.html    Public village page (GitHub Pages)
Code.gs        Complete Apps Script backend — replace the old Code.gs, DO NOT APPEND
Other static files: icons, manifest, Odia support, village photo

DEPLOY SAFELY
1. Make independent backups of your live Google Sheet, current Apps Script code and GitHub site.
2. In Apps Script, replace ALL of old Code.gs with the Code.gs from this package.
3. Click Save. Choose runAll from the function list and Run once. Authorize requested Sheets/Drive permissions. Inspect execution log for failed steps.
4. Manage deployments > Edit > New version > Deploy. Keep the current /exec URL. If you create a fresh deployment, update API_URL in BOTH index.html and entry.html.
5. Upload static frontend files to the ROOT of your existing sutartech/Malipatana GitHub Pages repository. DO NOT upload Code.gs or this README to a public repository if possible; keep Code.gs only in Apps Script.
6. Clear cached pages/hard refresh. Sign in with existing admin account. Backend should show V1.7.0 and frontend V3.3.0.
7. Admin menu: Run all setup is now at the top; Shared entry links is beside it.
8. Create a Family & Members link (e.g. 48 hours); copy the generated URL immediately and test with a newly entered household. Members require the Family ID displayed after family submission. Test duplicates by trying the same data again.
9. Create an event in Major Expenses first, then create an Event Expenses link and select that event. Test payer different from submitter, new expenditure posting, expiry, and revoke.
10. Test desktop and narrow mobile screens; verify all existing features and reports before broad distribution.

SHARED-LINK SAFEGUARDS
- Each link is a random bearer token. The server stores a SHA-256 hash, never the raw token. Copy the generated link when creating it; it cannot be retrieved afterwards.
- Admin picks link type, duration 1 to 720 hours, event (expense links), and entry cap; may revoke at any time.
- Public users can ADD selected records ONLY. They cannot edit/delete or retrieve private registers.
- Recent five entries are summaries without names, family details or payer details.
- Duplicate safeguards: family head + house or phone; member name + family (and DOB when provided); expenses same event/date/amount/description/payer (last 50 entries).
- Warning: name-only duplicate matching is approximate; household cases may require admin review. Links shared with anyone can be abused; use short lifetimes and sensible entry caps.
- The form requires an internet connection; failed submissions are NOT quietly queued, preventing accidental duplicates.
- Shared form writes directly into the operational registers (not approval staging). The audit and Entry Source values identify these writes. For high-risk public distribution an approval workflow is recommended.
- Every family/member shared submission is counted towards the link entry cap separately.

IMPORTANT CAVEATS
- JavaScript syntax checked locally. Live Apps Script, Sheet, Drive and browser end-to-end validation is NOT possible offline.
- Existing frontend may show FE V3.2.0 and BE V1.5.0 in your screenshot; those labels indicate old published builds, not a completed deployment.
- If Action Plan says backend needs an update after deploying: confirm /exec URL, rerun runAll(), deploy a new version, and hard refresh. Existing entries are not deleted by runAll.
- Do not share the backend Apps Script URL publicly beyond the existing GitHub client integration; the new entry.html is the user-facing quick-entry link.
