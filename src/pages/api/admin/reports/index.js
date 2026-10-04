import { fetchReportsWithAdmin, isUserAdmin } from '../../../../lib/reportsService.js';

export const GET = async (context) => {
  try {
    const user = context.locals.user;

    // Keamanan & Proteksi Akses
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
          error: 'Akses ditolak. Hanya administrator yang dapat melihat daftar laporan ini.',
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { reports, source } = await fetchReportsWithAdmin();

    return new Response(
      JSON.stringify({
        success: true,
        source,
        total: reports.length,
        data: reports,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('[API Admin Reports Index Error]:', err);
    return new Response(
      JSON.stringify({
        error: err.message || 'Gagal memuat data laporan dari server.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
