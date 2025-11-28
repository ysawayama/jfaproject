/**
 * Supabase Middleware Configuration
 * Next.js middlewareでSupabase認証を処理
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// デモモード判定（PoC用 - 認証をスキップ）
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // デモモードの場合は認証チェックをスキップ
  if (isDemoMode) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // セッション更新（重要: getUser()を呼び出してセッションをリフレッシュ）
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 認証が必要なルートの保護（必要に応じてカスタマイズ）
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/team') &&
    !request.nextUrl.pathname.startsWith('/team/login') &&
    !request.nextUrl.pathname.startsWith('/team/signup')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/team/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
