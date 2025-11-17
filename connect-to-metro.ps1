# Script สำหรับเชื่อมต่อแอพกับ Metro Bundler
Write-Host "=== เชื่อมต่อแอพกับ Metro Bundler ===" -ForegroundColor Cyan
Write-Host ""

# 1. ตรวจสอบ Metro Bundler
Write-Host "1. ตรวจสอบ Metro Bundler..." -ForegroundColor Yellow
$metro = netstat -ano | findstr :8081
if ($metro) {
    Write-Host "   ✅ Metro Bundler กำลังรันอยู่" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Metro Bundler ไม่ได้รัน - กำลังเริ่ม..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"
    Start-Sleep -Seconds 10
    Write-Host "   ✅ Metro Bundler เริ่มแล้ว" -ForegroundColor Green
}
Write-Host ""

# 2. หา IP Address
Write-Host "2. ตรวจสอบ IP Address..." -ForegroundColor Yellow
$ipConfig = ipconfig | Select-String -Pattern "IPv4"
$ipAddresses = $ipConfig | ForEach-Object { 
    $line = $_.Line
    if ($line -match "IPv4.*:\s*(\d+\.\d+\.\d+\.\d+)") {
        $matches[1]
    }
}
Write-Host "   IP Addresses:" -ForegroundColor Cyan
foreach ($ip in $ipAddresses) {
    Write-Host "   - $ip" -ForegroundColor White
}
Write-Host ""

# 3. คำแนะนำ
Write-Host "=== วิธีเชื่อมต่อแอพกับ Metro Bundler ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "วิธีที่ 1: ตั้งค่า Debug Server Host (ถ้าเป็น Debug APK)" -ForegroundColor Yellow
Write-Host "  1. เขย่าแท็บเล็ต → Dev Menu" -ForegroundColor White
Write-Host "  2. กด 'Settings' หรือ 'Debug server host & port for device'" -ForegroundColor White
if ($ipAddresses.Count -gt 0) {
    Write-Host "  3. ใส่: $($ipAddresses[0]):8081" -ForegroundColor Green
    Write-Host "     หรือ: localhost:8081 (ถ้าใช้ USB)" -ForegroundColor Green
} else {
    Write-Host "  3. ใส่: localhost:8081" -ForegroundColor Green
}
Write-Host "  4. Reload แอพ" -ForegroundColor White
Write-Host ""

Write-Host "วิธีที่ 2: Reload แอพ" -ForegroundColor Yellow
Write-Host "  - กดปุ่ม 'RELOAD (R, R)' ในแอพ" -ForegroundColor White
Write-Host "  - หรือเขย่าแท็บเล็ต → Reload" -ForegroundColor White
Write-Host ""

Write-Host "วิธีที่ 3: ตรวจสอบการเชื่อมต่อ" -ForegroundColor Yellow
Write-Host "  - ตรวจสอบว่าแท็บเล็ตและคอมพิวเตอร์อยู่ใน WiFi เดียวกัน" -ForegroundColor White
Write-Host "  - หรือใช้ USB และตั้งค่าเป็น localhost:8081" -ForegroundColor White
Write-Host ""

Write-Host "=== สถานะ ===" -ForegroundColor Cyan
Write-Host "Metro Bundler: " -NoNewline
if ($metro) {
    Write-Host "✅ รันอยู่" -ForegroundColor Green
} else {
    Write-Host "⚠️  กำลังเริ่ม..." -ForegroundColor Yellow
}
Write-Host ""

