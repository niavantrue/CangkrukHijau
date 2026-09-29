# 📋 Rangkuman Struktur File & Arsitektur Sistem — Cangkruk Hijau

Dokumen ini memuat daftar pohon direktori lengkap, arsitektur modul sumber (*source code*), daftar halaman publik dan administratif, komponen UI, dataset statis, pustaka pembantu backend, dan endpoint API untuk kebutuhan laporan proyek dan arsip akademik.

---

## 1. Pohon Direktori Lengkap Proyek (*Directory Tree*)

```text
CangkrukHijau/
├── .env.example                     # Template variabel lingkungan (Supabase URL & Keys)
├── .gitignore                       # Berkas pengecualian Git (node_modules, .env, dist)
├── astro.config.mjs                 # Konfigurasi Astro SSR & Adaptor Vercel
├── package.json                     # Daftar dependensi & script runner (Astro, Supabase)
├── tsconfig.json                    # Konfigurasi TypeScript / Path alias
├── database/
│   └── schema.sql                   # Skrip DDL lengkap skema database Supabase
├── public/
│   ├── favicon.svg                  # Favicon logo vektor Cangkruk Hijau
│   ├── favicon.ico                  # Favicon ikon browser legacy
│   ├── documents/                   # Berkas 21 modul edukasi PDF yang dapat diunduh gratis
│   │   ├── agroforestri-perkotaan-koridor-satwa.pdf
│   │   ├── audit-energi-rumah-tangga.pdf
│   │   ├── budidaya-maggot-bsf-komunal.pdf
│   │   ├── buku-saku-konservasi-air.pdf
│   │   ├── desain-bangunan-hijau-tropis.pdf
│   │   ├── ekowisata-mangrove-pesisir.pdf
│   │   ├── kajian-kualitas-udara-transportasi.pdf
│   │   ├── kajian-rth-surabaya.pdf
│   │   ├── konservasi-burung-air-pesisir.pdf
│   │   ├── kurikulum-sekolah-adiwiyata.pdf
│   │   ├── modul-pilah-sampah.pdf
│   │   ├── panduan-biopori-sumur-resapan.pdf
│   │   ├── panduan-kompos-komunal-windrow.pdf
│   │   ├── panduan-kompos-rumah-tangga.pdf
│   │   ├── panduan-urban-farming-organik.pdf
│   │   ├── panduan-zero-waste-kuliner.pdf
│   │   ├── pemantauan-partikulat-udara-iot.pdf
│   │   ├── pengelolaan-limbah-b3-domestik.pdf
│   │   ├── restorasi-lahan-basah-fitoremediasi.pdf
│   │   ├── riset-mikroplastik-brantas.pdf
│   │   └── sanitasi-dan-ipal-komunal.pdf
│   ├── images/                      # Aset gambar cover berita, taman, logo, dan infografis
│   │   ├── brand/                   # Logo utama dan simbol vektor
│   │   ├── berita/                  # Cover gambar artikel berita lokal
│   │   └── taman/                   # Foto dokumentasi RTH kota Surabaya
│   └── videos/                      # Video aset visual beranda
├── src/
│   ├── layouts/
│   │   └── Layout.astro             # Layout induk: Navbar responsif, Auth state, Footer, Global Search
│   ├── components/                  # Komponen antarmuka pengguna (UI Components)
│   │   ├── ArticleModal.astro       # Modal pop-up pembaca artikel cepat
│   │   ├── CommunityCard.astro      # Kartu komunitas dengan aksi gabung/kontak langsung
│   │   ├── EducationCard.astro      # Kartu modul edukasi dengan poin pembahasan & download PDF
│   │   ├── NewsCard.astro           # Kartu artikel berita dengan pill kategori dan estimasi baca
│   │   ├── ParkCard.astro           # Kartu profil taman/RTH pada sidebar peta interaktif
│   │   └── ReportBanner.astro       # Banner hotline darurat & pengaduan terpadu DLH/112
│   ├── data/                        # Dataset lokal & referensi statis
│   │   ├── berita.js                # Data 12 artikel berita lingkungan Surabaya
│   │   ├── edukasi.js               # Data 21 modul edukasi, kajian ilmiah, dan buku saku
│   │   ├── fgd.js                   # Data jadwal, tema, dan kuota diskusi FGD lingkungan
│   │   ├── komunitas.js             # Data direktori 14+ komunitas lingkungan Surabaya
│   │   └── musik.js                 # Data katalog lagu-lagu bertema alam nusantara
│   ├── lib/                         # Helper pustaka & inisialisasi client backend
│   │   ├── supabase.js              # Inisialisasi Supabase browser client (@supabase/ssr)
│   │   ├── supabaseServer.js        # Inisialisasi Supabase server client dengan penanganan cookie
│   │   └── supabaseAdmin.js         # Inisialisasi Supabase admin client (Service Role Key bypass RLS)
│   ├── styles/
│   │   └── global.css               # Desain sistem global: color tokens, typography, grid, cards, reset
│   └── pages/                       # Routing halaman web (Astro File-based Routing)
│       ├── index.astro              # Halaman Beranda utama (Bahasa Indonesia)
│       ├── berita.astro             # Halaman Indeks Berita Terkini dengan pencarian live
│       ├── edukasi.astro            # Halaman Ruang Edukasi & Modul Terbuka dengan filter topik
│       ├── fgd.astro                # Halaman Agenda Focus Group Discussion & Pendaftaran Peserta
│       ├── komunitas.astro          # Halaman Direktori Komunitas, Pencarian, & Form Pendaftaran Baru
│       ├── komunitas-saya.astro     # Dashboard relawan: Daftar komunitas yang diikuti pengguna
│       ├── peta-hijau.astro         # Halaman Peta Interaktif Ruang Terbuka Hijau (RTH) Surabaya
│       ├── musik.astro              # Halaman Ruang Musik Lingkungan & Audio Player
│       ├── laporan.astro            # Halaman Layanan Pengaduan Pelanggaran & Kerusakan Lingkungan
│       ├── login.astro              # Halaman Masuk Akun Pengguna / Relawan
│       ├── daftar.astro             # Halaman Pendaftaran Akun Baru Warga
│       ├── berita/
│       │   └── [slug].astro         # Halaman Detail Baca Berita Lingkungan (Dynamic Route)
│       ├── en/
│       │   └── index.astro          # Halaman Beranda Versi Bahasa Inggris (Internationalization)
│       ├── admin/
│       │   ├── login.astro          # Halaman Masuk Khusus Administrator
│       │   └── dashboard.astro      # Dashboard Administrator: Pengawasan laporan warga & pendaftar FGD
│       └── api/                     # Backend API Endpoints (Serverless Functions)
│           ├── auth/
│           │   └── logout.js        # Handler POST: Logout & pembersihan sesi autentikasi
│           ├── communities/
│           │   ├── join.js          # Handler POST: Gabung komunitas relawan
│           │   └── leave.js         # Handler POST: Batal gabung komunitas relawan
│           ├── edukasi/
│           │   └── download/        # Endpoint logging / unduhan materi
│           └── fgd/
│               └── register.js      # Handler POST: Pendaftaran peserta FGD via Supabase Service Role
```

