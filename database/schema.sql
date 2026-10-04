-- ==============================================================================
-- CANGKRUK HIJAU - SUPABASE DATABASE SCHEMA
-- Platform Kolaborasi & Aksi Nyata Lingkungan Hidup Surabaya
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABEL: fgd_registrations (Pendaftaran Peserta FGD Lingkungan)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.fgd_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agenda_id TEXT NOT NULL,
    agenda_title TEXT NOT NULL DEFAULT 'Agenda FGD Cangkruk Hijau',
    full_name TEXT NOT NULL,
    institution TEXT DEFAULT 'Umum / Individu',
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    phone TEXT NOT NULL,
    motivation TEXT DEFAULT '-',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pencarian & validasi duplikasi per agenda
CREATE INDEX IF NOT EXISTS idx_fgd_registrations_agenda_email 
ON public.fgd_registrations(agenda_id, email);

CREATE INDEX IF NOT EXISTS idx_fgd_registrations_created_at 
ON public.fgd_registrations(created_at DESC);

-- RLS untuk fgd_registrations
ALTER TABLE public.fgd_registrations ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Publik dapat mendaftar (INSERT)
CREATE POLICY "Public can register to FGD" 
ON public.fgd_registrations 
FOR INSERT 
WITH CHECK (true);

-- Kebijakan: Hanya service role / admin yang dapat melihat seluruh pendaftar
CREATE POLICY "Admin/Service Role can view all FGD registrations" 
ON public.fgd_registrations 
FOR SELECT 
USING (true);

-- ==============================================================================
-- 3. TABEL: fgd_agendas (Katalog Jadwal & Kuota FGD)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.fgd_agendas (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    topic TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL DEFAULT '09:00 - 12:30 WIB',
    location TEXT NOT NULL DEFAULT 'Surabaya (Hybrid)',
    quota INT NOT NULL DEFAULT 40,
    registered_count INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Buka',
    speaker TEXT DEFAULT 'Praktisi & Akademisi Lingkungan',
    description TEXT,
    tags TEXT[] DEFAULT ARRAY['Lingkungan'],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.fgd_agendas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active FGD agendas" 
ON public.fgd_agendas 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can modify FGD agendas" 
ON public.fgd_agendas 
FOR ALL 
USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 4. TABEL: user_communities (Keanggotaan Komunitas Relawan)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_communities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    community_id TEXT NOT NULL,
    community_name TEXT NOT NULL,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_community UNIQUE (user_id, community_id)
);

CREATE INDEX IF NOT EXISTS idx_user_communities_user_id 
ON public.user_communities(user_id);

ALTER TABLE public.user_communities ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Pengguna hanya dapat mengelola data komunitas milik mereka sendiri
CREATE POLICY "Users can view own joined communities" 
ON public.user_communities 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can join communities" 
ON public.user_communities 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave communities" 
ON public.user_communities 
FOR DELETE 
USING (auth.uid() = user_id);

