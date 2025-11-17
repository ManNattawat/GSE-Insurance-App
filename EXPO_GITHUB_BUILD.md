# 🚀 Expo + GitHub Actions Build APK

## ✅ คำตอบ: **ได้!**

Expo รองรับการ build APK ผ่าน GitHub Actions ด้วย **EAS Build** (Expo Application Services)

---

## 🎯 วิธีทำ

### 1. ใช้ EAS Build (แนะนำ)

**EAS Build** คือบริการ build APK/IPA จาก Expo ที่:
- ✅ Build บน cloud (ไม่ต้องใช้เครื่องตัวเอง)
- ✅ รองรับ GitHub Actions
- ✅ Build เร็วและเสถียร
- ✅ มี free tier (จำกัด)

### 2. Setup GitHub Actions Workflow

สร้างไฟล์ `.github/workflows/build-apk.yml`:

```yaml
name: Build APK with EAS

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    name: Build APK
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm install
      
      - name: Build APK
        run: eas build --platform android --profile preview --non-interactive
      
      - name: Download APK
        run: eas build:download --platform android --latest --output app.apk
      
      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-preview
          path: app.apk
```

---

## 📋 ขั้นตอน Setup

### 1. สร้าง Expo Account
```bash
npm install -g eas-cli
eas login
```

### 2. สร้าง Expo Token
- ไปที่: https://expo.dev/accounts/[username]/settings/access-tokens
- สร้าง token ใหม่
- เก็บไว้ใน GitHub Secrets (ชื่อ: `EXPO_TOKEN`)

### 3. Setup EAS Build
```bash
eas build:configure
```

### 4. สร้าง `eas.json`
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### 5. เพิ่ม GitHub Secrets
- ไปที่: GitHub Repo → Settings → Secrets and variables → Actions
- เพิ่ม secret: `EXPO_TOKEN` = token ที่สร้างไว้

---

## 🆚 เปรียบเทียบ

| คุณสมบัติ | EAS Build | Local Build |
|---------|-----------|-------------|
| **ความเร็ว** | ⭐⭐⭐⭐ เร็ว | ⭐⭐⭐ ช้ากว่า |
| **เสถียร** | ⭐⭐⭐⭐⭐ ดีมาก | ⭐⭐⭐ ขึ้นกับเครื่อง |
| **ค่าใช้จ่าย** | ⭐⭐⭐ Free tier จำกัด | ⭐⭐⭐⭐⭐ ฟรี |
| **Setup** | ⭐⭐⭐⭐ ง่าย | ⭐⭐⭐ ต้อง config |
| **GitHub Actions** | ⭐⭐⭐⭐⭐ รองรับดี | ⭐⭐⭐⭐ รองรับ |

---

## 💡 ข้อดีของ EAS Build

1. **Build บน Cloud** - ไม่ต้องใช้เครื่องตัวเอง
2. **เสถียร** - ไม่มีปัญหา build ที่เจอตอนนี้
3. **เร็ว** - Build เร็วกว่า local
4. **รองรับ GitHub Actions** - ทำงานอัตโนมัติ
5. **Free Tier** - มีให้ใช้ฟรี (จำกัด)

---

## ⚠️ ข้อจำกัด

1. **Free Tier จำกัด:**
   - 30 builds/เดือน
   - Queue อาจยาว
   
2. **ต้องมี Expo Account:**
   - ต้องสมัคร account
   - ต้องสร้าง token

3. **ต้องใช้ EAS CLI:**
   - ต้อง install `eas-cli`
   - ต้อง config `eas.json`

---

## 🎯 สรุป

### ✅ **ได้!** Expo + GitHub Actions Build APK ได้

**วิธี:**
1. ใช้ **EAS Build** (แนะนำ)
2. Setup GitHub Actions workflow
3. เพิ่ม Expo token ใน GitHub Secrets
4. Build อัตโนมัติเมื่อ push code

**ข้อดี:**
- Build บน cloud (ไม่ต้องใช้เครื่อง)
- เสถียรกว่า local build
- เร็วกว่า
- รองรับ GitHub Actions ดี

**ข้อจำกัด:**
- Free tier จำกัด (30 builds/เดือน)
- ต้องมี Expo account

---

## 🚀 คำแนะนำ

**สำหรับแอพประกันภัย:**

✅ **แนะนำใช้ Expo + EAS Build** เพราะ:
- Build บน cloud (ไม่ต้องใช้เครื่อง)
- เสถียรกว่า (ไม่มีปัญหา build ที่เจอ)
- เร็วกว่า
- รองรับ GitHub Actions ดี

**ถ้า build เยอะมาก:**
- อาจต้อง upgrade เป็น paid plan
- หรือใช้ local build แทน

---

**สรุป: ใช้ Expo แล้ว build APK ผ่าน GitHub Actions ได้แน่นอน!** 🎉

