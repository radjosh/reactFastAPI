import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL; // this is in .env
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY; // this is in .env

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
