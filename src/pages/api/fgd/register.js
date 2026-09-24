import { createSupabaseServerClient } from '../../../lib/supabaseServer.js';

export const POST = async (context) => {
  try {
    const body = await context.request.json();
    const {
      agenda_id,
      agenda_title,
      full_name,
      institution,
      email,
      whatsapp,
      motivation,
    } = body;

    // Validasi field wajib
    if (!agenda_id || !full_name || !email || !whatsapp) {
      return new Response(
        JSON.stringify({
          error: 'Harap lengkapi semua kolom yang wajib diisi (Agenda, Nama Lengkap, Email, dan WhatsApp).',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    const supabase = createSupabaseServerClient(context);

    // Cek apakah sudah pernah mendaftar di agenda ini dengan email yang sama
    const { data: existingReg, error: checkError } = await supabase
      .from('fgd_registrations')
      .select('id')
      .eq('agenda_id', agenda_id)
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();

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

    // Insert ke tabel fgd_registrations
    const newRecord = {
      agenda_id,
      agenda_title: agenda_title || 'Agenda FGD Cangkruk Hijau',
      full_name: full_name.trim(),
      institution: (institution || 'Umum / Individu').trim(),
      email: email.toLowerCase().trim(),
      whatsapp: whatsapp.trim(),
      motivation: (motivation || '-').trim(),
      created_at: new Date().toISOString(),
    };

    const { data, error: insertError } = await supabase
      .from('fgd_registrations')
      .insert([newRecord])
      .select()
      .maybeSingle();

    if (insertError) {
      console.error('Supabase Insert Error:', insertError);
      // Jika tabel belum disetup atau error permission di Supabase, tetap berikan pesan informatif
      return new Response(
        JSON.stringify({
          error: `Gagal menyimpan pendaftaran: ${insertError.message}`,
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
        message: 'Selamat! Pendaftaran FGD berhasil dikonfirmasi. Informasi teknis akan dikirimkan ke WhatsApp & Email Anda.',
        data: data || newRecord,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('FGD Registration Server Error:', err);
    return new Response(
      JSON.stringify({
        error: err.message || 'Terjadi kesalahan sistem pada server.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
