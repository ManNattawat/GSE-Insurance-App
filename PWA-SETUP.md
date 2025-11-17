# คู่มือสร้างและ Deploy PWA

## 🚀 ขั้นตอนสร้าง PWA

### 1. Build PWA (Local)

```bash
npm run build:pwa
```

หรือ

```bash
npx expo export:web
```

**ผลลัพธ์:**
- สร้างโฟลเดอร์ `web-build/`
- พร้อม deploy แล้ว

---

### 2. ทดสอบ PWA (Local)

```bash
# ใช้ static server
npx serve web-build

# หรือใช้ Python
cd web-build
python -m http.server 8000
```

เปิด browser: `http://localhost:8000`

---

### 3. Deploy PWA

#### วิธีที่ 1: GitHub Pages (ฟรี)

1. **Push code:**
   ```bash
   git add .
   git commit -m "Build PWA"
   git push origin main
   ```

2. **GitHub Actions จะ build และ deploy อัตโนมัติ**
   - ตรวจสอบที่: GitHub > Actions
   - PWA จะอยู่ที่: `https://[username].github.io/GSE-Insurance-App/`

#### วิธีที่ 2: Vercel (แนะนำ - ฟรี)

1. **ติดตั้ง Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd web-build
   vercel
   ```

3. **หรือใช้ Vercel Dashboard:**
   - ไปที่ [vercel.com](https://vercel.com)
   - Import project
   - ตั้งค่า Build Command: `npm run build:pwa`
   - ตั้งค่า Output Directory: `web-build`

#### วิธีที่ 3: Netlify (ฟรี)

1. **ติดตั้ง Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   cd web-build
   netlify deploy --prod
   ```

---

## 📱 ใช้งาน PWA บน Tablet

### Android Tablet:

1. **เปิด Browser:**
   - Chrome หรือ Edge

2. **ไปที่ URL:**
   - `https://[your-domain]/`

3. **Add to Home Screen:**
   - คลิกเมนู (3 dots)
   - เลือก "Add to Home screen"
   - หรือ "Install app"

4. **เปิดจาก Home Screen:**
   - เปิดเหมือนแอปปกติ
   - ทำงานแบบ offline (ถ้า cache แล้ว)

---

## ✅ ข้อดีของ PWA

1. **Build ง่าย:**
   - ใช้เวลา 2-5 นาที
   - ไม่ต้อง compile native code

2. **อัปเดตง่าย:**
   - Deploy ใหม่ = อัปเดตทันที
   - ไม่ต้องติดตั้งใหม่

3. **ทำงานได้เหมือนแอป:**
   - Add to Home Screen
   - ทำงานแบบ standalone
   - ทำงานแบบ offline (บางส่วน)

---

## 🔧 Configuration

### PWA Config ใน `app.json`:
```json
"web": {
  "name": "GSE Insurance App",
  "shortName": "GSE Insurance",
  "display": "standalone",
  "themeColor": "#007AFF",
  "backgroundColor": "#ffffff"
}
```

---

## 📝 Checklist

- [x] แก้ไข excelService รองรับ Web
- [x] เพิ่ม PWA config ใน app.json
- [x] เพิ่ม build script
- [x] สร้าง GitHub Actions workflow
- [ ] Build PWA
- [ ] Deploy PWA
- [ ] ทดสอบบน Tablet

---

## 🎯 สรุป

**PWA พร้อมแล้ว!**

1. Build: `npm run build:pwa`
2. Deploy: ใช้ Vercel/Netlify/GitHub Pages
3. ใช้งาน: เปิดผ่าน browser บน Tablet

**ง่ายกว่า APK มาก!** 🚀

