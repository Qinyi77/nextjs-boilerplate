// lib/supabaseBrowser.ts
import { createClient } from '@supabase/supabase-js';

const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export { supabaseBrowser }; // named export (你現在的 import 用到)
export default supabaseBrowser;
