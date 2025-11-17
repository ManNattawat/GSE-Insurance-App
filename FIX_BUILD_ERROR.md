# 🔧 แก้ไข Error "Unable to load script"

## ❌ ปัญหา

APK ที่ build มาขึ้น error:
```
Unable to load script. Make sure you're either running Metro 
(run 'npx react-native start') or that your bundle 
'index.android.bundle' is packaged correctly for release.
```

---

## 🔍 สาเหตุ

**Component name ไม่ตรงกัน:**
- `MainActivity.kt` ใช้ `"GSE-Insurance-App"`
- แต่ Expo `registerRootComponent` register เป็น `"main"`

---

## ✅ แก้ไขแล้ว

**แก้ไข `MainActivity.kt`:**
```kotlin
// เปลี่ยนจาก
override fun getMainComponentName(): String = "GSE-Insurance-App"

// เป็น
override fun getMainComponentName(): String = "main"
```

---

## 🚀 ขั้นตอนต่อไป

### 1. **Build APK ใหม่**

**ถ้าใช้ EAS Build:**
```bash
npx eas-cli build --platform android --profile preview
```

**ถ้าใช้ GitHub Actions:**
- Push code ขึ้น GitHub
- รอ build เสร็จ
- ดาวน์โหลด APK จาก Artifacts

---

### 2. **ติดตั้ง APK ใหม่**

```bash
# ถ้าใช้ USB
adb install -r app-release.apk

# หรือติดตั้งผ่านไฟล์ APK โดยตรง
```

---

### 3. **ทดสอบ**

1. เปิดแอพ
2. ตรวจสอบว่าไม่มี error
3. ทดสอบฟังก์ชันต่างๆ

---

## 💡 สำหรับ Expo Managed Workflow

**APK ที่ build มาจาก EAS ควรมี bundle อยู่แล้ว** ไม่ต้องใช้ Metro Bundler

**ถ้ายังต้องการ Metro Bundler (สำหรับ development):**
- ใช้ **Development Build** แทน
- หรือใช้ **Expo Go** สำหรับ testing

---

## 📝 หมายเหตุ

**สำหรับ Production Build:**
- APK ควรมี bundle อยู่แล้ว
- ไม่ต้องใช้ Metro Bundler
- ทำงาน standalone ได้

**สำหรับ Development Build:**
- ต้องใช้ Metro Bundler
- ต้องใช้ `expo-dev-client`
- ต้องรัน `expo start`

---

**Build APK ใหม่แล้วทดสอบ!** 🚀

