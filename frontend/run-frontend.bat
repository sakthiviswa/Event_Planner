@echo off
echo ========================================
echo   Starting EventHub Frontend on :5173
echo ========================================
cd /d "%~dp0"
npm run dev
pause
