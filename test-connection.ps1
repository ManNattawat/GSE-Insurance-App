# Script สำหรับทดสอบการเชื่อมต่อแท็บเล็ต
Write-Host "=== ทดสอบการเชื่อมต่อแท็บเล็ต ===" -ForegroundColor Cyan
Write-Host ""

# 1. ตรวจสอบ Metro Bundler
Write-Host "1. ตรวจสอบ Metro Bundler..." -ForegroundColor Yellow
$metro = netstat -ano | findstr :8081
if ($metro) {
    Write-Host "   ✅ Metro Bundler กำลังรันอยู่ (port 8081)" -ForegroundColor Green
} else {
    Write-Host "   ❌ Metro Bundler ไม่ได้รัน" -ForegroundColor Red
    Write-Host "   💡 รัน: npm start" -ForegroundColor Yellow
}
Write-Host ""

# 2. ตรวจสอบ adb และอุปกรณ์
Write-Host "2. ตรวจสอบอุปกรณ์ Android..." -ForegroundColor Yellow
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
    Write-Host "   ✅ พบ adb ที่: $adbPath" -ForegroundColor Green
    Write-Host ""
    Write-Host "   กำลังตรวจสอบอุปกรณ์..." -ForegroundColor Cyan
    & $adbPath devices
    
    Write-Host ""
    Write-Host "3. ทดสอบการเชื่อมต่อ..." -ForegroundColor Yellow
    $devices = & $adbPath devices 2>&1
    if ($devices -match "device$") {
        Write-Host "   ✅ พบอุปกรณ์ที่เชื่อมต่อ" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "4. ทดสอบ port forwarding..." -ForegroundColor Yellow
        & $adbPath reverse tcp:8081 tcp:8081
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   ✅ Port forwarding ตั้งค่าเรียบร้อย" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "5. ทดสอบเปิด Dev Menu..." -ForegroundColor Yellow
        & $adbPath shell input keyevent 82
        Write-Host "   ✅ ส่งคำสั่งเปิด Dev Menu แล้ว (ดูที่แท็บเล็ต)" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "6. ดู Log จากแท็บเล็ต..." -ForegroundColor Yellow
        Write-Host "   กด Ctrl+C เพื่อหยุดดู log" -ForegroundColor Gray
        Write-Host ""
        & $adbPath logcat *:S ReactNative:V ReactNativeJS:V
    } else {
        Write-Host "   ❌ ไม่พบอุปกรณ์ที่เชื่อมต่อ" -ForegroundColor Red
        Write-Host "   💡 ตรวจสอบ:" -ForegroundColor Yellow
        Write-Host "      - เชื่อมต่อ USB แล้วหรือยัง" -ForegroundColor White
        Write-Host "      - เปิด USB Debugging แล้วหรือยัง" -ForegroundColor White
        Write-Host "      - อนุญาต USB debugging บนแท็บเล็ตแล้วหรือยัง" -ForegroundColor White
    }
} else {
    Write-Host "   ⚠️  ไม่พบ adb.exe" -ForegroundColor Yellow
    Write-Host "   💡 ใช้วิธีอื่น: npx react-native log-android" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== สรุป ===" -ForegroundColor Cyan
Write-Host "สิ่งที่ทำได้:" -ForegroundColor Green
Write-Host "  ✅ ดู log จากแท็บเล็ต" -ForegroundColor White
Write-Host "  ✅ เปิด Dev Menu" -ForegroundColor White
Write-Host "  ✅ Port forwarding (USB)" -ForegroundColor White
Write-Host "  ✅ Hot Reload (ถ้า Metro Bundler รันอยู่)" -ForegroundColor White

