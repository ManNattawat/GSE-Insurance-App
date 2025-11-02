# 📱 คู่มือการ Build APK สำหรับ Samsung Tablet

## 🎯 แนะนำ: ใช้ GitHub Actions (อัตโนมัติ!)

**วิธีที่ดีที่สุด:** Push code ขึ้น GitHub แล้วให้ GitHub Actions build APK อัตโนมัติ

### ข้อดี:
- ✅ Build อัตโนมัติเมื่อ push code
- ✅ ไม่ต้องติดตั้ง Android Studio
- ✅ ดาวน์โหลด APK จาก GitHub Actions ได้เลย
- ✅ ไม่ต้อง build เอง

### วิธีใช้งาน:
1. Push code ขึ้น GitHub
2. GitHub Actions จะ build APK อัตโนมัติ
3. ไปที่ **Actions** tab → ดาวน์โหลด APK จาก Artifacts

---

## วิธีการ Build APK (ไม่ผ่าน Play Store)

### วิธีที่ 1: ใช้ GitHub Actions (แนะนำที่สุด! ⭐)

**อัตโนมัติ - Push code แล้วได้ APK**

1. Push code ขึ้น GitHub
2. GitHub Actions จะ build อัตโนมัติ
3. ดาวน์โหลด APK จาก Actions → Artifacts

**ดู workflow:** `.github/workflows/build-apk.yml`

---

### วิธีที่ 2: ใช้ EAS Build (Cloud Build)

#### 1. ติดตั้ง EAS CLI
```bash
npm install -g eas-cli
```

#### 2. Login EAS
```bash
eas login
```

#### 3. Configure EAS
```bash
eas build:configure
```

#### 4. Build Android APK
```bash
eas build --platform android --profile production
```

**ผลลัพธ์:** จะได้ APK file ที่สามารถดาวน์โหลดและติดตั้งได้เลย

---

### วิธีที่ 2: Local Build (ไม่ต้องใช้ EAS Account)

#### 1. Prebuild Android project
```bash
npx expo prebuild --platform android
```

#### 2. Build APK
```bash
cd android
.\gradlew.bat assembleRelease  # Windows
# หรือ
./gradlew assembleRelease      # Mac/Linux
```

**APK จะอยู่ที่:**
```
android/app/build/outputs/apk/release/app-release.apk
```

#### 3. Sign APK (ถ้าต้องการ)
```bash
# สร้าง keystore (ครั้งแรกเท่านั้น)
keytool -genkey -v -keystore gse-insurance.keystore -alias gse-insurance -keyalg RSA -keysize 2048 -validity 10000

# Sign APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore gse-insurance.keystore app-release-unsigned.apk gse-insurance

# Zipalign (optimize)
zipalign -v 4 app-release-unsigned.apk gse-insurance-release.apk
```

---

## 📲 การติดตั้งบน Samsung Tablet

### 1. เปิดใช้งาน "Unknown Sources"
- Settings → Security → Enable "Install from Unknown Sources"

### 2. ส่ง APK ไปยังแท็บเล็ต
- Email, USB, Google Drive, หรือ AirDrop

### 3. เปิดไฟล์ APK และติดตั้ง
- Tap ไฟล์ APK
- กด "Install"
- รอให้ติดตั้งเสร็จ

### 4. เปิดแอพ
- เปิดแอพจาก launcher

---

## 🔧 Prerequisites สำหรับ Local Build

### Windows:
1. **Java JDK 11 หรือ 17**
   - Download: https://adoptium.net/
   - Set JAVA_HOME environment variable

2. **Android SDK**
   - ติดตั้ง Android Studio หรือ
   - ดาวน์โหลด Command Line Tools
   - Set ANDROID_HOME environment variable

3. **Node.js 18+**
   - Download: https://nodejs.org/

---

## 📝 Notes

- **APK Size:** ประมาณ 30-50 MB
- **Min Android Version:** Android 6.0 (API 23)
- **Target Samsung Tablet:** รองรับแท็บเล็ต Samsung ทุกรุ่นที่ใช้ Android 6.0+
- **ไม่ต้องผ่าน Play Store:** ติดตั้งตรงได้เลย

---

## 🐛 Troubleshooting

### Build Error: "SDK not found"
```bash
# ตรวจสอบ ANDROID_HOME
echo %ANDROID_HOME%  # Windows
echo $ANDROID_HOME   # Mac/Linux

# Set ให้ถูกต้อง
set ANDROID_HOME=C:\Android\Sdk  # Windows
```

### Build Error: "Java not found"
```bash
# ตรวจสอบ JAVA_HOME
echo %JAVA_HOME%  # Windows
echo $JAVA_HOME   # Mac/Linux
```

### APK ไม่สามารถติดตั้งได้
- ตรวจสอบว่าเปิด "Unknown Sources" แล้ว
- ตรวจสอบว่า APK ถูก sign ถูกต้อง
- ลอง uninstall เวอร์ชันเก่าก่อน (ถ้ามี)

