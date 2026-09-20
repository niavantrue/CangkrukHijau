export const educationMaterials = [
  {
    id: 'panduan-kompos-rumah-tangga',
    title: 'Panduan Pembuatan Kompos Rumah Tangga (Metode Takakura & Biopori)',
    topic: 'Pengelolaan Sampah',
    type: 'Modul Panduan',
    fileSize: '1.8 MB',
    pagesCount: 16,
    icon: '♻',
    coverImage: '/images/edukasi/panduan-kompos.webp',
    description: 'Panduan praktis langkah-demi-langkah mengolah sisa makanan dapur menjadi pupuk organik berkualitas tinggi tanpa bau tak sedap.',
    pdfUrl: '/documents/panduan-kompos-rumah-tangga.pdf',
    downloadName: 'panduan-kompos-rumah-tangga.pdf',
    highlights: [
      'Pembuatan starter bakteri alami (biang kompos).',
      'Teknik perakitan keranjang takakura hemat biaya.',
      'Daftar bahan organik yang boleh dan dilarang dimasukkan.',
      'Solusi mengatasi larva dan bau amonia pada tumpukan.'
    ]
  },
  {
    id: 'kajian-rth-surabaya',
    title: 'Kajian Efektivitas Ruang Terbuka Hijau & Koridor Angin Surabaya',
    topic: 'Ruang Terbuka Hijau',
    type: 'Kajian Ringkas',
    fileSize: '2.4 MB',
    pagesCount: 28,
    icon: '🧭',
    coverImage: '/images/edukasi/kajian-rth.webp',
    description: 'Analisis spasial mengenai peran kanopi pohon kota, vegetasi mangrove, dan jalur hijau jalan protokol dalam menurunkan efek Urban Heat Island (UHI).',
    pdfUrl: '/documents/kajian-rth-surabaya.pdf',
    downloadName: 'kajian-rth-surabaya.pdf',
    highlights: [
      'Peta sebaran suhu permukaan kota Surabaya.',
      'Spesies pohon lokal dengan daya serap emisi tertinggi.',
      'Rekomendasi konektivitas koridor hijau antar-kecamatan.',
      'Strategi integrasi RTH privat dengan fasum perkampungan.'
    ]
  },
  {
    id: 'modul-pilah-sampah',
    title: 'Modul Pelatihan Pemilahan Sampah 5 Kategori untuk Sekolah & Komunitas',
    topic: 'Edukasi Lingkungan',
    type: 'Modul Aksi',
    fileSize: '2.1 MB',
    pagesCount: 22,
    icon: '🌱',
    coverImage: '/images/edukasi/modul-pilah-sampah.webp',
    description: 'Materi kurikulum aksi lingkungan interaktif untuk guru, kader lingkungan, dan pengurus RT/RW dalam membangun kebiasaan pilah sampah sejak sumbernya.',
    pdfUrl: '/documents/modul-pilah-sampah.pdf',
    downloadName: 'modul-pilah-sampah.pdf',
    highlights: [
      'Standarisasi kode warna dan jenis tempat sampah.',
      'Sistem pembukuan tabungan bank sampah unit.',
      'Game dan lembar kerja aksi hijau untuk siswa sekolah.',
      'Siklus ekonomi daur ulang plastik dan kertas bernilai.'
    ]
  },
  {
    id: 'buku-saku-konservasi-air',
    title: 'Buku Saku Konservasi Air Bersih & Pembuatan Sumur Resapan',
    topic: 'Konservasi Air',
    type: 'Buku Saku',
    fileSize: '1.5 MB',
    pagesCount: 14,
    icon: '💧',
    coverImage: '/images/edukasi/buku-saku-air.webp',
    description: 'Petunjuk teknis pemanenan air hujan (rainwater harvesting), perlindungan sumur dangkal dari intrusi air asin, dan sanitasi ramah lingkungan.',
    pdfUrl: '/documents/buku-saku-konservasi-air.pdf',
    downloadName: 'buku-saku-konservasi-air.pdf',
    highlights: [
      'Desain instalasi pemanen air hujan mandiri.',
      'Standar jarak aman septic tank dari sumur air minum.',
      'Teknik pembuatan sumur resapan dangkal di pekarangan.',
      'Tips penghematan air harian di lingkungan perkotaan.'
    ]
  },
  {
    id: 'panduan-urban-farming-organik',
    title: 'Panduan Praktis Urban Farming & Sayuran Organik Lahan Sempit',
    topic: 'Pertanian Perkotaan',
    type: 'Modul Panduan',
    fileSize: '2.6 MB',
    pagesCount: 20,
    icon: '🌾',
    coverImage: '/images/edukasi/urban-farming.webp',
    description: 'Metode budidaya tanaman pangan ramah lingkungan di pekarangan rumah, balkon, dan gang kampung dengan hidroponik sederhana serta pot vertikal.',
    pdfUrl: '/documents/panduan-urban-farming-organik.pdf',
    downloadName: 'panduan-urban-farming-organik.pdf',
    highlights: [
      'Pemilihan jenis sayuran cepat panen (kangkung, bayam, sawi).',
      'Pembuatan pestisida nabati dari daun tembakau dan mimba.',
      'Sistem irigasi tetes menggunakan botol plastik bekas.',
      'Manajemen jadwal tanam untuk panen berkesinambungan.'
    ]
  },
  {
    id: 'kajian-kualitas-udara-transportasi',
    title: 'Laporan Kualitas Udara & Mitigasi Emisi Transportasi Urban',
    topic: 'Udara Bersih',
    type: 'Kajian Ringkas',
    fileSize: '3.1 MB',
    pagesCount: 32,
    icon: '🧪',
    coverImage: '/images/edukasi/kualitas-udara.webp',
    description: 'Laporan komprehensif dinamika polutan PM2.5, NO2, dan CO di koridor utama Surabaya serta efektivitas uji emisi kendaraan bermotor.',
    pdfUrl: '/documents/kajian-kualitas-udara-transportasi.pdf',
    downloadName: 'kajian-kualitas-udara-transportasi.pdf',
    highlights: [
      'Data tren tahunan ISPU di 5 stasiun pemantau AQMS.',
      'Dampak emisi terhadap kesehatan pernapasan kelompok rentan.',
      'Kalkulasi reduksi karbon melalui peralihan ke transportasi publik.',
      'Rekomendasi zona rendah emisi (Low Emission Zone).'
    ]
  }
];

export function getEducationById(id) {
  return educationMaterials.find((m) => m.id === id);
}
