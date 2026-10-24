MALIPATANA — SAFE SPOUSE / MEMBER REGISTRATION
Frontend FE V3.5.33 — Backend BE V1.8.25 REQUIRED

INSTALL
1. Back up the live repository files.
2. FIRST replace the entire Code.gs in your existing Google Apps Script project
   using the matching BE V1.8.25 ZIP. Save and Deploy > Manage deployments >
   Edit > New version > Deploy. Keep the existing Apps Script project and URL.
3. Extract this frontend ZIP. Upload index.html, entry.html, register.html and
   public.html into the ROOT of the sutartech/Malipatana GitHub repository,
   replacing the existing HTML files. Commit.
4. Refresh and verify FE V3.5.33 / BE V1.8.25 on the dashboard.

WHY THIS CHANGE
* Typing a name in Spouse Name creates no Member record at all.
* When someone later registers, Admin approval now checks real Member records
  in every family for matching name or matched DOB+mobile. If a potential match
  exists, Admin must link the existing Member ID, OR explicitly confirm that
  this is another person and explain why. The confirmation is checked again
  on the server immediately before writing.
* Choosing "link existing" approves the public request by referencing the
  existing ID; it creates NO new Family or Member and does not move that person.
* A shared-entry link with a possible name collision will NOT create an
  unreviewed second Member ID. Ask Admin to verify the entry.
* Admin gets a reminder when a new registrant is already named as someone's
  spouse in a text-only field. After adding the person, Admin can edit the
  first person's Spouse field to select/link the new Member ID.
* Genuine different people with the same name can still be registered after
  Admin review with a reason. Same-name matches alone are NOT merged.

Privacy: the public form does not expose Members data or candidate IDs.
No new spreadsheet, sheet or setup function needed. Previous records stay intact.

TEST IN YOUR LIVE DEPLOYMENT
A. Spouse only typed as a name, no Member ID: public register > approve. One
   real Member ID is created, and Admin then links it to the other spouse.
B. Spouse already has a Member ID: submit again > Admin Registration Requests
   > Review > Already registered > select ID > Approve. Member count unchanged.
C. Same-name but genuinely different person: select Verified Different Person,
   confirm and provide review notes. Ensure the correct Family is chosen.
D. Shared member-entry link tries to add registered member: it must stop and
   direct the user to Admin, without exposing existing personal information.

Checked locally: JavaScript syntax and mock approval/duplicate-prevention tests.
LIVE spreadsheet/Drive tests have NOT been performed.
