@echo off
echo ===================================================
echo   SEO Service Platform - Full Database Backup
echo ===================================================
set timestamp=%date:~10,4%-%date:~4,2%-%date:~7,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
set timestamp=%timestamp: =0%

if not exist "database\backups" mkdir "database\backups"

echo [1/2] Backing up MySQL Database (seoservice_db)...
"c:\xampp\mysql\bin\mysqldump.exe" -u root -h 127.0.0.1 --routines --triggers --single-transaction seoservice_db > "database\backups\seoservice_backup_%timestamp%.sql"
copy /Y "database\backups\seoservice_backup_%timestamp%.sql" "database\seoservice_db_backup_latest.sql" >nul

echo [2/2] Database backup saved to: database\backups\seoservice_backup_%timestamp%.sql
echo [2/2] Latest pointer updated: database\seoservice_db_backup_latest.sql
echo.
echo ===================================================
echo   Backup Completed Successfully!
echo ===================================================
pause
