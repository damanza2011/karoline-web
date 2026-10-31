@echo off
chcp 65001 > nul
echo ==========================================================
echo   KAROLINE · Haute Mer & Ultra-Luxury Advisory
echo   Starting local yachting advisory portal on port 8098...
echo ==========================================================
echo.
echo Opening http://127.0.0.1:8098 in your default browser...
start http://127.0.0.1:8098/
echo Press Ctrl+C to stop the local web server.
echo.
python -m http.server 8098
pause
