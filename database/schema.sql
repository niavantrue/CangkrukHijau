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
-- 5. TABEL: citizen_reports (Laporan Pengaduan Kerusakan Lingkungan Warga)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.citizen_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama TEXT NOT NULL,
    lokasi TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    kontak TEXT NOT NULL,
    tanggal TEXT NOT NULL,
    urgensi TEXT NOT NULL DEFAULT 'Sedang', -- 'Kritis', 'Tinggi', 'Sedang', 'Normal'
    status TEXT NOT NULL DEFAULT 'Tercatat', -- 'Dalam Investigasi', 'Ditindaklanjuti', 'Selesai / Terverifikasi'
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
