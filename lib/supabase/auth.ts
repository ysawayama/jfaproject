/**
 * Authentication Helper Functions
 * 認証関連のユーティリティ関数
 */

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * サインアップ（新規ユーザー登録）
 */
export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const displayName = formData.get('displayName') as string;
  const role = formData.get('role') as string;

  // Supabase Authでユーザー作成
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        role: role,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  // user_profilesテーブルにプロファイル作成
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        email,
        display_name: displayName,
        role,
      });

    if (profileError) {
      return { error: profileError.message };
    }
  }

  revalidatePath('/', 'layout');
  redirect('/team/short-term');
}

/**
 * ログイン
 */
export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/team/short-term');
}

/**
 * ログアウト
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/team/login');
}

/**
 * 現在のユーザー情報を取得
 */
export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // user_profilesからプロファイル情報を取得
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return {
    ...user,
    profile,
  };
}

/**
 * ユーザーが所属するチームを取得
 */
export async function getUserTeams() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: teams } = await supabase
    .from('team_members')
    .select(`
      team_id,
      role,
      teams:team_id (
        id,
        name,
        type,
        category,
        logo_url
      )
    `)
    .eq('user_id', user.id)
    .eq('is_active', true);

  return teams || [];
}
