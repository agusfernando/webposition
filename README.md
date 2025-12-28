# Aplikasi Pengiriman Paket

Aplikasi web untuk konfirmasi data pengiriman paket dengan fitur geolokasi dan integrasi WhatsApp.

## Fitur

- ✅ Mendapatkan posisi geografis pengguna (latitude & longitude)
- ✅ Menampilkan akurasi lokasi
- ✅ Menampilkan peta lokasi (menggunakan Google Maps)
- ✅ Buka lokasi di Google Maps
- ✅ Salin koordinat ke clipboard
- ✅ Input nomor handphone (wajib)
- ✅ Input kode voucher (opsional)
- ✅ Kirim data ke WhatsApp dengan pesan otomatis
- ✅ UI modern dan responsif
- ✅ Mendukung perangkat mobile

## Cara Menggunakan

1. **Buka file `index.html` di browser**
   - Anda bisa membuka langsung dengan double-click file `index.html`
   - Atau gunakan web server lokal (lihat di bawah)

2. **Klik tombol "Dapatkan Posisi Saya"**
   - Browser akan meminta izin akses lokasi
   - Klik "Izinkan" atau "Allow"

3. **Lihat hasil**
   - Koordinat akan ditampilkan
   - Peta akan menampilkan lokasi Anda

## Catatan Penting

### Google Maps API (Opsional)

Aplikasi ini akan tetap berfungsi tanpa Google Maps API key, namun peta tidak akan ditampilkan. Untuk menggunakan peta Google Maps:

1. Dapatkan API key dari [Google Cloud Console](https://console.cloud.google.com/)
2. Buka file `index.html`
3. Ganti `YOUR_API_KEY` dengan API key Anda di baris terakhir:
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
   ```

**Alternatif tanpa API key:**
- Aplikasi tetap berfungsi untuk menampilkan koordinat
- Gunakan tombol "Buka di Google Maps" untuk melihat peta

## Menjalankan dengan Web Server Lokal

Untuk pengalaman terbaik, jalankan dengan web server lokal:

### Python
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Node.js (http-server)
```bash
npx http-server
```

### PHP
```bash
php -S localhost:8000
```

Kemudian buka browser di `http://localhost:8000`

## Persyaratan Browser

- Browser modern yang mendukung Geolocation API
- HTTPS (untuk production) atau localhost (untuk development)
- Izin akses lokasi dari pengguna

## Teknologi yang Digunakan

- HTML5
- CSS3 (dengan gradient dan animasi)
- JavaScript (Geolocation API)
- Google Maps JavaScript API (opsional)

## 🚀 Deployment (Akses Publik)

Aplikasi ini dapat di-deploy ke berbagai platform hosting gratis. Lihat file **[DEPLOY.md](DEPLOY.md)** untuk panduan lengkap deployment.

### Opsi Deployment Cepat:

1. **Netlify** (Paling Mudah)
   - Drag & drop folder ke [app.netlify.com](https://app.netlify.com)
   - Aplikasi langsung online!

2. **Vercel**
   - Upload ke [vercel.com](https://vercel.com)
   - Deploy otomatis

3. **GitHub Pages**
   - Push ke GitHub
   - Aktifkan GitHub Pages di Settings

Lihat **[DEPLOY.md](DEPLOY.md)** untuk instruksi lengkap.

## Lisensi

Bebas digunakan untuk keperluan pribadi atau komersial.

