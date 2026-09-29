# 📖 Buku Panduan Penggunaan Website — Cangkruk Hijau
**Platform Kolaborasi & Aksi Nyata Lingkungan Hidup Kota Surabaya**

---

## 1. Petunjuk Menjalankan Aplikasi di Komputer Lokal (*Development Setup*)

### A. Prasyarat Sistem
Pastikan perangkat Anda telah terpasang:
- **Node.js**: Versi `>= 22.12.0` (disarankan Node.js LTS terbaru).
- **Package Manager**: `npm` (bawaan Node.js).
- **Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, atau browser modern lainnya.

### B. Langkah Instalasi & Menjalankan Server Lokal
1. **Ekstrak Berkas Proyek**: Buka folder `CangkrukHijau` di terminal atau VS Code Anda.
2. **Pasang Dependensi**:
   ```bash
   npm install
   ```
3. **Konfigurasi Variabel Lingkungan (`.env`)**:
   Salin berkas `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Isi nilai variabel sesuai kredensial proyek Supabase Anda:
   ```env
   PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
   PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret-key"
   ```
4. **Jalankan Server Pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
5. **Buka Aplikasi**: Akses alamat `http://localhost:4321` pada browser Anda.

---

## 2. Alur Penggunaan Portal Publik (Bagi Warga & Relawan)

### 🌿 1. Menjelajah Beranda (*Home Page*)
- **Omnibox Live Search**: Klik tombol ikon kaca pembesar di bilah navigasi atas (atau gunakan kolom pencarian di beranda) untuk mencari berita, modul edukasi, taman RTH, atau komunitas secara langsung dalam satu tempat.
- **Navigasi Cepat**: Gunakan menu navigasi di bagian header untuk langsung melompat ke Berita, Edukasi, Peta Hijau, FGD, Komunitas, Musik, atau Laporan.

### 📰 2. Membaca Berita Lingkungan (`/berita`)
- Masuk ke menu **Berita** untuk melihat kabar dan artikel lingkungan di Surabaya, Sidoarjo, dan Gresik.
- Ketik kata kunci pada kotak pencarian untuk menyaring artikel berita secara instan.
- Klik tombol **"Baca Selengkapnya →"** pada kartu berita untuk membuka halaman baca artikel secara utuh.

### 📚 3. Mengakses Ruang Edukasi & Mengunduh Modul PDF (`/edukasi`)
- Masuk ke menu **Edukasi** untuk mengakses 21 modul panduan, buku saku, dan kajian riset lingkungan.
- Pilih tab topik (misal: *Sampah, Konservasi, Air, Energi, dll.*) untuk memfilter materi.
- Klik **"Lihat Poin Pembahasan"** pada kartu materi untuk membuka ringkasan isi dokumen.
- Klik tombol hijau **"Unduh PDF"** untuk mengunduh dokumen secara langsung ke perangkat Anda, atau klik **"Buka ↗"** untuk melihat dokumen di tab baru.

### 🗺️ 4. Menjelajahi Peta Interaktif RTH Surabaya (`/peta-hijau`)
- Masuk ke menu **Peta Hijau** untuk membuka peta geospasial berbasis *Leaflet.js*.
- Klik tombol kategori filter (Taman Kota, Hutan Kota, Wisata Mangrove, dll.) untuk menampilkan sebaran lokasi.
- Klik penanda (marker) hijau pada peta atau pilih kartu taman di sidebar untuk melihat alamat lengkap, jam operasional, dan fasilitas publik yang tersedia.

### 👥 5. Bergabung dengan Komunitas Lingkungan (`/komunitas`)
- Masuk ke menu **Komunitas** untuk melihat daftar jejaring komunitas peduli lingkungan di Surabaya.
- **Bergabung**: Masuk (*Login*) ke akun Anda, lalu klik tombol **"Gabung Komunitas"** pada kartu komunitas pilihan Anda. Status keanggotaan akan tersimpan secara otomatis.
- **Melihat Komunitas Saya**: Klik tautan **"Lihat Komunitas Saya"** di bagian atas daftar untuk memantau komunitas yang telah Anda ikuti dan mengakses tautan grup WhatsApp relawan.
- **Mendaftarkan Komunitas Baru**: Gunakan formulir **"Daftarkan Komunitas"** di samping kanan untuk mengusulkan komunitas baru ke dalam direktori.

### 🗣️ 6. Mendaftar Forum Diskusi Warga (`/fgd`)
- Masuk ke menu **FGD** untuk melihat jadwal *Focus Group Discussion* lingkungan yang akan datang.
- Klik tombol **"Daftar Diskusi Ini"** pada agenda pilihan untuk membuka modal formulir pendaftaran.
- Isi nama lengkap, email, nomor WhatsApp, instansi, dan motivasi kehadiran.
- Klik **"Kirim Pendaftaran FGD"**. Sistem akan memverifikasi kuota dan mengirimkan notifikasi konfirmasi ke database.

### 🎵 7. Memutar Musik Lingkungan (`/musik`)
- Masuk ke menu **Musik** untuk mendengarkan lagu-lagu bertema alam karya musisi nusantara.
- Gunakan tombol kontrol (Play, Pause, Next, Prev, Timeline Slider, Volume) untuk memutar musik secara langsung di peramban sambil membaca lirik dan pesan ekologis lagu.

### 🚨 8. Pengaduan & Layanan Darurat Lingkungan (`/laporan`)
- Masuk ke menu **Laporan** jika Anda menemukan pencemaran limbah, penumpukan sampah liar, atau perusakan mangrove.
- Klik tombol **"WhatsApp Pengaduan DLH"** untuk langsung membuka obrolan chat resmi bersama tim DLH Kota Surabaya, atau klik tombol merah **"Telepon Darurat 112"** untuk panggilan darurat bebas pulsa.

---

## 3. Alur Penggunaan Portal Administrator (`/admin`)

Portal Administrator ditujukan bagi tim pengelola sistem dan dinas terkait untuk memantau aktivitas masyarakat.

1. **Masuk ke Portal Admin**:
   - Buka URL `/admin/login` pada browser.
   - Masukkan kredensial akun administrator yang terdaftar di Supabase Auth.
2. **Dashboard Pemantauan (`/admin/dashboard`)**:
   - **Kartu Metrik**: Menampilkan total laporan warga, total komunitas aktif, dan total pendaftar FGD.
   - **Tabel Pendaftar FGD**: Menampilkan rekapitulasi data pendaftar (Nama, Instansi, Email, No. Telepon/WhatsApp, Agenda, dan Tanggal Daftar). Admin dapat langsung mengklik nomor WhatsApp peserta untuk membuka kontak WhatsApp Web.
   - **Tabel Pengaduan Warga**: Menampilkan rekap laporan pelanggaran lingkungan dari warga beserta tingkat urgensi (*Kritis, Tinggi, Sedang*) dan status tindak lanjutnya.
3. **Keluar Akun Admin**:
   - Klik tombol **"Keluar Admin"** pada bilah atas dashboard untuk mengakhiri sesi administrator secara aman.

---

## 4. Struktur Database & Row Level Security (RLS)

- Seluruh data tabel (`fgd_registrations`, `fgd_agendas`, `user_communities`, `citizen_reports`) diamankan menggunakan aturan *Row Level Security (RLS)* di Supabase.
- Berkas skema lengkap tersedia pada berkas `database/schema.sql`.
