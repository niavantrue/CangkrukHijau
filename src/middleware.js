import { createSupabaseServerClient } from './lib/supabaseServer.js';

export async function onRequest(context, next) {
  const supabase = createSupabaseServerClient(context);
  context.locals.supabase = supabase;

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      context.locals.user = null;
    } else {
      context.locals.user = user;
    }
  } catch (err) {
    context.locals.user = null;
  }

  return next();
}
