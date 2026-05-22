$pgBin  = "C:\Program Files\PostgreSQL\16\bin"
$pgData = "C:\Program Files\PostgreSQL\16\data"
$pgCtl  = "$pgBin\pg_ctl.exe"
$psql   = "$pgBin\psql.exe"

Write-Host "Registering PostgreSQL service..."
& $pgCtl register -N "postgresql-16" -D $pgData -o "-p 5432"

Write-Host "Starting PostgreSQL service..."
Start-Service "postgresql-16"
Start-Sleep -Seconds 3

Write-Host "Setting postgres password..."
& $psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'postgres';" 2>&1

Write-Host "Creating eventhub_db database..."
& $psql -U postgres -c "CREATE DATABASE eventhub_db;" 2>&1

Write-Host "Done! PostgreSQL is running on port 5432"
Write-Host "Database: eventhub_db"
Write-Host "User: postgres / Password: postgres"
