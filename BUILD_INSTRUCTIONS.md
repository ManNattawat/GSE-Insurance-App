# 🚀 วิธี Build APK ผ่าน EAS

## ⚠️ ต้องทำก่อน Build

EAS ต้อง setup project ก่อน (ทำครั้งเดียว):

### ขั้นตอนที่ 1: Setup EAS Project

รันคำสั่งนี้ใน terminal:

```bash
npx eas-cli init
```

**คำถามที่เจอ:**
- `Would you like to create a project for @nattawatmonthian/gse-insurance-app?` → กด **Y**

---

### ขั้นตอนที่ 2: Build APK

หลังจาก setup เสร็จแล้ว:

```bash
npx eas-cli build --platform android --profile preview
```

**หรือ build แบบ non-interactive:**
```bash
npx eas-cli build --platform android --profile preview --non-interactive
```

---

## 📋 วิธี Build

### วิธีที่ 1: Build ผ่าน EAS CLI (Local)

```bash
# 1. Setup (ทำครั้งเดียว)
npx eas-cli init

# 2. Build
npx eas-cli build --platform android --profile preview
```

**ผลลัพธ์:**
- Build บน cloud (ไม่ใช้เครื่อง)
- ใช้เวลา ~10-15 นาที
- ดาวน์โหลด APK จาก Expo dashboard

---

### วิธีที่ 2: Build ผ่าน GitHub Actions (อัตโนมัติ)

**หลังจาก setup EAS project แล้ว:**

1. **เพิ่ม Expo Token ใน GitHub Secrets:**
   - ไปที่: https://expo.dev/accounts/nattawatmonthian/settings/access-tokens
   - สร้าง token → เพิ่มใน GitHub Secrets (ชื่อ: `EXPO_TOKEN`)

2. **Push code ขึ้น GitHub:**
   ```bash
   git add .
   git commit -m "Setup Expo + EAS Build"
   git push origin main
   ```

3. **GitHub Actions จะ build APK อัตโนมัติ:**
   - ไปที่: GitHub Repo → Actions
   - ดู workflow run
   - ดาวน์โหลด APK จาก Artifacts

---

## 🎯 ขั้นตอนตอนนี้

**รันคำสั่งนี้ใน terminal:**

```bash
npx eas-cli init
```

**แล้วตอบ Y** เมื่อถามว่าต้องการสร้าง project หรือไม่

**หลังจากนั้น:**

```bash
npx eas-cli build --platform android --profile preview
```

---

## 💡 Tips

1. **Build Time:**
   - Preview: ~10-15 นาที
   - Production: ~15-20 นาที

2. **APK Location:**
   - หลัง build เสร็จ → ไปที่: https://expo.dev/accounts/nattawatmonthian/projects/gse-insurance-app/builds
   - หรือจาก GitHub Actions Artifacts

3. **Free Tier:**
   - 30 builds/เดือน
   - Queue อาจยาว (รอได้)

---

**รัน `npx eas-cli init` ก่อน แล้วค่อย build!** 🚀

