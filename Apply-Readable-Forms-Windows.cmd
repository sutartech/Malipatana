@echo off
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 (
  py Apply-Readable-Forms.py
) else (
  where python >nul 2>&1
  if %errorlevel%==0 (
    python Apply-Readable-Forms.py
  ) else (
    echo Python was not found. Read README-Install.txt for manual setup.
  )
)
echo.
pause
