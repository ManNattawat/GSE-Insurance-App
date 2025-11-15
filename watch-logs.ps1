# Script สำหรับดู Log จากแท็บเล็ต
# ใช้ใน PowerShell

Write-Host "กำลังเริ่มดู Log จากแท็บเล็ต..." -ForegroundColor Green
Write-Host "กด Ctrl+C เพื่อหยุด" -ForegroundColor Yellow
Write-Host ""

# ตรวจสอบว่า adb พร้อมหรือไม่
$adbPath = $null
$possiblePaths = @(
    "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe",
    "$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools\adb.exe",
    "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools\adb.exe"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $adbPath = $path
        break
    }
}

if ($null -eq $adbPath) {
    Write-Host "ไม่พบ adb.exe" -ForegroundColor Red
    Write-Host "ลองใช้: npx react-native log-android" -ForegroundColor Yellow
    npx react-native log-android
} else {
    Write-Host "พบ adb ที่: $adbPath" -ForegroundColor Green
    Write-Host ""
    
    # ดู log แบบ filter เฉพาะ React Native
    & $adbPath logcat *:S ReactNative:V ReactNativeJS:V
}

