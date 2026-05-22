@echo off
echo ========================================
echo   Starting EventHub Backend on :8080
echo ========================================
cd /d "%~dp0"
call mvnw.cmd spring-boot:run
pause
