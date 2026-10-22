MALIPATANA — CONSOLIDATED RELEASE, 22 OCT 2026
================================================
FE V2.2.0 / BE V1.6.1 (version is not a proof of live deployment)

FILES TO USE
  index.html, public.html, or.js, images and manifest: upload to your GitHub Pages Malipatana repository.
  Code.gs: replace EVERYTHING inside the existing Google Apps Script Code.gs with this entire file.
  Do NOT append this code below any existing doGet or doPost.

SAFE UPDATE PROCEDURE
1. Make a copy/backup of your existing Google Sheet, Apps Script source and GitHub repo.
2. Do not upload Code.gs or any spreadsheet exports to the public GitHub repository.
3. In the same Apps Script project, replace existing Code.gs (not append), then Save.
4. From Apps Script editor choose runAll and run it once, authorize permissions.
   It creates/updates missing columns, does not intentionally clear existing sheets.
   Check logs for failures.
5. Deploy > Manage deployments > Edit (pencil) > New version > Deploy.
   Keep the existing /exec URL. Verify backend health endpoint.
6. Upload frontend files into your GitHub Pages folder; clear browser site cache or use private browsing.
7. Sign in and test a harmless edit and refresh, Action Plan, Family Tree, photos and public page.
8. Once verified, run enableWeeklyBackup in Apps Script editor to enable weekly workbook backup.

AUTHENTICATION CHANGE (IMPORTANT)
- Private bootstrap, edit/delete, uploads, column changes and audit data now require a backend-issued login token.
- All users must sign in again after update; old saved sessions will not work.
- Sessions expire within six hours; the app's own idle logout may be shorter.
- Login remains based on JSONP GET because this frontend uses Apps Script; passwords in login URLs are a security limitation.
  Avoid distributing admin access widely. For stronger production security, use a proper authenticated server/API.
- Setup no longer automatically creates the unsafe admin/admin123 default login when Users is empty.
  For a NEW workbook, create a Users row with a long unique password and Role=Admin, Active=YES.
  The backend upgrades plaintext on first successful login.
- Existing accounts and data are preserved by setup.

LIMITATIONS / MUST CHECK
- Static inspection and JavaScript syntax checks were performed; live Apps Script, Drive, and Sheet tests
  are impossible here without access to the running project. Take a backup before deployment.
- Existing ledger math from earlier backend is preserved; verify whether emergency and support payments
  are already also entered in Expenditure, to avoid double subtraction from Available Fund.
- Existing public settings may show financial data and photos; check settings before public release.
- Long JSONP GET submissions and photo upload may be constrained by browser/Apps Script limits.
- This archive contains no real spreadsheet data or credentials.
