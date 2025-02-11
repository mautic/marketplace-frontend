import { createClient } from '@supabase/supabase-js'; 

const supabaseUrl = 'https://fhtbltzboplmjkfmnsls.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodGJsdHpib3BsbWprZm1uc2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxOTAxMDIsImV4cCI6MjA1NDc2NjEwMn0.9tVRg-7d-c60OPePWTM4R3-xqEqorfCnVDX-9i1f9WM'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);