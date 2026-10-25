MALIPATANA CAMERA / GALLERY BUTTONS - FRONTEND ONLY
Frontend: FE V3.5.37 | Backend: keep BE V1.8.25

WHAT IS NEW
- Public registration: two large actions, "Take Photo" and "Choose from Gallery".
- Shareable entry: same two actions for Family, Member and Expense/receipt photos.
- Admin Family / Member forms: separate "Take Photo" and "Choose from Gallery" buttons.
- Admin Drive & files > Photo Library: same camera / gallery options.
- Camera uses a standard mobile browser capture hint (rear camera when supported).
- Both actions feed the SAME existing file input; preview, original-size restriction
  (20 MB), upload and private-Drive handling remain unchanged.
- On laptop/unsupported browsers, Take Photo may open the system image picker
  instead of a camera. Camera permission must be allowed on mobile.
- Photo remains OPTIONAL. Registration details are sent before an optional photo.
- Retains your existing Apps Script /exec URL unchanged.

GITHUB INSTALLATION
1. Unzip this archive. Upload index.html, entry.html, register.html and public.html
   to the ROOT of github.com/sutartech/Malipatana, replacing matching files.
2. Commit, refresh in an incognito tab, confirm dashboard FE V3.5.37.
3. On Android, open /register.html, tap Take Photo, allow camera, take one photo,
   confirm its thumbnail, submit a test form, and check Admin Registration Requests.
4. Test Choose from Gallery similarly on the shared-entry form.
5. Test a linked family/member photo and the Admin Photo Library (if applicable).

NO APPS SCRIPT REPLACEMENT IS REQUIRED FOR THESE BUTTONS.
If you still see "Village registration is currently disabled", run
setupSimpleRegistration in the existing Apps Script deployment and verify the
registration settings; the camera feature does not change registration access.
No current family/member data is modified by installing this frontend.

LOCAL VERIFICATION: JavaScript syntax and source integrity checks. Browser camera
behavior and live Apps Script photo saving should be tested on your device.
