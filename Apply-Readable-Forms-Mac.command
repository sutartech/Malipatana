#!/bin/bash
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  python3 Apply-Readable-Forms.py
else
  echo "Python 3 is not available. Install it, or follow README-Install.txt to apply the CSS manually."
fi
echo
echo "Press Enter to close."
read -r _
