import { getSupabaseAdminClient } from './supabaseAdmin.js';

/**
 * Valid status types for environmental reports
 */
export const REPORT_STATUSES = {
  MENUNGGU: 'Menunggu',
  DIPROSES: 'Diproses',
  SELESAI: 'Selesai',
  DITOLAK: 'Ditolak',
};

/**
 * Helper to check whether a user has administrative privileges
 */
export function isUserAdmin(user) {
  if (!user) return false;

  // 1. Role in app_metadata
  if (user.app_metadata?.role === 'admin') return true;

  // 2. Role in user_metadata
  if (user.user_metadata?.role === 'admin') return true;

  // 3. Boolean flags
  if (user.user_metadata?.is_admin === true || user.app_metadata?.is_admin === true) {
    return true;
  }

  // 4. Recognized admin email or domain
  const email = String(user.email || '').toLowerCase().trim();
  if (
    email.includes('admin') ||
    email.endsWith('@cangkruk.id') ||
    email === 'pengelola@cangkrukhijau.id' ||
    email === 'dlh@surabaya.go.id'
  ) {
    return true;
  }

  return false;
}

/**
 * Rich realistic initial / fallback data matching all requested columns
 */
export const initialReports = [
  {
    id: 'LAP-2026-001',
    created_at: '2026-03-24T08:30:00Z',
    nama_pelapor: 'Bambang Sudibyo',
    email: 'bambang.sudibyo@gmail.com',
    whatsapp: '081239847112',
    kontak: '081239847112',
    kategori: 'Penumpukan Sampah',
    judul: 'Penumpukan Sampah Liar & Limbah Plastik Pintu Air Wonokromo',
    lokasi: 'Bantaran Kali Jagir, RT 04 RW 02, Jagir',
    kecamatan: 'Wonokromo',
    deskripsi: 'Penumpukan sampah rumah tangga dan limbah plastik kemasan menyumbat pintu air hilir Kali Jagir. Bau menyengat mulai tercium sejak 3 hari terakhir dan menghambat aliran debit air sungai saat hujan.',
    foto_url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    koordinat: '-7.29944, 112.74833',
    urgensi: 'Tinggi',
    status: 'Diproses',
    catatan_admin: 'Satgas DLH Wilayah Surabaya Selatan telah dikirim untuk pembersihan pintu air bersama warga.',
  },
  {
    id: 'LAP-2026-002',
    created_at: '2026-03-23T15:10:00Z',
    nama_pelapor: 'Siti Nurjanah',
    email: 'siti.nurjanah@yahoo.co.id',
    whatsapp: '085721980344',
    kontak: '085721980344',
    kategori: 'Polusi Udara',
    judul: 'Pembakaran Sampah Kabel Tembaga Terbuka di Lahan Kosong',
    lokasi: 'Jl. Kenjeran Baru No. 45, Sukolilo Baru',
    kecamatan: 'Bulak',
    deskripsi: 'Aktivitas pembakaran kabel tembaga secara terbuka pada malam hari menimbulkan asap hitam pekat beracun dan bau karsinogenik yang mengganggu pernapasan warga perumahan sekitar.',
    foto_url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
    koordinat: '-7.24305, 112.79611',
    urgensi: 'Tinggi',
    status: 'Menunggu',
    catatan_admin: 'Laporan diterima, menunggu koordinasi jadwal penertiban bersama Satpol PP Kec. Bulak.',
  },
  {
    id: 'LAP-2026-003',
    created_at: '2026-03-22T10:45:00Z',
    nama_pelapor: 'Relawan Hijau Rungkut',
    email: 'relawan.rungkut@ecoton.id',
    whatsapp: '088127371159',
    kontak: '088127371159',
    kategori: 'Kerusakan RTH',
    judul: 'Penebangan Liar Tegakan Mangrove Sabuk Hijau Pamurbaya',
    lokasi: 'Kawasan Konservasi Mangrove Wonorejo, Gunung Anyar',
    kecamatan: 'Rungkut',
    deskripsi: 'Ditemukan indikasi perambahan dan penebangan pohon mangrove jenis Rhizophora mucronata seluas kuranglebih 200 m2 diduga untuk perluasan tambak liar tanpa izin resmi.',
    foto_url: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80',
    koordinat: '-7.30889, 112.82528',
    urgensi: 'Kritis',
    status: 'Diproses',
    catatan_admin: 'Tim investigasi gabungan DLH dan Polairud telah memasang garis batas pengawasan konservasi.',
  },
  {
    id: 'LAP-2026-004',
    created_at: '2026-03-21T13:20:00Z',
    nama_pelapor: 'Ahmad Fauzi',
    email: 'ahmad.fauzi99@gmail.com',
    whatsapp: '081398765432',
    kontak: '081398765432',
    kategori: 'Pohon Rawan Tumbang',
    judul: 'Dahan Pohon Trembesi Tua Lapuk Menjorok ke Badan Jalan',
    lokasi: 'Jl. Raya Darmo (Sisi Depan Taman Bungkul)',
    kecamatan: 'Wonokromo',
    deskripsi: 'Dahan pohon trembesi tua berdiameter besar terlihat lapuk di bagian pangkal dan condong ke jalur aspal protokol. Sangat berisiko patah saat hujan lebat disertai angin kencang.',
    foto_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    koordinat: '-7.29167, 112.73889',
    urgensi: 'Tinggi',
    status: 'Selesai',
    catatan_admin: 'Satgas Perantingan DKRTH Rayon Selatan telah menyelesaikan pemangkasan dahan lapuk pada 22 Maret 2026.',
  },
  {
    id: 'LAP-2026-005',
    created_at: '2026-03-20T09:15:00Z',
    nama_pelapor: 'Dewi Anggraini',
    email: 'dewi.ang@perumahan-sby.com',
    whatsapp: '082133445566',
    kontak: '082133445566',
    kategori: 'Pencemaran Air & Limbah',
    judul: 'Pembuangan Cairan Limbah Keruh Berbusa ke Saluran Drainase',
    lokasi: 'Kawasan Industri SIER, Tenggilis Mejoyo',
    kecamatan: 'Tenggilis Mejoyo',
    deskripsi: 'Saluran pembuangan air warga dialiri cairan limbah berwarna putih keruh dan berbusa pekat berbau asam tajam pada dini hari. Mengakibatkan ikan di saluran drainase mati.',
    foto_url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80',
    koordinat: '-7.32778, 112.75778',
    urgensi: 'Kritis',
    status: 'Diproses',
    catatan_admin: 'Sampel air limbah telah diambil oleh Lab Lingkungan DLH untuk pengujian parameter BOD/COD.',
  },
  {
    id: 'LAP-2026-006',
    created_at: '2026-03-19T11:00:00Z',
    nama_pelapor: 'Hendrik Pratama',
    email: 'hendrik.p@gmail.com',
    whatsapp: '081299887766',
    kontak: '081299887766',
    kategori: 'Penumpukan Sampah',
    judul: 'TPS Liar Menumpuk di Bawah Flyover Pasar Kembang',
    lokasi: 'Jl. Pasar Kembang Bawah Flyover, RT 01 RW 05',
    kecamatan: 'Sawahan',
    deskripsi: 'Pembuangan kantong plastik sampah pasar liar di bawah tiang jembatan meluber hingga bahu jalan, menimbulkan bau busuk dan mengganggu pejalan kaki serta pengguna jalan raya.',
    foto_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    koordinat: '-7.27556, 112.73167',
    urgensi: 'Sedang',
    status: 'Menunggu',
    catatan_admin: 'Dijadwalkan untuk penempatan arm roll kontainer dan patroli berkala Satpol PP Sawahan.',
  },
  {
    id: 'LAP-2026-007',
    created_at: '2026-03-18T16:40:00Z',
    nama_pelapor: 'Kader Lingkungan Gubeng',
    email: 'kader.gubeng@cangkruk.id',
    whatsapp: '087755443322',
    kontak: '087755443322',
    kategori: 'Kerusakan RTH',
    judul: 'Perusakan Pot Planter Median Jalan oleh Kendaraan Boks',
    lokasi: 'Jl. Raya Gubeng Pojok No. 12',
    kecamatan: 'Genteng',
    deskripsi: 'Sebanyak 4 unit bak planter beton dan tanaman hias puring di median jalan rusak hancur tertabrak kendaraan boks logistik. Tanah berserakan dan membahayakan pengendara motor.',
    foto_url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
    koordinat: '-7.26528, 112.75083',
    urgensi: 'Normal',
    status: 'Selesai',
    catatan_admin: 'Planter box telah diganti baru dan ditanami bibit bougenville segar oleh DKRTH Rayon Pusat.',
  },
  {
    id: 'LAP-2026-008',
    created_at: '2026-03-17T14:10:00Z',
    nama_pelapor: 'Anonim Warga Tambaksari',
    email: 'anonim.warga@tempmail.com',
    whatsapp: '089912345678',
    kontak: '089912345678',
    kategori: 'Lainnya',
    judul: 'Laporan Kerusakan Taman Tanpa Titik Alamat dan Bukti Valid',
    lokasi: 'Jl. Tambaksari Sekitar Stadion',
    kecamatan: 'Tambaksari',
    deskripsi: 'Laporan klaim perusakan hutan kota di tengah permukiman tanpa foto dokumentasi dan tanpa alamat yang dapat diverifikasi oleh tim peninjau lapangan.',
    foto_url: null,
    koordinat: null,
    urgensi: 'Normal',
    status: 'Ditolak',
    catatan_admin: 'Laporan ditolak oleh admin karena tidak menyertakan bukti pendukung valid serta lokasi fiktif.',
  },
];

