# Malipatana POST API transport — deployment sequence

Release pair:
- Frontend: FE V3.15.0-POST-API-TRANSPORT
- Apps Script: BE V1.8.47-POST-API-TRANSPORT

## Important: deploy as a coordinated pair

The GitHub Pages frontend change must not be merged or published before the matching Apps Script source is installed and deployed. The production Apps Script deployment has not been changed by this pull request.

## Backend installation

1. Open the Apps Script project currently used by the dashboard's configured `/exec` URL.
2. Make a backup copy/export of the currently deployed `Code.gs`.
3. Replace the complete source with the supplied `Code.gs` file. Do not append it to the existing source.
4. Save and run the normal Apps Script syntax check/save process. Do not run setup or reset functions; this transport change does not require sheet/schema changes.
5. Deploy > Manage deployments > Edit the existing web app deployment > select **New version** > Deploy.
6. Confirm the deployment URL remains the same as the URL configured in `malipatana-core.js`.
7. Open `/exec?action=health` and confirm the version is `BE V1.8.47-POST-API-TRANSPORT` and the capabilities include `postApiTransport` and `postOnlyPrivateActions`.

## Frontend release

After the backend health check passes, mark this pull request ready and merge it. GitHub Pages will publish the updated frontend. Do not manually copy frontend files from the branch to production.

## Post-deployment checks

Use a test account and non-production test records where possible:
- Username/password login and verified-email OTP sign-in.
- Bootstrap and refresh; confirm no private action works by GET.
- Viewer: reads only; cannot save/delete.
- Editor: permitted save; delete only with explicit delete permission.
- Admin: governance, users, shared-link administration and document actions.
- Password reset, email verification, session expiry and account-disable session revocation.
- Shared entry: link lookup, family/member lookup, submissions, proposed edits, photo status and approval.
- Registration, grievance and suggestion submissions.
- Photo thumbnail access remains permission-checked.
- Large bootstrap response: verify all response chunks arrive and no duplicate write is triggered after a timeout.
- Mobile browser and desktop browser.

## Data and compatibility

The migration changes API transport only. It does not add, rename, delete or migrate spreadsheet columns; it does not reset existing records, user accounts, permissions, sessions or shared links. Existing anonymous read-only public GET routes and current public form POST routes remain supported. Shared-entry lookups, duplicate checks, submissions, corrections and photo-status calls now use POST bodies as well.

The response relay uses a random 256-bit request receipt, split response chunks in Apps Script CacheService, and a five-minute expiry. Credentials and session tokens are carried in the POST body, not in the URL. The request receipt is a short-lived bearer capability for retrieving that specific response and must not be logged or shared.

## Rollback

If any smoke test fails:
1. Do not merge the frontend PR.
2. Restore the backed-up Apps Script source and deploy a new version.
3. Leave the current GitHub Pages frontend on the existing main branch.
4. Report the failing action and backend health version before retrying.
