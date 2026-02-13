import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config(); 

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or KEY not found in environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