---

## 2. Rincian Arsitektur Halaman (*Pages Architecture*)

| Path URL | Berkas Sumber | Fungsi & Cakupan Fitur |
| :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | Halaman beranda utama: Hero video, pencarian terpadu *omnibox*, sorotan berita, edukasi populer, RTH terdekat, aksi komunitas, dan musik lingkungan. |
| `/berita` | `src/pages/berita.astro` | Katalog berita lingkungan terkini Surabaya dengan fitur live filter teks pencarian instan. |
| `/berita/[slug]` | `src/pages/berita/[slug].astro` | Halaman baca artikel lengkap secara dinamis berdasarkan slug judul, dilengkapi rekomendasi artikel terkait. |
| `/edukasi` | `src/pages/edukasi.astro` | Pustaka modul PDF gratis dengan filter topik (Sampah, Konservasi, Air, Energi, dll.), live search, dan unduhan dokumen langsung. |
| `/komunitas` | `src/pages/komunitas.astro` | Direktori komunitas lingkungan, pagination real-time, pencarian keyword, tombol gabung/batal keanggotaan, dan form registrasi komunitas baru. |
| `/komunitas-saya` | `src/pages/komunitas-saya.astro` | Dashboard privat pengguna terotentikasi untuk memantau komunitas yang telah diikuti dan tautan grup WhatsApp relawan. |
| `/peta-hijau` | `src/pages/peta-hijau.astro` | Peta interaktif Leaflet.js berisikan persebaran Taman & Hutan Kota Surabaya, filter kategori wilayah, navigasi koordinat, dan detail fasilitas. |
| `/fgd` | `src/pages/fgd.astro` | Jadwal forum diskusi warga (FGD) dengan modal form pendaftaran peserta, kuota dinamis, dan integrasi backend Supabase. |
| `/musik` | `src/pages/musik.astro` | Ruang kurasi lagu bertema alam musisi nusantara dengan audio player interaktif (play, timeline slider, volume, lirik lagu). |
| `/laporan` | `src/pages/laporan.astro` | Pusat layanan pengaduan lingkungan hidup warga yang terhubung ke hotline WhatsApp DLH Surabaya dan Call Center 112. |
| `/login` | `src/pages/login.astro` | Form login akun relawan menggunakan Supabase Auth (Email & Password). |
| `/daftar` | `src/pages/daftar.astro` | Form registrasi akun baru relawan dengan validasi data real-time. |
| `/admin/login` | `src/pages/admin/login.astro` | Gerbang autentikasi khusus tim administrator sistem Cangkruk Hijau. |
| `/admin/dashboard` | `src/pages/admin/dashboard.astro` | Panel kendali administrator: rekapitulasi data pendaftar FGD, daftar pengaduan warga, dan keanggotaan komunitas. |
| `/en` | `src/pages/en/index.astro` | Halaman beranda versi Bahasa Inggris untuk menjangkau audiens internasional / ekspatriat. |

