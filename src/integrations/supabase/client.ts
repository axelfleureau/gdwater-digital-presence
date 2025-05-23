
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qxwqztmvgnueremvlsne.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4d3F6dG12Z251ZXJlbXZsc25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MDk3NTAsImV4cCI6MjA2MjI4NTc1MH0.PW0FGKwnwqQg3PGeyIHk2EytqvCUOKM8vlK0-6Vjh7Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
