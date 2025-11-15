# Script สำหรับเปิด Dev Menu บนแท็บเล็ตผ่าน adb
# ใช้เมื่อเขย่าแท็บเล็ตไม่ได้

Write-Host "กำลังเปิด Dev Menu..." -ForegroundColor Green

# หา adb path
$adbPaths = @(
    "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe",
    "$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools\adb.exe",
    "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools\adb.exe"
)

$adbPath = $null
foreach ($path in $adbPaths) {
    if (Test-Path $path) {
        $adbPath = $path
        break
    }
}

if ($null -eq $adbPath) {
    Write-Host "ไม่พบ adb.exe" -ForegroundColor Red
    Write-Host ""
    Write-Host "วิธีแก้:" -ForegroundColor Yellow
    Write-Host "1. ติดตั้ง Debug APK ใหม่" -ForegroundColor White
    Write-Host "2. หรือใช้วิธีอื่นด้านล่าง" -ForegroundColor White
} else {
    Write-Host "พบ adb ที่: $adbPath" -ForegroundColor Green
    Write-Host ""
    
    # ตรวจสอบอุปกรณ์
    Write-Host "กำลังตรวจสอบอุปกรณ์..." -ForegroundColor Cyan
    $devices = & $adbPath devices
    Write-Host $devices
    
    # เปิด Dev Menu
    Write-Host ""
    Write-Host "กำลังเปิด Dev Menu..." -ForegroundColor Cyan
    & $adbPath shell input keyevent 82
    
    Write-Host ""
    Write-Host "✅ ส่งคำสั่งเปิด Dev Menu แล้ว" -ForegroundColor Green
    Write-Host "ดูที่หน้าจอแท็บเล็ต - ควรเห็น Dev Menu" -ForegroundColor Yellow
}

