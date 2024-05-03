import {createClient} from "@supabase/supabase-js";
import {Database} from "../supabase.ts"

export const supabaseClient = createClient<Database>(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_PROJECT_KEY)