MALIPATANA PUBLIC REGISTRATION – FE V3.5.34

WHY THIS FIX
The earlier public form could show "Sending details securely..." for a very long time because a no-cors POST could hang, and its separate status checks silently retried errors.

CHANGES
- Confirm the receipt in parallel with submission; never treat an opaque POST as successful.
- Server-confirmed receipt number is shown before optional photo upload.
- Add another person (same Sahi) or Start blank form WITHOUT reloading the page.
- Photo upload runs separately and does not delay the main receipt screen.
- Connection/status checks use bounded timeouts and explicit errors.
- On an uncertain result, retry the SAME submission key to avoid duplicated requests.
- Public-registration records remain pending for Admin approval.

DEPLOY
1. Back up existing frontend files.
2. Extract this ZIP and upload the FOUR HTML files to the root of sutartech/Malipatana on GitHub, replacing existing ones.
3. Commit and hard refresh the site / clear any stale cache.
4. Verify FE V3.5.34 and BE V1.8.25 on the dashboard.
5. Test public registration without a photo first, confirming its reference appears in Admin > Registration Requests.
6. Test a small photo separately, and then Add another person.

BACKEND
Continue using your existing BE V1.8.25. Do not upload Code.gs to public GitHub.
No new Google Spreadsheet or backend migration needed.

IMPORTANT
This update does NOT guarantee instant Google Apps Script processing. It prevents infinite loading and makes the Add Another option available as soon as the server confirms the new registration.
If a backend submission is not confirmed, the form displays an error and uses the same idempotency key for a retry. Do not start an entirely new submission for the same person until its status is known.
The live Apps Script deployment must be configured and tested separately.
