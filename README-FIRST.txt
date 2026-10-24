MALIPATANA PUBLIC REGISTRATION CONNECTION FIX
Frontend: FE V3.5.36 | Works with Code.gs BE V1.8.25

IMPORTANT: THE FIRST SCREENSHOT SHOWS REGISTRATION DISABLED IN YOUR BACKEND.
A frontend upload alone CANNOT enable registration.

MANDATORY BACKEND SETUP (on the EXACT Apps Script project of the new /exec URL)
1. Open Google Apps Script editor for the project you DEPLOYED.
2. Backup Code.gs and your existing spreadsheet.
3. Project Settings > Script properties: check MALIPATANA_SPREADSHEET_ID
   points to your EXISTING Malipatana master spreadsheet (do not create a new one).
4. Select setupSimpleRegistration in the editor's Run dropdown and click Run.
   Authorize when prompted; check Executions for SUCCESS.
   This creates/checks Registration Requests sheet in the EXISTING master
   spreadsheet and sets MAL_REGISTRATION_ENABLED to YES.
5. Project Settings > Script properties: verify MAL_REGISTRATION_ENABLED = YES.
   If setupSimpleRegistration failed, fix the error; do not just set YES.
6. Check Deploy > Manage deployments > Edit: choose New version > Deploy
   if you replaced Code.gs. The web app must execute as its owner and allow
   the intended public/no-login access. Share the registration page link,
   not the Apps Script URL.
7. If the error persists, verify the /exec URL is from the SAME Apps Script
   project where you ran setupSimpleRegistration. Backend settings are NOT
   shared between different Apps Script projects.
8. Check Registration Requests for a Pending entry BEFORE resubmitting.

FRONTEND INSTALL (GitHub)
Extract the ZIP and upload index.html, entry.html, register.html and public.html
in the ROOT of sutartech/Malipatana on GitHub Pages, replacing the old files.
Refresh in a private/incognito tab. Confirm dashboard FE V3.5.36.

CHANGES
- Removes artificial AbortController cancellation of public POST requests.
- Receipt status checked before replaying the same submission key.
- Clear admin-setup error when registration has been disabled on the backend.
- Longer but bounded receipt polling with safe Check / retry for uncertain cases.
- Keeps "Add another person" after actual confirmed registration.
- Does not treat an opaque network POST as proof of a saved request.
- Photo stays OPTIONAL and is uploaded only AFTER registration is confirmed.

NO BACKEND CODE CHANGES ARE INCLUDED. Continue Code.gs BE V1.8.25.

SAFETY: registration details are considered saved only after a registration
number has been returned. Check Admin Registration Requests before retrying
if confirmation was previously lost. Never use a different key for the same
uncertain attempt.
