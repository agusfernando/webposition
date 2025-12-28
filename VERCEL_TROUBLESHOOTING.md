# Troubleshooting Vercel Deployment

Jika UI tidak sesuai setelah deploy di Vercel, ikuti langkah-langkah berikut:

## ✅ Checklist Perbaikan

### 1. Pastikan Semua File Ada di Repository
Pastikan file-file berikut ada di root repository:
- ✅ `index.html`
- ✅ `style.css`
- ✅ `script.js`
- ✅ `vercel.json`

### 2. Cek Path File CSS dan JS
Di `index.html`, pastikan path menggunakan format relatif:
```html
<link rel="stylesheet" href="./style.css">
<script src="./script.js"></script>
```

### 3. Re-deploy di Vercel
1. Buka dashboard Vercel
2. Pilih project Anda
3. Klik "Redeploy" atau "Deployments" > "Redeploy"
4. Atau push perubahan baru ke Git repository

### 4. Clear Cache Browser
- Tekan `Ctrl + Shift + R` (Windows/Linux) atau `Cmd + Shift + R` (Mac)
- Atau buka Developer Tools > Network > Disable cache

### 5. Cek Console Browser
1. Buka Developer Tools (F12)
2. Cek tab Console untuk error
3. Cek tab Network untuk melihat apakah CSS/JS ter-load

### 6. Verifikasi File di Vercel
1. Buka deployment URL di browser
2. Tambahkan `/style.css` di akhir URL (contoh: `https://your-app.vercel.app/style.css`)
3. Jika file tidak ditemukan, berarti ada masalah dengan path

## 🔧 Konfigurasi Vercel

### Opsi 1: Auto-detect (Paling Sederhana)
Hapus atau kosongkan `vercel.json`, Vercel akan auto-detect static site.

### Opsi 2: Konfigurasi Minimal (Saat Ini)
File `vercel.json` saat ini menggunakan konfigurasi minimal:
```json
{
  "version": 2,
  "cleanUrls": true,
  "trailingSlash": false
}
```

### Opsi 3: Konfigurasi Eksplisit
Jika masih bermasalah, gunakan konfigurasi ini:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**",
      "use": "@vercel/static"
    }
  ]
}
```

## 🚨 Masalah Umum

### CSS/JS Tidak Ter-load
**Solusi:**
- Pastikan path menggunakan `./` (relatif)
- Pastikan file ada di root repository
- Re-deploy setelah perubahan

### 404 untuk CSS/JS
**Solusi:**
- Cek path di `index.html`
- Pastikan file ada di repository
- Clear cache Vercel dengan redeploy

### UI Terlihat Plain (Tanpa Styling)
**Solusi:**
- Cek apakah `style.css` ter-load di Network tab
- Pastikan path CSS benar
- Cek console untuk error

## 📝 Langkah Re-deploy

1. **Via Git:**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment"
   git push
   ```
   Vercel akan otomatis re-deploy

2. **Via Vercel Dashboard:**
   - Buka project di Vercel
   - Klik "Deployments"
   - Klik "..." pada deployment terbaru
   - Pilih "Redeploy"

## 🔍 Debugging

### Cek File di Browser
Buka URL berikut di browser untuk memastikan file ada:
- `https://your-app.vercel.app/style.css`
- `https://your-app.vercel.app/script.js`
- `https://your-app.vercel.app/index.html`

Jika file tidak ditemukan (404), berarti ada masalah dengan struktur repository.

### Cek Repository Structure
Pastikan struktur repository seperti ini:
```
repository/
├── index.html
├── style.css
├── script.js
├── vercel.json
└── (file lainnya)
```

**JANGAN** seperti ini:
```
repository/
└── web_position/
    ├── index.html
    ├── style.css
    └── ...
```

Jika file ada di subfolder, update `vercel.json` dengan `"outputDirectory": "web_position"` atau pindahkan file ke root.

## ✅ Setelah Perbaikan

Setelah melakukan perbaikan:
1. Push perubahan ke Git
2. Tunggu Vercel selesai deploy
3. Clear cache browser
4. Test aplikasi

Jika masih bermasalah, cek:
- Vercel deployment logs
- Browser console untuk error
- Network tab untuk melihat file yang ter-load

