import { updateReportStatusWithAdmin, isUserAdmin } from '../../../../lib/reportsService.js';

export const POST = async (context) => {
  try {
    const user = context.locals.user;

    // 1. Keamanan & Proteksi Akses
    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Autentikasi diperlukan. Silakan login sebagai administrator.',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!isUserAdmin(user)) {
      return new Response(
        JSON.stringify({
          error: 'Akses ditolak. Tindakan ini hanya dapat dilakukan oleh akun dengan hak akses administrator.',
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 2. Parse payload request
    let body;
    try {
      body = await context.request.json();
    } catch {
      return new Response(
        JSON.stringify({
          error: 'Format data payload tidak valid (Invalid JSON).',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { id, status, catatan_admin } = body || {};

    if (!id || !status) {
      return new Response(
        JSON.stringify({
          error: 'ID laporan dan status baru wajib disertakan.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 3. Simpan perubahan ke Supabase menggunakan Admin Client
    const result = await updateReportStatusWithAdmin(id, status, catatan_admin);

    return new Response(
      JSON.stringify({
        success: true,
        message: result.message || `Status laporan berhasil diperbarui menjadi ${status}.`,
        data: result.data || result.updatedRecord,
        table: result.table || 'simulation',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('[API Report Update Status Error]:', err);
    return new Response(
      JSON.stringify({
        error: err.message || 'Terjadi kesalahan internal server saat memperbarui status laporan.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
