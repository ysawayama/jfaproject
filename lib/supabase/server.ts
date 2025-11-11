/**
 * Supabase Server Client
 * サーバーサイド（Server Components, Server Actions, Route Handlers）で使用するSupabaseクライアント
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Componentからのset呼び出しは無視
            // Middlewareで処理される
          }
        },
      },
    }
  );
}

/**
 * 管理者権限でのSupabaseクライアント（Service Role Key使用）
 * Row Level Securityをバイパスする必要がある場合のみ使用
 */
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // Admin clientではcookie操作不要
        },
      },
    }
  );
}
