@echo off
chcp 65001 >nul
cd /d "%~dp0"
set NEXT_TELEMETRY_DISABLED=1
call npm.cmd run build
pause

