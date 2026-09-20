import { createSupabaseServerClient } from '../../../lib/supabaseServer.js';

export const POST = async (context) => {
  const supabase = createSupabaseServerClient(context);
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'Unauthorized. Harap login terlebih dahulu.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await context.request.json();
    const { community_id, id } = body;

    let query = supabase.from('user_communities').delete().eq('user_id', user.id);

    if (id) {
      query = query.eq('id', id);
    } else if (community_id) {
      query = query.eq('community_id', community_id);
    } else {
      return new Response(JSON.stringify({ error: 'ID komunitas harus disertakan.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { error: deleteError } = await query;

    if (deleteError) {
      return new Response(JSON.stringify({ error: deleteError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Berhasil keluar dari komunitas.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Terjadi kesalahan server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
