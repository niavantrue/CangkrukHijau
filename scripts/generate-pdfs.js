import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/documents');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function escapePdfText(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function createSimplePdf({ title, topic, type, pagesCount, highlights, description }) {
  // We will build a valid multi-page or structured PDF format
  const streamLines = [
    'BT',
    '/F1 18 Tf',
    '50 780 Td',
    `(CANGKRUK HIJAU - ${escapePdfText(type.toUpperCase())}) Tj`,
    '/F2 10 Tf',
    '0 -18 Td',
    `(${escapePdfText('Portal Informasi & Kolaborasi Komunitas Lingkungan Surabaya')}) Tj`,
    '0 -10 Td',
    'ET',
    // Draw a decorative line
    'q',
    '0.11 0.42 0.23 rg', // #1B6B3A in RGB
    '50 742 512 3 re',
    'f',
    'Q',
    'BT',
    '/F1 14 Tf',
    '50 715 Td',
    `(${escapePdfText(title)}) Tj`,
    '/F2 11 Tf',
    '0 -22 Td',
    `(${escapePdfText('Topik: ' + topic + '  |  Jumlah Halaman: ' + pagesCount + ' hlm  |  Edisi: 2026')}) Tj`,
    '0 -24 Td',
    '/F1 12 Tf',
    `(${escapePdfText('Ringkasan Materi:')}) Tj`,
    '/F2 10.5 Tf',
    '0 -18 Td',
    `(${escapePdfText(description)}) Tj`,
    '0 -28 Td',
    '/F1 12 Tf',
    `(${escapePdfText('Poin-Poin Utama / Materi Pembahasan:')}) Tj`,
    '/F2 10.5 Tf'
  ];

  let currentOffset = -18;
  highlights.forEach((point, idx) => {
    streamLines.push(`0 ${currentOffset} Td`);
    streamLines.push(`(${idx + 1}. ${escapePdfText(point)}) Tj`);
    currentOffset = -16;
  });

  streamLines.push('0 -32 Td');
  streamLines.push('/F1 11 Tf');
  streamLines.push(`(${escapePdfText('Hak Cipta & Penggunaan:')}) Tj`);
  streamLines.push('/F2 9.5 Tf');
  streamLines.push('0 -16 Td');
  streamLines.push(`(${escapePdfText('Materi ini diterbitkan secara terbuka oleh Cangkruk Hijau untuk kepentingan edukasi publik.')}) Tj`);
  streamLines.push('0 -14 Td');
  streamLines.push(`(${escapePdfText('Kunjungi website kami di https://cangkrukhijau.vercel.app/edukasi untuk update modul terbaru.')}) Tj`);
  streamLines.push('ET');

  const contentStream = streamLines.join('\n');
  const streamLength = Buffer.byteLength(contentStream, 'utf-8');

  const objects = [];
  
  // 1: Catalog
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  // 2: Pages
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  // 3: Page
  objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n');
  // 4: Contents
  objects.push(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`);
  // 5: Font F1 (Helvetica-Bold)
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');
  // 6: Font F2 (Helvetica)
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

  let body = '%PDF-1.4\n';
  const xrefOffsets = [0]; // object 0 offset

  for (let i = 0; i < objects.length; i++) {
    xrefOffsets.push(Buffer.byteLength(body, 'utf-8'));
    body += objects[i];
  }

  const startXref = Buffer.byteLength(body, 'utf-8');
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    xref += String(xrefOffsets[i]).padStart(10, '0') + ' 00000 n \n';
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  return Buffer.from(body + xref + trailer, 'utf-8');
}

const materials = [
  {
    fileName: 'panduan-kompos-rumah-tangga.pdf',
    title: 'Panduan Pembuatan Kompos Rumah Tangga',
    topic: 'Pengelolaan Sampah',
    type: 'Modul Panduan Praktis',
    pagesCount: 16,
    description: 'Panduan praktis mengolah sisa makanan dapur menjadi pupuk organik berkualitas tinggi tanpa bau.',
    highlights: [
      'Pembuatan starter bakteri alami (biang kompos) dari ragi dan gula.',
      'Teknik perakitan keranjang Takakura mandiri hemat biaya.',
      'Daftar bahan organik hijau vs cokelat yang seimbang.',
      'Solusi cepat mengatasi larva dan bau amonia pada tumpukan kompos.'
    ]
  },
  {
    fileName: 'kajian-rth-surabaya.pdf',
    title: 'Kajian Efektivitas Ruang Terbuka Hijau & Koridor Angin Surabaya',
    topic: 'Ruang Terbuka Hijau',
    type: 'Kajian Ringkas',
    pagesCount: 28,
    description: 'Analisis spasial mengenai peran kanopi pohon kota dalam menurunkan efek Urban Heat Island (UHI).',
    highlights: [
      'Peta sebaran suhu permukaan kota Surabaya dan indeks vegetasi NDVI.',
      'Spesies pohon peneduh lokal dengan daya serap emisi tertinggi (Trembesi, Tabebuya, Angsana).',
      'Rekomendasi konektivitas koridor hijau antar-kecamatan Surabaya Barat & Timur.',
      'Strategi integrasi RTH privat perkantoran dengan fasum perkampungan.'
    ]
  },
  {
    fileName: 'modul-pilah-sampah.pdf',
    title: 'Modul Pelatihan Pemilahan Sampah 5 Kategori untuk Sekolah & Komunitas',
    topic: 'Edukasi Lingkungan',
    type: 'Modul Kurikulum Aksi',
    pagesCount: 22,
    description: 'Materi kurikulum aksi lingkungan interaktif untuk kader dan pegiat bank sampah perkotaan.',
    highlights: [
      'Standarisasi kode warna tempat sampah (Organik, Plastik, Kertas, B3, Residu).',
      'Sistem pembukuan dan kalkulasi nilai ekonomi tabungan bank sampah unit.',
      'Game dan lembar kerja interaktif aksi hijau ramah anak.',
      'Rantai pasok industri daur ulang limbah anorganik di Jawa Timur.'
    ]
  },
  {
    fileName: 'buku-saku-konservasi-air.pdf',
    title: 'Buku Saku Konservasi Air Bersih & Pembuatan Sumur Resapan',
    topic: 'Konservasi Air',
    type: 'Buku Saku Komunitas',
    pagesCount: 14,
    description: 'Petunjuk teknis pemanenan air hujan (rainwater harvesting) dan pencegahan intrusi air laut.',
    highlights: [
      'Desain instalasi pemanen air hujan mandiri dengan filter pasir dan arang aktif.',
      'Standar jarak aman septic tank dari sumur air minum (minimal 10 meter).',
      'Teknik pembuatan sumur resapan dangkal di pekarangan rumah perkotaan.',
      'Tips penghematan air harian dalam rumah tangga keluarga.'
    ]
  },
  {
    fileName: 'panduan-urban-farming-organik.pdf',
    title: 'Panduan Praktis Urban Farming & Sayuran Organik Lahan Sempit',
    topic: 'Pertanian Perkotaan',
    type: 'Modul Panduan Lapangan',
    pagesCount: 20,
    description: 'Metode budidaya tanaman pangan ramah lingkungan di pekarangan, dinding, dan atap rumah (rooftop).',
    highlights: [
      'Pemilihan jenis sayuran daun cepat panen (kangkung, bayam, sawi, pakcoy).',
      'Pembuatan pupuk organik cair (POC) dan pestisida nabati daun nimba.',
      'Sistem irigasi wick system memanfaatkan botol plastik mineral bekas.',
      'Rotasi jadwal tanam untuk ketahanan pangan keluarga sepanjang tahun.'
    ]
  },
  {
    fileName: 'kajian-kualitas-udara-transportasi.pdf',
    title: 'Laporan Kualitas Udara & Mitigasi Emisi Transportasi Urban',
    topic: 'Kualitas Udara & Transportasi',
    type: 'Kajian & Riset Kebijakan',
    pagesCount: 32,
    description: 'Laporan tren parameter PM2.5, NO2, dan CO di koridor utama Surabaya serta efektivitas uji emisi.',
    highlights: [
      'Analisis tren konsentrasi PM2.5 tahunan dari 5 stasiun pemantau AQMS Surabaya.',
      'Dampak polutan lalu lintas terhadap kesehatan pernapasan kelompok rentan.',
      'Simulasi potensi reduksi emisi karbon melalui bus listrik dan jalur sepeda.',
      'Rekomendasi implementasi Zona Rendah Emisi (Low Emission Zone) di pusat kota.'
    ]
  }
];

materials.forEach(mat => {
  const pdfBuffer = createSimplePdf(mat);
  const filePath = path.join(targetDir, mat.fileName);
  fs.writeFileSync(filePath, pdfBuffer);
  console.log(`Successfully generated valid PDF: ${filePath} (${pdfBuffer.length} bytes)`);
});
