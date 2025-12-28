# Panduan Deployment - Pengiriman Paket

Aplikasi web ini dapat di-deploy ke berbagai platform hosting gratis. Berikut beberapa opsi yang direkomendasikan:

## 🚀 Opsi 1: Netlify (Paling Mudah - Direkomendasikan)

### Cara 1: Drag & Drop (Paling Cepat)
1. Buka [https://app.netlify.com](https://app.netlify.com)
2. Buat akun gratis (bisa login dengan GitHub/Google)
3. Di dashboard, drag & drop folder project ini ke area "Want to deploy a new site without connecting to Git?"
4. Tunggu beberapa detik, aplikasi akan langsung online!
5. Netlify akan memberikan URL seperti: `https://random-name-123.netlify.app`

### Cara 2: Via GitHub
1. Push project ini ke GitHub repository
2. Login ke [Netlify](https://app.netlify.com)
3. Klik "New site from Git"
4. Pilih GitHub dan pilih repository Anda
5. Netlify akan otomatis deploy setiap kali Anda push ke GitHub

### Konfigurasi:
- **Build command**: (kosongkan)
- **Publish directory**: `.` (root)
- File `netlify.toml` sudah disiapkan

---

## 🚀 Opsi 2: Vercel

### Cara Deploy:
1. Buka [https://vercel.com](https://vercel.com)
2. Buat akun gratis (bisa login dengan GitHub/Google)
3. Klik "New Project"
4. Import project dari GitHub atau upload folder
5. Klik "Deploy"
6. Aplikasi akan langsung online!

### Konfigurasi:
- File `vercel.json` sudah disiapkan
- Framework Preset: Other
- Root Directory: `.`

---

## 🚀 Opsi 3: GitHub Pages

### Cara Deploy:
1. Push project ini ke GitHub repository
2. Buka Settings > Pages di repository GitHub Anda
3. Di bagian "Source", pilih branch `main` atau `master`
4. Pilih folder `/ (root)`
5. Klik "Save"
6. Tunggu beberapa menit, aplikasi akan tersedia di: `https://username.github.io/repository-name`

### Catatan:
- GitHub Pages memerlukan repository public (gratis) atau GitHub Pro (private)
- URL akan seperti: `https://yourusername.github.io/web_position`

---

## 🚀 Opsi 4: Firebase Hosting

### Cara Deploy:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Init project: `firebase init hosting`
4. Deploy: `firebase deploy`

### Konfigurasi:
- Public directory: `.`
- Single-page app: Yes

---

## 🚀 Opsi 5: Surge.sh

### Cara Deploy:
1. Install Surge: `npm install -g surge`
2. Di folder project, jalankan: `surge`
3. Ikuti instruksi untuk membuat akun dan deploy
4. Aplikasi akan tersedia di URL seperti: `https://your-project-name.surge.sh`

---

## 📝 Catatan Penting

### HTTPS
Semua platform di atas menyediakan HTTPS secara gratis, yang penting untuk Geolocation API di production.

### Custom Domain (Opsional)
Semua platform di atas mendukung custom domain gratis:
- Netlify: Settings > Domain management
- Vercel: Settings > Domains
- GitHub Pages: Settings > Pages > Custom domain

### Update Aplikasi
- **Netlify/Vercel**: Otomatis update jika terhubung ke GitHub (setiap push)
- **Manual**: Upload ulang folder atau gunakan CLI

---

## 🔧 Troubleshooting

### Geolocation tidak bekerja?
- Pastikan menggunakan HTTPS (semua platform di atas sudah menyediakan)
- Pastikan user memberikan izin akses lokasi

### Google Maps tidak muncul?
- Uncomment baris Google Maps API di `index.html`
- Dapatkan API key dari [Google Cloud Console](https://console.cloud.google.com/)
- Ganti `YOUR_API_KEY` dengan API key Anda

---

## ✅ Checklist Sebelum Deploy

- [ ] Test aplikasi di localhost
- [ ] Pastikan semua file ada (index.html, style.css, script.js)
- [ ] Test fitur geolocation
- [ ] Test fitur WhatsApp
- [ ] (Opsional) Setup Google Maps API key jika ingin menampilkan peta

---

## 🎉 Setelah Deploy

Setelah deploy berhasil, bagikan URL aplikasi Anda kepada pengguna!

**Contoh URL setelah deploy:**
- Netlify: `https://pengiriman-paket.netlify.app`
- Vercel: `https://pengiriman-paket.vercel.app`
- GitHub Pages: `https://username.github.io/web_position`

