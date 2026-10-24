MALIPATANA — DOB AND ESTIMATED AGE UPDATE
Frontend: FE V3.5.27
Backend:  BE V1.8.21

WHAT CHANGED
- Public register.html: choose exact DOB, estimated age, or neither.
- Shared-entry entry.html: same options for members.
- Main dashboard index.html: Members table includes DOB + Age; age estimates display (Est.).
- Admin registration review can verify/correct approximate age before approval.
- Backend stores Age As On and Age Source, never invents a DOB for an estimate.
- Children aged zero are now included correctly in age-group counts.
- Existing members, approved registrations, photos, locality, surnames and House No records are preserved.

HOW TO UPDATE — KEEP FRONTEND AND BACKEND SEPARATE
1. BACK UP your current frontend and complete Code.gs first.
2. In existing Google Apps Script project, REPLACE entire Code.gs with Code.gs from
   the BACKEND zip. Save. Do not upload Code.gs to public GitHub.
3. In Apps Script editor, run setupAgeTracking() ONCE. Authorize if prompted.
   It ONLY adds missing 'Age As On'/'Age Source' columns in the existing Members
   sheet and 'Approximate Age'/'Age Recorded On' in Registration Requests.
   Do not create a new spreadsheet.
4. Apps Script: Deploy -> Manage deployments -> Edit existing deployment ->
   New version -> Deploy (keep the same /exec URL).
5. Extract the FRONTEND zip. Replace index.html, entry.html, and register.html
   in the existing sutartech/Malipatana GitHub repository and commit.
6. Refresh browser. Confirm FE V3.5.27 and BE V1.8.21 display in login.
7. Test one new public registration with exact DOB and one with age-only;
   check Admin -> Registration requests, approve a test record, and verify
   Members shows DOB blank + Age (Est.) for age-only entries.

IMPORTANT
- Age can be unknown: do not fabricate a DOB.
- Historical records are not retroactively converted or overwritten.
- No external Drive or spreadsheet is created by this update.
- Local syntax and age-validation tests passed; live Google permissions,
  saving, and approval must be verified after deployment.