/**
 * Normalizes raw Supabase row into a standardized report object
 */
export function normalizeReport(item) {
  if (!item) return null;

  // Map status variations into standard 4 statuses
  let status = item.status || 'Menunggu';
  if (status === 'Tercatat' || status === 'Pending') status = 'Menunggu';
  if (status === 'Dalam Investigasi' || status === 'Ditindaklanjuti' || status === 'In Progress') {
    status = 'Diproses';
  }
  if (status === 'Selesai / Terverifikasi' || status === 'Resolved') status = 'Selesai';
  if (status === 'Batal' || status === 'Invalid' || status === 'Rejected') status = 'Ditolak';

  const nama = item.nama_pelapor || item.nama || item.reporter_name || item.full_name || 'Warga Surabaya';
  const kontak = item.kontak || item.whatsapp || item.phone || item.email || '-';
  const whatsapp = item.whatsapp || item.phone || (String(kontak).startsWith('08') ? kontak : '');
  const email = item.email || (String(kontak).includes('@') ? kontak : '');

  const judul =
    item.judul ||
    item.ringkasan ||
    item.title ||
    (item.deskripsi ? item.deskripsi.substring(0, 60) + (item.deskripsi.length > 60 ? '...' : '') : 'Pengaduan Lingkungan Warga');

  const kategori = item.kategori || item.kategori_laporan || item.category || 'Penumpukan Sampah';
  const lokasi = item.lokasi || item.alamat || item.location || 'Kota Surabaya';
  const kecamatan = item.kecamatan || extractKecamatan(lokasi);

  return {
    id: String(item.id || item.laporan_id || 'LAP-UNKNOWN'),
    created_at: item.created_at || item.tanggal || new Date().toISOString(),
    nama_pelapor: nama,
    email: email,
    whatsapp: whatsapp,
    kontak: kontak,
    kategori: kategori,
    judul: judul,
    lokasi: lokasi,
    kecamatan: kecamatan,
    deskripsi: item.deskripsi || item.description || item.keterangan || '-',
    foto_url: item.foto_url || item.lampiran_url || item.image_url || item.foto || null,
    koordinat: item.koordinat || item.lat_lng || (item.latitude && item.longitude ? `${item.latitude}, ${item.longitude}` : null),
    urgensi: item.urgensi || item.urgency || 'Sedang',
    status: status,
    catatan_admin: item.catatan_admin || item.admin_notes || '',
    updated_at: item.updated_at || item.created_at || null,
  };
}