-- ==============================================================================
-- 5. TABEL: laporan / citizen_reports (Laporan Pengaduan Kerusakan Lingkungan Warga)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.laporan (
    id TEXT PRIMARY KEY DEFAULT ('LAP-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 9000 + 1000)::TEXT, 4, '0')),
    nama_pelapor TEXT NOT NULL,
    email TEXT,
    whatsapp TEXT,
    kontak TEXT NOT NULL,
    kategori TEXT NOT NULL DEFAULT 'Penumpukan Sampah', -- 'Penumpukan Sampah', 'Kerusakan RTH', 'Pencemaran Limbah / Air', 'Polusi Udara', 'Pohon Rawan Tumbang', 'Lainnya'
    judul TEXT NOT NULL,
    lokasi TEXT NOT NULL,
    kecamatan TEXT NOT NULL DEFAULT 'Surabaya',
    deskripsi TEXT NOT NULL,
    foto_url TEXT,
    koordinat TEXT,
    urgensi TEXT NOT NULL DEFAULT 'Sedang', -- 'Kritis', 'Tinggi', 'Sedang', 'Normal'
    status TEXT NOT NULL DEFAULT 'Menunggu', -- 'Menunggu', 'Diproses', 'Selesai', 'Ditolak'
    catatan_admin TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pencarian & filter laporan
CREATE INDEX IF NOT EXISTS idx_laporan_created_at ON public.laporan(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_laporan_status ON public.laporan(status);
CREATE INDEX IF NOT EXISTS idx_laporan_kategori ON public.laporan(kategori);

ALTER TABLE public.laporan ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit laporan" 
ON public.laporan 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can view and update laporan" 
ON public.laporan 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Kompatibilitas tabel alternatif: citizen_reports
CREATE TABLE IF NOT EXISTS public.citizen_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama TEXT NOT NULL,
    lokasi TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    kontak TEXT NOT NULL,
    tanggal TEXT NOT NULL,
    urgensi TEXT NOT NULL DEFAULT 'Sedang',
    status TEXT NOT NULL DEFAULT 'Menunggu',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_citizen_reports_created_at 
ON public.citizen_reports(created_at DESC);

ALTER TABLE public.citizen_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit environmental reports" 
ON public.citizen_reports 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can view and update reports" 
ON public.citizen_reports 
FOR ALL 
USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 6. DUMMY SEED DATA (Inisialisasi Data Awal)
-- ==============================================================================
INSERT INTO public.fgd_agendas (id, title, topic, date, time, location, quota, registered_count, status, speaker, description, tags)
VALUES
('fgd-mangrove-wonorejo', 'Restorasi & Mitigasi Abrasi Kawasan Pesisir Pamurbaya', 'Konservasi Mangrove & Pesisir', '28 Maret 2026', '09:00 - 12:30 WIB', 'Pusat Ekowisata Mangrove Wonorejo / Zoom', 40, 28, 'Buka', 'Dr. Ir. Hendro Prasetyo (Pakar Pesisir ITS)', 'Merumuskan zonasi suaka burung air dan strategi penanaman bibit mangrove jenis Avicennia dan Rhizophora.', ARRAY['Mangrove', 'Pesisir', 'Konservasi', 'Pamurbaya']),
('fgd-kali-surabaya', 'Audit Kualitas Air & Pengendalian Limbah Mikroplastik Kali Surabaya', 'Kualitas Air & Tata Kelola Sungai', '04 April 2026', '08:30 - 12:00 WIB', 'Aula Barat Joglo Kebonagung / Zoom', 35, 35, 'Penuh', 'Prigi Arisandi, M.Si (Aktivis Ecoton)', 'Evaluasi kandungan senyawa mikroplastik dari hulu Karangpilang sampai muara Wonokromo.', ARRAY['Sungai', 'Mikroplastik', 'Air Bersih', 'Kali Surabaya']),
('fgd-waste-management', 'Optimalisasi Sirkular Ekonomi Sampah Organik Menuju Zero Waste City', 'Pengelolaan Sampah & Daur Ulang', '11 April 2026', '09:00 - 13:00 WIB', 'Ruang Rapat Gedung Siola Lantai 3', 50, 42, 'Buka', 'Siti Aminah, M.Env (Praktisi Komposting)', 'Mendorong integrasi bank sampah unit dengan fasilitas pengolahan Refuse Derived Fuel (RDF).', ARRAY['Sampah', 'Zero Waste', 'Kompos', 'Sirkular Ekonomi'])
ON CONFLICT (id) DO NOTHING;

-- Seed Data Laporan Warga
INSERT INTO public.laporan (id, nama_pelapor, email, whatsapp, kontak, kategori, judul, lokasi, kecamatan, deskripsi, foto_url, koordinat, urgensi, status, catatan_admin)
VALUES
('LAP-2026-001', 'Bambang Sudibyo', 'bambang.sudibyo@gmail.com', '081239847112', '081239847112', 'Penumpukan Sampah', 'Penumpukan Sampah Liar & Limbah Plastik Pintu Air Wonokromo', 'Bantaran Kali Jagir, RT 04 RW 02, Jagir', 'Wonokromo', 'Penumpukan sampah rumah tangga dan limbah plastik kemasan menyumbat pintu air hilir Kali Jagir.', 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80', '-7.29944, 112.74833', 'Tinggi', 'Diproses', 'Satgas DLH Wilayah Surabaya Selatan telah dikirim untuk pembersihan pintu air bersama warga.'),
('LAP-2026-002', 'Siti Nurjanah', 'siti.nurjanah@yahoo.co.id', '085721980344', '085721980344', 'Polusi Udara', 'Pembakaran Sampah Kabel Tembaga Terbuka di Lahan Kosong', 'Jl. Kenjeran Baru No. 45, Sukolilo Baru', 'Bulak', 'Aktivitas pembakaran kabel tembaga secara terbuka pada malam hari menimbulkan asap hitam pekat beracun.', 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80', '-7.24305, 112.79611', 'Tinggi', 'Menunggu', 'Laporan diterima, menunggu koordinasi jadwal penertiban bersama Satpol PP Kec. Bulak.'),
('LAP-2026-003', 'Relawan Hijau Rungkut', 'relawan.rungkut@ecoton.id', '088127371159', '088127371159', 'Kerusakan RTH', 'Penebangan Liar Tegakan Mangrove Sabuk Hijau Pamurbaya', 'Kawasan Konservasi Mangrove Wonorejo, Gunung Anyar', 'Rungkut', 'Ditemukan indikasi perambahan dan penebangan pohon mangrove jenis Rhizophora mucronata seluas 200 m2.', 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80', '-7.30889, 112.82528', 'Kritis', 'Diproses', 'Tim investigasi gabungan DLH dan Polairud telah memasang garis batas pengawasan.'),
('LAP-2026-004', 'Ahmad Fauzi', 'ahmad.fauzi99@gmail.com', '081398765432', '081398765432', 'Pohon Rawan Tumbang', 'Dahan Pohon Trembesi Tua Lapuk Menjorok ke Badan Jalan', 'Jl. Raya Darmo (Sisi Depan Taman Bungkul)', 'Wonokromo', 'Dahan pohon trembesi tua berdiameter besar terlihat lapuk di bagian pangkal dan condong ke jalan.', 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80', '-7.29167, 112.73889', 'Tinggi', 'Selesai', 'Satgas Perantingan DKRTH Rayon Selatan telah menyelesaikan pemangkasan dahan lapuk.')
ON CONFLICT (id) DO NOTHING;

