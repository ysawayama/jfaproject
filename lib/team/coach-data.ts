// コーチ情報のデータ

export interface Coach {
  id: string;
  name: string;
  nameKana: string;
  role: string; // 監督、コーチ、アシスタントコーチなど
  profileImage?: string;
  yearsOfExperience: number; // 指導経験年数
  introduction: string; // 自己紹介
  licenses: CoachLicense[]; // ライセンス・資格
  coachingHistory: CoachingHistory[]; // 指導履歴
  specialties: string[]; // 専門分野
  philosophy: string; // 指導方針
  email?: string;
  phone?: string;
}

export interface CoachLicense {
  id: string;
  name: string;
  organization: string; // 発行機関
  year: number; // 取得年
  level?: string; // レベル（S級、A級など）
}

export interface CoachingHistory {
  id: string;
  team: string;
  role: string;
  period: string; // 期間
  achievements?: string; // 実績
}

// デモコーチ：田中太郎
export const tanakaTaroCoach: Coach = {
  id: 'coach-tanaka-taro',
  name: '田中 太郎',
  nameKana: 'たなか たろう',
  role: '監督 / ヘッドコーチ',
  profileImage: '/images/coaches/tanaka-placeholder.jpg',
  yearsOfExperience: 15,
  introduction: `緑ヶ丘FCジュニアで監督を務めております田中太郎です。サッカーを通じて子どもたちの人間的成長を第一に考え、技術だけでなく、仲間を思いやる心、諦めない精神、そして何より「サッカーを楽しむ心」を大切に指導しています。

一人ひとりの個性を尊重し、それぞれの成長速度に合わせた指導を心がけています。試合の勝敗だけでなく、日々の練習での小さな成長を見逃さず、選手たちに自信を持たせることを大切にしています。

私自身も現役時代から学び続けてきましたが、今も常に新しい指導法や戦術を研究し、子どもたちにより良い環境を提供できるよう努力しています。保護者の皆様とも密にコミュニケーションを取りながら、チーム全体で子どもたちの成長を支えていきたいと考えています。`,
  licenses: [
    {
      id: 'lic1',
      name: 'JFA公認B級コーチ',
      organization: '日本サッカー協会（JFA）',
      year: 2015,
      level: 'B級',
    },
    {
      id: 'lic2',
      name: 'JFA公認キッズリーダー',
      organization: '日本サッカー協会（JFA）',
      year: 2010,
    },
    {
      id: 'lic3',
      name: '4級審判員',
      organization: '日本サッカー協会（JFA）',
      year: 2009,
    },
    {
      id: 'lic4',
      name: '普通救命講習修了',
      organization: '消防署',
      year: 2020,
    },
  ],
  coachingHistory: [
    {
      id: 'history1',
      team: '緑ヶ丘FCジュニア',
      role: '監督',
      period: '2018年 - 現在',
      achievements: '市リーグ優勝1回、準優勝2回。県大会ベスト8進出。',
    },
    {
      id: 'history2',
      team: '緑ヶ丘FCジュニア',
      role: 'アシスタントコーチ',
      period: '2015年 - 2018年',
      achievements: '市リーグ3位。選手育成に注力。',
    },
    {
      id: 'history3',
      team: '青葉SC U-15',
      role: 'コーチ',
      period: '2012年 - 2015年',
      achievements: '県リーグ昇格。複数選手がクラブユースに進出。',
    },
    {
      id: 'history4',
      team: '市立中央中学校サッカー部',
      role: '外部指導員',
      period: '2009年 - 2012年',
      achievements: '市大会ベスト4。基礎技術の徹底指導。',
    },
  ],
  specialties: [
    '攻撃的MF・FWの育成',
    'パスサッカーの構築',
    '個人技術指導（ドリブル・シュート）',
    'メンタルコーチング',
    'IDP（個人開発計画）の作成と管理',
    'ユース年代の進路指導',
  ],
  philosophy: `【指導方針】

1. **サッカーを楽しむ心を育てる**
   サッカーの本質は「楽しさ」です。勝利を目指すことは大切ですが、その過程で選手たちがサッカーを心から楽しめる環境を作ります。

2. **個性を伸ばす指導**
   一人ひとりが持つ個性や強みを見極め、それを最大限に伸ばす指導を心がけています。画一的な指導ではなく、個々の成長に合わせたアプローチを大切にします。

3. **失敗を恐れないチャレンジ精神**
   ミスを恐れずに挑戦できる雰囲気づくりを重視しています。失敗は成長のチャンス。試合でも練習でも、積極的にチャレンジする姿勢を評価します。

4. **仲間を思いやる心**
   サッカーはチームスポーツです。仲間への声かけ、励まし、感謝の気持ちを大切にし、チーム全体で成長していく文化を育てます。

5. **保護者との連携**
   子どもたちの成長には、家庭とチームの連携が不可欠です。保護者の皆様とのコミュニケーションを大切にし、一緒に子どもたちを支えていきます。

6. **長期的な成長を見据えた育成**
   目先の勝利だけでなく、中学、高校、その先まで見据えた育成を心がけています。今何が必要かを常に考えながら指導しています。`,
  email: 'tanaka.taro@midorigaoka-fc.example.jp',
  phone: '090-XXXX-XXXX',
};

// 他のコーチも追加可能
export const allCoaches = [tanakaTaroCoach];
