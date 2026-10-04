@echo off
chcp 65001 >nul
cd /d "%~dp0"
set NEXT_TELEMETRY_DISABLED=1
if not exist node_modules (
  call npm.cmd ci
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
call npm.cmd run dev --port 3101
pause

