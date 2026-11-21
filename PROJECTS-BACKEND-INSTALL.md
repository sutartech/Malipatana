MALIPATANA VILLAGE PROJECTS — BACKEND INSTALL
Target source: BE V1.8.38-MAL6
New source version after integration: BE V1.8.39-PROJECTS

IMPORTANT
- This upgrade uses the existing Malipatana master spreadsheet.
- It creates exactly two new registers in that workbook: Projects and Project Milestones.
- It does not create another spreadsheet.
- Both registers use the existing "events" permission. No separate permission key is added.
- Do not deploy the backend until all edits below are saved and setupProjects() completes.

1) Add Projects.gs
Create a new script file named Projects.gs in the EXISTING Apps Script project and paste the complete contents of Projects.gs from this repository.

2) Update CFG in Code.gs
Change:
  VERSION: 'BE V1.8.38-MAL6',
to:
  VERSION: 'BE V1.8.39-PROJECTS',

3) Add the two register arrays in dashboard_(caller)
Near the existing events/recurring declarations add:
  const projects = rows_('Projects'), projectMilestones = rows_('Project Milestones');

In the returned dashboard object, alongside events/recurring add:
  projects: visibleRegister_(projects, perUser, 'events'),
  projectMilestones: visibleRegister_(projectMilestones, perUser, 'events'),

These arrays are returned only to users who have the existing events permission, following the existing visibleRegister_ policy.

4) Extend MAL_SHEET_PAGES_
Add these two entries inside the existing object:
  'Projects':'events',
  'Project Milestones':'events',

This makes the existing server-side events permission govern read/write/delete and photo upload for both registers. Do not add projects or projectMilestones to the user's Access pages list.

5) Add project validation inside save_()
In save_(name, record, caller), after the existing Users validation line:
  if(name==='Users')validateUsersRecord_(record, record.Username);
add:
  if(name==='Projects'||name==='Project Milestones')validateProjectRecord_(name,record);

6) Save, then run setupProjects() once from the Apps Script editor.
Authorise if Google requests it. Confirm the log says both registers are ready.
This setup is additive: addHeaders_ appends only missing headers and preserves existing rows.

7) Verify before deployment
- Run verifyOneMasterWorkbook() if available.
- Run checkBackendDeployment() and confirm spreadsheetIdConfigured is true.
- Deploy > Manage deployments > Edit existing Web App > New version > Deploy.
- Keep the existing /exec URL. Do not create a second deployment.
- Open the existing /exec?action=health URL and confirm version BE V1.8.39-PROJECTS.

8) Verify in the dashboard
- Sign in with an Admin or an Editor account granted the existing events permission.
- Open Village projects; create a test project.
- Add two milestones to it; update status/progress and dates.
- Verify overdue dates are flagged on the dashboard.
- Upload a project photo through the existing private photo uploader.
- Paste Drive document links only if their sharing is restricted to the intended committee.
- Delete the test record only after verifying it; do not use production records for tests.

PHOTO / DOCUMENT NOTE
Project Photo and Milestone Photo use the existing private Drive photo-upload flow. Supporting Documents are link fields, not public uploads; paste only restricted Drive links. Do not set project documents to "Anyone with the link".
