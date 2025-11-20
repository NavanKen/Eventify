import { createClient } from "@supabase/supabase-js";
import { environment } from "../config/env";

const supabaseUrl = environment.SUPABASE_URL || "";
const supabaseKey = environment.SUPABASE_SERVICE_ROLE || "";

export const supabaseServiceRole = createClient(supabaseUrl, supabaseKey);
