import { createSupabaseServerClient } from '../../../lib/supabaseServer.js';

export const POST = async (context) => {
  const supabase = createSupabaseServerClient(context);
  await supabase.auth.signOut();

  // If requested via fetch (Accept: application/json), return json
  const accept = context.request.headers.get('accept') || '';
  if (accept.includes('application/json')) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return context.redirect('/', 303);
};

export const GET = async (context) => {
  const supabase = createSupabaseServerClient(context);
  await supabase.auth.signOut();
  return context.redirect('/', 303);
};
