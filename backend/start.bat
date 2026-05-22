@echo off
cd /d "%~dp0"
echo ========================================
echo   EventHub Backend starting on :8080
echo   Swagger UI: http://localhost:8080/swagger-ui.html
echo   H2 Console: http://localhost:8080/h2-console
echo ========================================
java -jar target\eventhub-backend-1.0.0.jar
pause
