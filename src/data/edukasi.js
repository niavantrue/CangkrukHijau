export const educationMaterials = [
  {
    id: 'edukasi-lingkungan-melalui-environment-action-sdn39',
    title: 'Edukasi Lingkungan Melalui Environment Action Di SDN 39 Tungkal I, Tanjung Jabung Barat',
    topic: 'Edukasi Lingkungan',
    type: 'Jurnal Pengabdian',
    fileSize: '534 KB',
    pagesCount: 11,
    pages: 11,
    level: 'SD & Pendidik',
    icon: '🌱',
    coverImage: '/images/edukasi/modul-pilah-sampah.webp',
    description: 'Program pengabdian masyarakat untuk menumbuhkan kepedulian lingkungan sejak dini pada siswa sekolah dasar melalui aksi nyata kebersihan, pemilahan sampah, dan penghijauan sekolah.',
    pdfUrl: '/documents/Edukasi_Lingkungan_Melalui_Environment_Action_Di_SDN39.pdf',
    downloadName: 'Edukasi_Lingkungan_Melalui_Environment_Action_Di_SDN39.pdf',
    highlights: [
      'Penanaman kesadaran peduli lingkungan sejak usia sekolah dasar.',
      'Metode aksi nyata (Environment Action) terpadu di lingkungan sekolah.',
      'Pembiasaan pemilahan sampah organik dan anorganik secara mandiri.',
      'Kolaborasi aktif siswa, guru, dan tim pengabdi dalam penghijauan.'
    ]
  },
  {
    id: 'implementasi-pendidikan-lingkungan-tahura-sultan-adam',
    title: 'Implementasi Pendidikan Lingkungan Hidup Pada Taman Konservasi Anggrek Tahura Sultan Adam',
    topic: 'Konservasi Hayati',
    type: 'Jurnal Riset Konservasi',
    fileSize: '279 KB',
    pagesCount: 6,
    pages: 6,
    level: 'Umum & Peneliti',
    icon: '🌸',
    coverImage: '/images/taman/taman-flora-bratang.webp',
    description: 'Kajian implementasi pendidikan lingkungan hidup berbasis konservasi tanaman anggrek di Taman Hutan Raya Sultan Adam sebagai laboratorium alam, sarana ekopedagogi, dan pelestarian flora.',
    pdfUrl: '/documents/IMPLEMENTASI_PENDIDIKAN_LINGKUNGAN_HIDUP_PADA _TAMAN (2).pdf',
    downloadName: 'IMPLEMENTASI_PENDIDIKAN_LINGKUNGAN_HIDUP_PADA _TAMAN (2).pdf',
    highlights: [
      'Pemanfaatan taman konservasi anggrek sebagai sarana laboratorium alam.',
      'Dokumentasi dan pelestarian ragam anggrek endemik kawasan Tahura.',
      'Integrasi nilai-nilai ekopedagogi pada kegiatan kunjungan dan ekowisata.',
      'Peran pengelola dan akademisi dalam pendidikan konservasi flora.'
    ]
  },
  {
    id: 'pendidikan-lingkungan-berbasis-proyek-perubahan-iklim',
    title: 'Pendidikan Lingkungan Berbasis Proyek Untuk Meningkatkan Kesadaran Siswa Terhadap Perubahan Iklim',
    topic: 'Aksi Perubahan Iklim',
    type: 'Jurnal Studi Ilmiah',
    fileSize: '160 KB',
    pagesCount: 6,
    pages: 6,
    level: 'Siswa & Guru',
    icon: '🌍',
    coverImage: '/images/edukasi/kualitas-udara.webp',
    description: 'Kajian ilmiah penerapan metode pembelajaran berbasis proyek (Project-Based Learning) untuk meningkatkan pemahaman, daya kritis, dan kesadaran pro-lingkungan siswa menghadapi krisis iklim.',
    pdfUrl: '/documents/PENDIDIKAN_LINGKUNGAN_BERBASIS_PROYEK_UNTUK.pdf',
    downloadName: 'PENDIDIKAN_LINGKUNGAN_BERBASIS_PROYEK_UNTUK.pdf',
    highlights: [
      'Penerapan Project-Based Learning (PjBL) fokus mitigasi iklim.',
      'Peningkatan kesadaran ekologis dan keterampilan berpikir kritis siswa.',
      'Analisis faktor pendukung dan tantangan integrasi kurikulum lingkungan.',
      'Rekomendasi strategi edukasi iklim praktis dan berkelanjutan di sekolah.'
    ]
  },
  {
    id: 'peran-mahasiswa-mengedukasi-masyarakat-lingkungan-sehat',
    title: 'Peran Mahasiswa dalam Mengedukasi Masyarakat Pentingnya Menjaga Lingkungan dan Gaya Hidup Sehat',
    topic: 'Pemberdayaan Warga',
    type: 'Jurnal Pengabdian Warga',
    fileSize: '288 KB',
    pagesCount: 6,
    pages: 6,
    level: 'Mahasiswa & Warga',
    icon: '👥',
    coverImage: '/images/edukasi/panduan-kompos.webp',
    description: 'Studi peran mahasiswa dalam mendampingi dan mengedukasi warga masyarakat mengenai urgensi sanitasi lingkungan pemukiman, pengelolaan sampah mandiri, serta pembiasaan pola hidup bersih dan sehat.',
    pdfUrl: '/documents/Peran_Mahasiswa_dalam_Mengedukasi_Masyarakat_Pentingnya.pdf',
    downloadName: 'Peran_Mahasiswa_dalam_Mengedukasi_Masyarakat_Pentingnya.pdf',
    highlights: [
      'Peran mahasiswa sebagai katalis perubahan perilaku ramah lingkungan.',
      'Edukasi sanitasi pemukiman dan pengelolaan sampah rumah tangga.',
      'Promosi pembiasaan gaya hidup sehat dan pencegahan penyakit menular.',
      'Penguatan kepedulian kolektif warga dalam menjaga kebersihan lingkungan.'
    ]
  }
];

export function getEducationById(id) {
  return educationMaterials.find((m) => m.id === id);
}