---

## 3. Komponen Antarmuka UI (*Reusable Components*)

1. **`Layout.astro`**: Kerangka utama seluruh halaman. Mengelola `<head>`, metadata SEO Open Graph, navigasi bilah atas yang ramping (logo, menu tautan, status user/login, search button), modal pencarian live omnibox, dan footer informasi.
2. **`CommunityCard.astro`**: Kartu komunitas fleksibel dengan avatar, label cakupan aksi, nama, deskripsi, pin alamat, tautan kontak media sosial (WhatsApp, Instagram, Email), dan tombol aksi gabung/batal gabung interaktif.
3. **`EducationCard.astro`**: Kartu modul edukasi lingkungan dengan thumbnail, badge kategori terpisah horizontal, estimasi halaman & ukuran file, accordion poin pembahasan, tombol unduh PDF, dan tautan pratinjau tab baru.
4. **`NewsCard.astro`**: Kartu artikel berita dengan tag kategori warna-warni, foto sampul tajam, tanggal rilis, ringkasan berita, dan transisi hover yang halus.
5. **`ParkCard.astro`**: Kartu profil ringkas taman kota pada panel daftar peta RTH Surabaya.
6. **`ReportBanner.astro`**: Banner siaga hotline pengaduan lingkungan terpadu yang menampilkan nomor Call Center 112 dan kontak WhatsApp DLH Surabaya.

---

## 4. Backend API Endpoints & Library Helper

- **`src/lib/supabase.js`**: Inisialisasi client Supabase publik berbasis browser.
- **`src/lib/supabaseServer.js`**: Inisialisasi client Supabase server berbasis request cookies untuk session tracking pengguna yang aman.
- **`src/lib/supabaseAdmin.js`**: Inisialisasi client Supabase backend menggunakan `SUPABASE_SERVICE_ROLE_KEY` untuk eksekusi query yang membutuhkan hak administratif (bypass RLS) saat registrasi data server-side.
- **`src/pages/api/fgd/register.js`**: Endpoint API `POST` untuk validasi, pencegahan duplikasi, dan pencatatan pendaftaran peserta FGD ke tabel `fgd_registrations`.
- **`src/pages/api/communities/join.js`**: Endpoint API `POST` untuk mencatat keikutsertaan pengguna login ke tabel `user_communities`.
- **`src/pages/api/communities/leave.js`**: Endpoint API `POST` untuk menghapus keikutsertaan pengguna dari komunitas.
- **`src/pages/api/auth/logout.js`**: Endpoint API `POST` untuk menghapus cookie sesi dan logout dari sistem.
