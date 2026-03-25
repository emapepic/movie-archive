import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies() // Dodaj 'await' ovde

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Pošto je ovo sinhrona funkcija unutar Supabase-a,
            // Next.js dozvoljava setovanje ako se pozove iz Server Action-a
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Ignorišemo ako se pozove iz Server Komponente gde set nije dozvoljen
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Isto kao i za set
          }
        },
      },
    }
  )
}