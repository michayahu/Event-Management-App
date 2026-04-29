import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hfuyujocsrkgfezknlao.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_12TE-9AWZ1nig-DeLSxT8g_tOnuDjO9';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
