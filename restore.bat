@echo off
echo ===================================================
echo   SEO Service Platform - Database Restore Utility
echo ===================================================
echo WARNING: This will restore database\seoservice_db_backup_latest.sql into seoservice_db.
echo.
set /p confirm="Are you sure you want to proceed with restore? (y/n): "
if /i not "%confirm%"=="y" goto cancel

echo.
echo [1/2] Creating database if not exists...
"c:\xampp\mysql\bin\mysql.exe" -u root -h 127.0.0.1 -e "CREATE DATABASE IF NOT EXISTS seoservice_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo [2/2] Restoring database from database\seoservice_db_backup_latest.sql...
"c:\xampp\mysql\bin\mysql.exe" -u root -h 127.0.0.1 seoservice_db < "database\seoservice_db_backup_latest.sql"

echo.
echo ===================================================
echo   Database Restored Successfully!
echo ===================================================
pause
goto end

:cancel
echo Restore cancelled by user.
pause

:end
