# Script สำหรับตั้งค่า USB Debugging สำหรับ React Native
# ใช้เมื่อเชื่อมต่อแท็บเล็ตผ่าน USB

Write-Host "กำลังตั้งค่า USB Debugging..." -ForegroundColor Green

# หา adb path
$adbPaths = @(
    "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe",
    "$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools\adb.exe",
    "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools\adb.exe",
    "$env:ANDROID_HOME\platform-tools\adb.exe"
)

$adbPath = $null
foreach ($path in $adbPaths) {
    if (Test-Path $path) {
        $adbPath = $path
        Write-Host "พบ adb ที่: $path" -ForegroundColor Green
        break
    }
}

if ($null -eq $adbPath) {
    Write-Host "ไม่พบ adb.exe" -ForegroundColor Yellow
    Write-Host "ใช้วิธีอื่น: ตั้งค่า Debug server host ในแอพเป็น 'localhost:8081'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "วิธีทำ:" -ForegroundColor Cyan
    Write-Host "1. เขย่าแท็บเล็ต → Dev Menu" -ForegroundColor White
    Write-Host "2. กด 'Settings' หรือ 'Debug server host'" -ForegroundColor White
    Write-Host "3. ใส่: localhost:8081" -ForegroundColor White
    Write-Host "4. Reload แอพ" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "กำลังตรวจสอบอุปกรณ์..." -ForegroundColor Cyan
    & $adbPath devices
    
    Write-Host ""
    Write-Host "กำลังตั้งค่า port forwarding..." -ForegroundColor Cyan
    & $adbPath reverse tcp:8081 tcp:8081
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ ตั้งค่าเรียบร้อย!" -ForegroundColor Green
        Write-Host ""
        Write-Host "ตอนนี้แอพบนแท็บเล็ตสามารถเชื่อมต่อกับ Metro Bundler ได้แล้ว" -ForegroundColor Green
        Write-Host "ลอง Reload แอพ (เขย่าแท็บเล็ต → Reload)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ ไม่สามารถตั้งค่าได้" -ForegroundColor Red
        Write-Host "ลองใช้วิธีตั้งค่า Debug server host แทน" -ForegroundColor Yellow
    }
}

