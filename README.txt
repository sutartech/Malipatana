MALIPATANA V1.0.0

1. BACKEND
Open the existing Google Sheet -> Extensions -> Apps Script.
Replace Code.gs with the supplied Code.gs.
Save.
Run setupBackend once and authorize.
Deploy > New deployment > Web app.
Execute as: Me.
Who has access: Anyone.
Copy the /exec URL (the supplied frontend already contains your current URL).

2. FRONTEND
Upload index.html to the GitHub repository used by:
https://sutartech.github.io/Malipatana/

IMPORTANT: The previous index.html had a broken JavaScript line:
const API_URL = 'const API_URL = 'https://...';
This version fixes that.

3. FIRST LOGIN
Username: admin
Password: admin123
Change this password in the Users sheet immediately after testing.

4. EXISTING SHEETS
The backend is designed for:
Families, Members, Income, Expenditure, Contributions, Emergency Cases,
Regular Support, Insurance, Education, Medical, Users, Settings.

5. DATA
The backend reads the actual sheet headers. Run setupBackend only if needed; it will not overwrite existing rows.

6. TEST
Open:
.../exec?action=health
It should show JSON saying the backend is running.
Then open the GitHub Pages site and login.
