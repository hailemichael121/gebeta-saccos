import { createBrowserClient } from "@supabase/ssr"

const fallbackSupabaseUrl = "https://example.supabase.co"
const fallbackSupabaseAnonKey = "public-anon-key"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? fallbackSupabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? fallbackSupabaseAnonKey,
  )
}
