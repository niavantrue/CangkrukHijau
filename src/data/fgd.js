/**
 * @typedef {Object} FgdAgenda
 * @property {string} id
 * @property {string} title
 * @property {string} topic
 * @property {string} date
 * @property {string} time
 * @property {string} location
 * @property {number} quota
 * @property {number} registeredCount
 * @property {'Buka' | 'Penuh'} status
 * @property {string} speaker
 * @property {string} description
 * @property {string[]} tags
 */

/** @type {FgdAgenda[]} */
export const fgdAgendas = [
  {
    id: 'fgd-mangrove-wonorejo',
    title: 'Restorasi & Mitigasi Abrasi Kawasan Pesisir Pamurbaya (Pantai Timur Surabaya)',
    topic: 'Konservasi Mangrove & Ekosistem Pesisir',
    date: '28 Maret 2026',
    time: '09:00 - 12:30 WIB',
    location: 'Ekowisata Mangrove Wonorejo / Hybrid Zoom Meeting',
    quota: 40,
    registeredCount: 28,
    status: 'Buka',
    speaker: 'Dr. Hendra Wicaksono (Pakar Ekologi Pesisir) & Komunitas Sahabat Mangrove',
    description: 'Membahas strategi percepatan penanaman bibit bakau, zonasi perlindungan burung migran, serta keterlibatan warga Rungkut dalam menjaga sabuk hijau Surabaya.',
    tags: ['Mangrove', 'Pesisir', 'Konservasi'],
  },
  {
    id: 'fgd-sungai-surabaya-mikroplastik',
    title: 'Audit Kualitas Air dan Pengendalian Limbah Mikroplastik Kali Surabaya',
    topic: 'Kesehatan Sungai & Beban Pencemaran Air',
    date: '04 April 2026',
    time: '13:30 - 16:30 WIB',
    location: 'Gedung Balai RW V Karangpilang & Live Streaming',
    quota: 35,
    registeredCount: 35,
    status: 'Penuh',
    speaker: 'Tim Peneliti Ecoton Foundation & DLH Jawa Timur',
    description: 'Diskusi terarah bersama komunitas penjaga sungai mengenai hasil temuan kontaminasi partikel plastik pada biota sungai dan penyusunan rekomendasi perda zero-waste bantaran sungai.',
    tags: ['Sungai', 'Mikroplastik', 'Air Bersih'],
  },
  {
    id: 'fgd-tpa-benowo-energi',
    title: 'Optimalisasi Sirkular Ekonomi Sampah Organik Menuju Zero Waste City',
    topic: 'Pengelolaan Sampah & Sirkularitas TPA Benowo',
    date: '11 April 2026',
    time: '09:30 - 12:00 WIB',
    location: 'Ruang Kolaborasi Cangkruk Hijau, Gayungan / Zoom',
    quota: 50,
    registeredCount: 22,
    status: 'Buka',
    speaker: 'Nol Sampah Surabaya & Praktisi Komposting Komunitas',
    description: 'Peningkatan kapasitas bank sampah unit tingkat RW, budidaya maggot BSF untuk reduksi limbah dapur, dan integrasi pemilahan sampah organik dari hulu ke hilir.',
    tags: ['Sampah', 'Sirkular Ekonomi', 'Kompos'],
  },
  {
    id: 'fgd-rth-urban-farming',
    title: 'Ekspansi Ruang Terbuka Hijau (RTH) dan Ketahanan Pangan Berbasis Lorong',
    topic: 'Urban Farming & Ruang Hijau Publik',
    date: '18 April 2026',
    time: '14:00 - 17:00 WIB',
    location: 'Taman Harmoni Keputih & Hybrid',
    quota: 45,
    registeredCount: 19,
    status: 'Buka',
    speaker: 'Dinas Ketahanan Pangan Surabaya & Komunitas Kampung Hijau',
    description: 'Sinergi pemanfaatan lahan fasum sempit untuk kebun komunal hidroponik, penghijauan kanopi jalan pemukiman padat, dan perlindungan pohon peneduh kota.',
    tags: ['RTH', 'Urban Farming', 'Kota Hijau'],
  },
];
