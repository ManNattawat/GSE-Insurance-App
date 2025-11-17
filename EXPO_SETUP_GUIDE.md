# 🚀 คู่มือ Setup Expo + EAS Build

## ✅ สิ่งที่ทำแล้ว

1. ✅ ติดตั้ง Expo dependencies
2. ✅ สร้าง `app.json` สำหรับ Expo
3. ✅ แก้ไข `package.json` scripts
4. ✅ สร้าง `eas.json` สำหรับ EAS Build
5. ✅ แก้ไข `index.js` ให้ใช้ Expo
6. ✅ สร้าง GitHub Actions workflow

---

## 📋 ขั้นตอนต่อไป

### 1. สร้าง Expo Account

```bash
npm install -g eas-cli
eas login
```

**หรือ:**
- ไปที่: https://expo.dev/signup
- สร้าง account ใหม่

---

### 2. สร้าง Expo Token

1. ไปที่: https://expo.dev/accounts/[username]/settings/access-tokens
2. คลิก **"Create Token"**
3. ตั้งชื่อ: `github-actions`
4. คัดลอก token ที่ได้

---

### 3. เพิ่ม Token ใน GitHub Secrets

1. ไปที่ GitHub Repo: `https://github.com/ManNattawat/GSE-Insurance-App`
2. คลิก **Settings** → **Secrets and variables** → **Actions**
3. คลิก **"New repository secret"**
4. ชื่อ: `EXPO_TOKEN`
5. ค่าที่: วาง token ที่คัดลอกไว้
6. คลิก **"Add secret"**

---

### 4. Setup EAS Build

```bash
eas build:configure
```

**คำถามที่อาจเจอ:**
- **Which platforms?** → `android`
- **Build profile?** → `preview` (หรือ `production`)

---

### 5. สร้าง Assets (ถ้ายังไม่มี)

สร้างโฟลเดอร์ `assets/` และเพิ่มไฟล์:
- `icon.png` (1024x1024)
- `splash.png` (1242x2436)
- `adaptive-icon.png` (1024x1024)
- `favicon.png` (48x48)

**หรือใช้ placeholder ก่อน:**
```bash
mkdir assets
# สร้างไฟล์ placeholder ไว้ก่อน
```

---

### 6. ทดสอบ Build

#### ทดสอบ Local (Development):
```bash
npm start
```

#### Build APK ผ่าน EAS:
```bash
eas build --platform android --profile preview
```

#### Build ผ่าน GitHub Actions:
- Push code ขึ้น GitHub
- GitHub Actions จะ build APK อัตโนมัติ
- ดาวน์โหลด APK จาก Artifacts

---

## 🎯 วิธีใช้งาน

### Development:
```bash
npm start
# หรือ
expo start
```

### Build APK:
```bash
# ผ่าน EAS CLI
eas build --platform android --profile preview

# หรือ push code → GitHub Actions จะ build ให้อัตโนมัติ
```

---

## 📊 สถานะ

- ✅ Expo: ติดตั้งแล้ว
- ✅ EAS Config: สร้างแล้ว
- ✅ GitHub Actions: สร้างแล้ว
- ⏭️ Expo Account: ต้องสร้าง
- ⏭️ Expo Token: ต้องสร้างและเพิ่มใน GitHub Secrets
- ⏭️ Assets: ต้องสร้าง (หรือใช้ placeholder)

---

## 💡 Tips

1. **Free Tier:**
   - 30 builds/เดือน
   - Queue อาจยาว (รอได้)

2. **Build Time:**
   - Preview: ~10-15 นาที
   - Production: ~15-20 นาที

3. **APK Location:**
   - หลัง build เสร็จ → ดาวน์โหลดจาก Expo dashboard
   - หรือจาก GitHub Actions Artifacts

---

## 🚀 ขั้นตอนต่อไป

1. **สร้าง Expo Account** → `eas login`
2. **สร้าง Token** → เพิ่มใน GitHub Secrets
3. **Setup EAS** → `eas build:configure`
4. **Push Code** → GitHub Actions จะ build ให้อัตโนมัติ

---

**พร้อมแล้ว! ไปสร้าง Expo Account และ Token กันเลย!** 🎉

