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
    const { community_id, community_name } = body;

    if (!community_id || !community_name) {
      return new Response(JSON.stringify({ error: 'Data komunitas tidak lengkap.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if already joined
    const { data: existing, error: checkError } = await supabase
      .from('user_communities')
      .select('id')
      .eq('user_id', user.id)
      .eq('community_id', community_id)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ message: 'Sudah bergabung sebelumnya.', data: existing }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert new record
    const { data, error: insertError } = await supabase
      .from('user_communities')
      .insert([
        {
          user_id: user.id,
          community_id,
          community_name,
          joined_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
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
