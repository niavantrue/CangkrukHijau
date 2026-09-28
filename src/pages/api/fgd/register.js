import { getSupabaseAdminClient } from '../../../lib/supabaseAdmin.js';
import { createSupabaseServerClient } from '../../../lib/supabaseServer.js';

export const POST = async (context) => {
  try {
    let body;
    try {
      body = await context.request.json();
    } catch {
      return new Response(
        JSON.stringify({
          error: 'Format data pendaftaran tidak valid (Invalid JSON payload).',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const {
      agenda_id,
      agenda_title,
      full_name,
      institution,
      email,
      whatsapp,
      phone,
      motivation,
    } = body || {};

    const contactNumber = String(whatsapp || phone || '').trim();

    // 1. Validasi field wajib
    if (!agenda_id || !full_name || !email || !contactNumber) {
      return new Response(
        JSON.stringify({
          error: 'Harap lengkapi semua kolom yang wajib diisi (Agenda, Nama Lengkap, Email, dan WhatsApp/No. HP).',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return new Response(
        JSON.stringify({
          error: 'Format alamat email tidak valid.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (contactNumber.length < 8) {
      return new Response(
        JSON.stringify({
          error: 'Nomor WhatsApp / No. HP minimal 8 digit angka.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 2. Inisialisasi Supabase Client (Prioritaskan Admin Client dengan Service Role Key)
    let supabase = getSupabaseAdminClient();
    if (!supabase) {
      console.warn(
        '[FGD Registration API] SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di environment. Menggunakan client server default (dapat terhalang RLS jika policy belum disetup).'
      );
      supabase = createSupabaseServerClient(context);
    }

    // 3. Cek apakah sudah pernah mendaftar di agenda ini dengan email yang sama
    const { data: existingReg, error: checkError } = await supabase
      .from('fgd_registrations')
      .select('id')
      .eq('agenda_id', String(agenda_id).trim())
      .eq('email', cleanEmail)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.warn('[FGD Registration Check Warning]:', checkError);
    }

    if (existingReg) {
      return new Response(
        JSON.stringify({
          error: 'Email Anda sudah terdaftar untuk agenda FGD ini sebelumnya.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 4. Siapkan payload yang bersih dan aman (sertakan phone dan whatsapp agar kompatibel dengan skema tabel)
    const baseRecord = {
      agenda_id: String(agenda_id).trim(),
      agenda_title: (agenda_title || 'Agenda FGD Cangkruk Hijau').trim(),
      full_name: String(full_name).trim(),
      institution: (institution || 'Umum / Individu').trim(),
      email: cleanEmail,
      phone: contactNumber,
      whatsapp: contactNumber,
      motivation: (motivation || '-').trim(),
      created_at: new Date().toISOString(),
    };

    // 5. Eksekusi Insert ke tabel fgd_registrations
    let { data, error: insertError } = await supabase
      .from('fgd_registrations')
      .insert([baseRecord])
      .select()
      .maybeSingle();

    // Fallback cerdas: jika salah satu kolom ('whatsapp' atau 'phone') tidak ada di skema tabel
    if (insertError && insertError.message?.includes('column "whatsapp" does not exist')) {
      const { whatsapp: _unused, ...phoneOnlyRecord } = baseRecord;
      const retry = await supabase
        .from('fgd_registrations')
        .insert([phoneOnlyRecord])
        .select()
        .maybeSingle();
      data = retry.data;
      insertError = retry.error;
    } else if (insertError && insertError.message?.includes('column "phone" does not exist')) {
      const { phone: _unused, ...whatsappOnlyRecord } = baseRecord;
      const retry = await supabase
        .from('fgd_registrations')
        .insert([whatsappOnlyRecord])
        .select()
        .maybeSingle();
      data = retry.data;
      insertError = retry.error;
    }

    if (insertError) {
      console.error('[FGD Registration Insert Error]:', insertError);

      let userErrorMessage = 'Gagal menyimpan pendaftaran ke sistem.';
      if (insertError.message?.includes('violates row-level security policy')) {
        userErrorMessage =
          'Gagal menyimpan pendaftaran karena pembatasan izin database (Row Level Security). Pastikan SUPABASE_SERVICE_ROLE_KEY telah dikonfigurasi di environment server.';
      } else if (insertError.message) {
        userErrorMessage = `Gagal menyimpan pendaftaran: ${insertError.message}`;
      }

      return new Response(
        JSON.stringify({
          error: userErrorMessage,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Selamat! Pendaftaran FGD berhasil dikonfirmasi. Informasi teknis akan dikirimkan ke WhatsApp & Email Anda.',
        data: data || baseRecord,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('[FGD Registration Server Exception]:', err);
    return new Response(
      JSON.stringify({
        error: err.message || 'Terjadi kesalahan sistem internal pada server.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
