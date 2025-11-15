# Script สำหรับแก้ไขการเชื่อมต่อแอพกับ Metro Bundler
Write-Host "=== แก้ไขการเชื่อมต่อแอพ ===" -ForegroundColor Cyan
Write-Host ""

# 1. ตรวจสอบ Metro Bundler
Write-Host "1. ตรวจสอบ Metro Bundler..." -ForegroundColor Yellow
$metro = netstat -ano | findstr :8081
if ($metro) {
    Write-Host "   ✅ Metro Bundler กำลังรันอยู่" -ForegroundColor Green
} else {
    Write-Host "   ❌ Metro Bundler ไม่ได้รัน - กำลังเริ่ม..." -ForegroundColor Red
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"
    Start-Sleep -Seconds 5
}
Write-Host ""

# 2. หา IP address
Write-Host "2. ตรวจสอบ IP Address..." -ForegroundColor Yellow
$ipAddresses = ipconfig | Select-String -Pattern "IPv4" | ForEach-Object { ($_ -split ':')[1].Trim() }
Write-Host "   IP Addresses:" -ForegroundColor Cyan
foreach ($ip in $ipAddresses) {
    Write-Host "   - $ip" -ForegroundColor White
}
Write-Host ""

# 3. หา adb
Write-Host "3. ตั้งค่า Port Forwarding (USB)..." -ForegroundColor Yellow
$adbPaths = @(
    "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe",
    "$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools\adb.exe"
)

$adbPath = $null
foreach ($path in $adbPaths) {
    if (Test-Path $path) {
        $adbPath = $path
        break
    }
}

if ($adbPath) {
    Write-Host "   ✅ พบ adb" -ForegroundColor Green
    & $adbPath reverse tcp:8081 tcp:8081
    Write-Host "   ✅ Port forwarding ตั้งค่าเรียบร้อย" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  ไม่พบ adb" -ForegroundColor Yellow
}
Write-Host ""

# 4. คำแนะนำ
Write-Host "=== วิธีแก้ไข ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "วิธีที่ 1: ตั้งค่า Debug Server Host (แนะนำ)" -ForegroundColor Yellow
Write-Host "  1. เขย่าแท็บเล็ต → Dev Menu" -ForegroundColor White
Write-Host "  2. กด 'Settings' หรือ 'Debug server host'" -ForegroundColor White
if ($ipAddresses.Count -gt 0) {
    Write-Host "  3. ใส่: $($ipAddresses[0]):8081" -ForegroundColor White
    Write-Host "     หรือ: localhost:8081 (ถ้าใช้ USB)" -ForegroundColor White
} else {
    Write-Host "  3. ใส่: localhost:8081" -ForegroundColor White
}
Write-Host "  4. Reload แอพ" -ForegroundColor White
Write-Host ""

Write-Host "วิธีที่ 2: Reload แอพ" -ForegroundColor Yellow
Write-Host "  - กดปุ่ม 'RELOAD (R, R)' ในแอพ" -ForegroundColor White
Write-Host "  - หรือเขย่าแท็บเล็ต → Reload" -ForegroundColor White
Write-Host ""

Write-Host "วิธีที่ 3: ติดตั้ง Debug APK ใหม่" -ForegroundColor Yellow
Write-Host "  npm run android" -ForegroundColor White
Write-Host ""

