import { createClient } from '@supabase/supabase-js';

/**
 * Returns a Supabase client initialized with the service role key.
 * This client bypasses Row Level Security (RLS) policies and should ONLY be used in server-side endpoints.
 */
export const getSupabaseAdminClient = () => {
  const supabaseUrl =
    import.meta.env.PUBLIC_SUPABASE_URL ||
    process.env.PUBLIC_SUPABASE_URL ||
    import.meta.env.SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';

  const serviceRoleKey =
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '';

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