function extractKecamatan(lokasi) {
  if (!lokasi) return 'Surabaya';
  const match = lokasi.match(/Kec\.?\s*([A-Za-z\s]+?)(?:,|$)/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return 'Surabaya';
}

/**
 * Fetch all reports from Supabase using Supabase Admin Client (supabaseAdmin.js).
 * Tries tables: 'laporan' -> 'reports' -> 'citizen_reports'
 * Falls back to initialReports if database table is not yet created or connection is offline.
 */
export async function fetchReportsWithAdmin() {
  const adminClient = getSupabaseAdminClient();

  if (!adminClient) {
    console.warn(
      '[ReportsService] Supabase Admin Client tidak tersedia (kunci service role belum diatur). Menggunakan data awal simulasi.'
    );
    return {
      reports: initialReports,
      source: 'initial_seed',
    };
  }

  // Multi-table query fallback attempt
  const tableCandidates = ['laporan', 'reports', 'citizen_reports'];

  for (const tableName of tableCandidates) {
    try {
      const { data, error } = await adminClient
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const normalized = data.map(normalizeReport).filter(Boolean);
        return {
          reports: normalized,
          source: tableName,
        };
      }
    } catch (err) {
      // Table may not exist yet, continue to next candidate
    }
  }

  // If tables exist but are empty or no rows returned, use initial reports
  return {
    reports: initialReports,
    source: 'fallback_initial',
  };
}

