import { createClient } from '@supabase/supabase-js'; 

const supabaseUrl = ''; // Replace with your Supabase URL
const supabaseKey = ''; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);