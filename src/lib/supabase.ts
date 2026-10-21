import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";

/**
 * Browser-safe Supabase client using the anon (public) key.
 * Uses RLS policies for data access control.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Server-only Supabase client with the service_role key.
 * Bypasses RLS — use only inside Nitro API routes (never import in client bundles).
 */
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set — this function must only run server-side.");
  }
  return createClient<Database>(
    process.env.VITE_SUPABASE_URL ?? "",
    serviceRoleKey,
  );
}