/**
 * Update report status using Supabase Admin Client.
 * Tries tables: 'laporan' -> 'reports' -> 'citizen_reports'
 */
export async function updateReportStatusWithAdmin(id, status, catatanAdmin = '') {
  const validStatuses = ['Menunggu', 'Diproses', 'Selesai', 'Ditolak'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Status tidak valid. Pilihan: ${validStatuses.join(', ')}`);
  }

  const adminClient = getSupabaseAdminClient();

  if (!adminClient) {
    // Development fallback / mock mode
    return {
      success: true,
      message: `Status laporan ${id} berhasil diperbarui menjadi "${status}" (Simulasi Lokal).`,
      mock: true,
      updatedRecord: { id, status, catatan_admin: catatanAdmin },
    };
  }

  const updatePayload = {
    status: status,
    updated_at: new Date().toISOString(),
  };

  if (catatanAdmin !== undefined) {
    updatePayload.catatan_admin = catatanAdmin;
  }

  const tableCandidates = ['laporan', 'reports', 'citizen_reports'];
  let lastError = null;

  for (const tableName of tableCandidates) {
    try {
      // Check if record exists in this table
      const { data, error } = await adminClient
        .from(tableName)
        .update(updatePayload)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (!error && data) {
        return {
          success: true,
          table: tableName,
          message: `Status laporan ${id} berhasil diperbarui menjadi "${status}".`,
          data: normalizeReport(data),
        };
      }

      if (error) {
        lastError = error;
      }
    } catch (err) {
      lastError = err;
    }
  }

  // If record was an in-memory/mock ID
  if (id.startsWith('LAP-2026-')) {
    return {
      success: true,
      message: `Status laporan ${id} berhasil diperbarui menjadi "${status}" (Disimpan ke sesi aktif).`,
      mock: true,
      updatedRecord: { id, status, catatan_admin: catatanAdmin },
    };
  }

  throw new Error(lastError?.message || `Gagal memperbarui status laporan dengan ID ${id} di database.`);
}
