import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const FALLBACK_URL = "https://tosbwlnpoufnfckkbgqp.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvc2J3bG5wb3VmbmZja2tiZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0OTI2OTMsImV4cCI6MjEwODA2ODY5M30.SjX9R83FaRrFaKMmjqMGHYTGZU5NRoOvsMmS7nO7NsY";
const FALLBACK_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvc2J3bG5wb3VmbmZja2tiZ3FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjQ5MjY5MywiZXhwIjoyMTA4MDY4NjkzfQ.mqA5NCelz51ZAV9Cyd_a37R0b696D5_76fQTBP3h7Kw";

const supabaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) ||
  FALLBACK_URL;

const supabaseAnonKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY) ||
  FALLBACK_ANON_KEY;

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
  const serviceRoleKey =
    (typeof process !== "undefined" && process.env?.SUPABASE_SERVICE_ROLE_KEY) ||
    FALLBACK_SERVICE_ROLE_KEY;

  const url =
    (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) ||
    supabaseUrl;

  return createClient<Database>(url, serviceRoleKey);
}

