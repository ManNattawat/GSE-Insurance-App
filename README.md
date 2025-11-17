# GSE Insurance App

แอปพลิเคชันประกันภัยสำหรับ GSE Insurance

## 🚀 การเริ่มต้นใช้งาน

### ติดตั้ง Dependencies

```bash
npm install
```

### รันแอปในเบราว์เซอร์ (Web)

```bash
npm run web
```

หรือ

```bash
npm start
```

แล้วกด `w` เพื่อเปิดในเบราว์เซอร์

แอปจะเปิดที่ `http://localhost:8081` หรือ `http://localhost:19006`

### รันแอปบน Android Emulator

```bash
npm run android
```

### รันแอปบน iOS Simulator (macOS เท่านั้น)

```bash
npm run ios
```

## 📱 การ Build APK

### วิธีที่ 1: Build ผ่าน Git (GitHub Actions)

1. **ตั้งค่า Expo Token:**
   - ไปที่ [Expo Dashboard](https://expo.dev/accounts/[your-account]/settings/access-tokens)
   - สร้าง Access Token
   - เพิ่ม Token ใน GitHub Secrets ชื่อ `EXPO_TOKEN`
     - ไปที่ Settings > Secrets and variables > Actions
     - คลิก "New repository secret"
     - Name: `EXPO_TOKEN`
     - Value: [your-expo-token]

2. **Push code ไปยัง main/master branch:**
   ```bash
   git push origin main
   ```

3. **ตรวจสอบ Build:**
   - ไปที่ Actions tab ใน GitHub repository
   - Build จะเริ่มอัตโนมัติ
   - ตรวจสอบ build status ที่ [Expo Dashboard](https://expo.dev/accounts/[your-account]/builds)

4. **Download APK:**
   - เมื่อ build เสร็จแล้ว ไปที่ Expo Dashboard
   - Download APK จาก build ที่เสร็จแล้ว

### วิธีที่ 2: Build ผ่าน EAS CLI (Local)

1. **ติดตั้ง EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login:**
   ```bash
   eas login
   ```

3. **Build APK:**
   ```bash
   npm run build:android
   ```

   หรือ build แบบ preview (APK):
   ```bash
   eas build --platform android --profile preview
   ```

4. **Download APK:**
   - เมื่อ build เสร็จแล้ว จะมีลิงก์ให้ download
   - หรือตรวจสอบที่ Expo Dashboard

## 📋 Scripts ที่มี

- `npm start` - เริ่ม Expo development server
- `npm run web` - รันแอปในเบราว์เซอร์
- `npm run android` - รันแอปบน Android
- `npm run ios` - รันแอปบน iOS (macOS เท่านั้น)
- `npm run build:android` - Build APK สำหรับ Android
- `npm run build:ios` - Build IPA สำหรับ iOS
- `npm run build:all` - Build ทั้ง Android และ iOS

## 🔧 การตั้งค่า

### EAS Build Configuration

ไฟล์ `eas.json` กำหนด build profiles:
- **development**: สำหรับ development client
- **preview**: สำหรับ build APK สำหรับทดสอบ
- **production**: สำหรับ build production

### GitHub Actions

Workflow ไฟล์ `.github/workflows/build-apk.yml` จะ:
- Build APK อัตโนมัติเมื่อ push ไปยัง main/master branch
- Build เมื่อสร้าง tag ที่ขึ้นต้นด้วย `v` (เช่น `v1.0.0`)
- Build เมื่อมี pull request

## 📝 หมายเหตุ

- ต้องมี Expo account เพื่อใช้ EAS Build
- สำหรับ build ผ่าน GitHub Actions ต้องตั้งค่า `EXPO_TOKEN` ใน GitHub Secrets
- APK ที่ build จะถูกเก็บไว้ที่ Expo Dashboard และสามารถ download ได้

## 🛠️ เทคโนโลยีที่ใช้

- React Native
- Expo SDK 54
- TypeScript
- EAS Build
- Supabase (Cloud Database)
- React Navigation
- Excel Export (xlsx)

## 📊 โครงสร้างฐานข้อมูล

- **ตาราง**: `insurance.customers` (เก็บข้อมูลจริง)
- **View**: `public.customers` (แอปเข้าถึงผ่านนี้)
- **Schema**: แยกตารางใน `insurance` schema, View ใน `public` schema

## ⚠️ สิ่งที่ต้องตั้งค่า

1. **Supabase Connection**: เปิด `src/config/supabase.ts` และใส่ URL และ Key
2. **รัน SQL Script**: ใช้ไฟล์ `insurance-schema-setup.sql` ใน Supabase SQL Editor

ดูรายละเอียดเพิ่มเติมใน `SETUP.md` และ `STATUS.md`

