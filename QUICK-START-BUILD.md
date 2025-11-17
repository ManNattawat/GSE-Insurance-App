# 🚀 Quick Start: Build APK ผ่าน Git

## ⚡ ขั้นตอนเร็วๆ (5 นาที)

### 1️⃣ สร้าง Expo Token (2 นาที)
```
1. ไปที่: https://expo.dev/accounts/[your-username]/settings/access-tokens
2. คลิก "Create Token"
3. Copy Token
```

### 2️⃣ ตั้งค่า GitHub Secret (1 นาที)
```
1. GitHub Repo > Settings > Secrets and variables > Actions
2. New repository secret
3. Name: EXPO_TOKEN
4. Value: [วาง Token ที่ copy มา]
```

### 3️⃣ Push Code (1 นาที)
```bash
git add .
git commit -m "Ready for build"
git push origin main
```

### 4️⃣ รอ Build (10-20 นาที)
```
- ไปที่ GitHub > Actions tab
- ดู build status
- หรือไปที่ Expo Dashboard > Builds
```

### 5️⃣ Download APK (1 นาที)
```
1. Expo Dashboard > Builds
2. คลิก build ที่เสร็จแล้ว
3. Download APK
```

---

## 📱 ติดตั้งบน Tablet

1. Transfer APK ไปยัง Tablet
2. เปิด Settings > Security > Unknown Sources
3. เปิดไฟล์ APK และติดตั้ง
4. เปิดแอปและทดสอบ!

---

## ✅ พร้อมแล้ว!

ดูรายละเอียดเพิ่มเติมใน `BUILD-APK-GUIDE.md`

