import { createClient } from "@supabase/supabase-js";
import { environment } from "../config/env";

const supabaseUrl = environment.SUPABASE_URL || "";
const supabaseKey = environment.SUPABASE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);
