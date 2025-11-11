-- user_profilesテーブルのINSERTポリシーを追加
-- 新規ユーザー登録時に自分のプロファイルを作成できるようにする

-- 既存のINSERTポリシーがあれば削除
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- 新しいINSERTポリシーを作成
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
