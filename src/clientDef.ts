import {createClient} from "@supabase/supabase-js";

export const supabaseClient = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_PROJECT_KEY)