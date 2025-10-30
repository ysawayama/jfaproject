// ===========================
// Individual Development Plan (IDP) データ構造
// ===========================

// 評価項目の基本構造
export interface EvaluationItem {
  id: string;
  label: string;
  description?: string;
  order: number;
}

// 月次評価
export interface MonthlyEvaluation {
  month: number; // 4-3 (年度ベース)
  score: number; // 1-10
  coachComment?: string;
  playerComment?: string;
  evaluatedAt: string;
  evaluatedBy: string; // コーチID
}

// コメントのやり取り（対話）
export interface IDPComment {
  id: string;
  evaluationItemId: string;
  author: 'coach' | 'player';
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

// アカデミー行動規範の評価
export interface BehaviorEvaluation {
  behaviorId: string;
  month: number;
  checked: boolean;
  comment?: string;
}

// IDP評価項目のカテゴリー
export type IDPCategory = 'technical' | 'tactical' | 'physical' | 'mental';

// IDP評価項目（各カテゴリーの具体的な項目）
export interface IDPEvaluationItem {
  id: string;
  category: IDPCategory;
  label: string;
  description: string;
  monthlyEvaluations: MonthlyEvaluation[];
  comments: IDPComment[];
}

// 振り返りシート（月次の面談記録）
export interface ReflectionSheet {
  id: string;
  idpId: string;
  sessionNumber: number; // 第何回
  month: number; // 月（1-12）
  year: number; // 年

  // 選手が記入
  idpReflection: string; // IDP面談の振り返り
  schoolLifeReflection: string; // 学校生活に関して

  // コーチが記入
  coachComment: string; // 担当より

  createdAt: string;
  updatedAt: string;
  createdBy: string; // 作成者（選手orコーチ）
  lastEditedBy: string; // 最終編集者
}

// 個人分析シート（IDP）の完全な構造
export interface IndividualDevelopmentPlan {
  id: string;
  playerId: string;
  season: string; // '2023-2024'
  createdAt: string;
  updatedAt: string;

  // 個人情報（player-data.tsから取得）
  // playerId経由で参照

  // アカデミー選手としての行動規範評価
  behaviorEvaluations: BehaviorEvaluation[];

  // シーズン個人目標
  seasonGoals: string;

  // 強み・弱み
  strengths: string[];
  weaknesses: string[];

  // 評価項目（技術・戦術・フィジカル・メンタル）
  evaluationItems: IDPEvaluationItem[];

  // 振り返りシート（月次面談記録）
  reflectionSheets: ReflectionSheet[];
}

// ===========================
// マスターデータ: アカデミー行動規範
// ===========================

export interface BehaviorStandard {
  id: string;
  label: string;
  description: string;
  order: number;
}

export const behaviorStandards: BehaviorStandard[] = [
  {
    id: 'b1',
    label: 'クラブの理念に沿って、積極性があり、フェアプレーをもがける',
    description: '誠実で前向きな姿勢を示す',
    order: 1,
  },
  {
    id: 'b2',
    label: '向上心がある仲間とチームワークを築き、全体をまとめて励ます',
    description: 'リーダーシップとチームワーク',
    order: 2,
  },
  {
    id: 'b3',
    label: 'お互いを尊重し合い、高め合う仲間関係を築きあげる',
    description: '相互尊重と協調性',
    order: 3,
  },
  {
    id: 'b4',
    label: 'サッカーを通学習を深め、理論的な会話が実践に活用できる',
    description: '理論的思考と実践への応用',
    order: 4,
  },
];

// ===========================
// マスターデータ: 評価項目定義
// ===========================

export const evaluationItemMaster: Record<
  IDPCategory,
  { label: string; items: EvaluationItem[] }
> = {
  technical: {
    label: '技術 (Technical)',
    items: [
      {
        id: 'tech1',
        label: 'ボールコントロール (ボールを持つ・だせる)',
        description: 'トラップ、ドリブル、フェイントなどの基本技術',
        order: 1,
      },
      {
        id: 'tech2',
        label: '正確なパス (味方の足元、スペースへの配給)',
        description: 'ショート・ロングパスの精度',
        order: 2,
      },
      {
        id: 'tech3',
        label: 'キックの精度',
        description: 'シュート、パス、クリアなどのキック技術',
        order: 3,
      },
      {
        id: 'tech4',
        label: '相手との間合い (はだきと要求点と応えす)',
        description: '1対1での間合いの取り方',
        order: 4,
      },
    ],
  },
  tactical: {
    label: '戦術 (Tactical)',
    items: [
      {
        id: 'tact1',
        label: 'ポジショニング (状況に応じた適切な位置)',
        description: '攻守におけるポジショニング',
        order: 1,
      },
      {
        id: 'tact2',
        label: 'サポートの動き',
        description: '味方をサポートするための動き',
        order: 2,
      },
      {
        id: 'tact3',
        label: '攻守の切り替え',
        description: '攻撃から守備、守備から攻撃への素早い切り替え',
        order: 3,
      },
      {
        id: 'tact4',
        label: 'チーム戦術の理解',
        description: 'チームの戦術を理解し実行できる',
        order: 4,
      },
    ],
  },
  physical: {
    label: 'フィジカル (Physical)',
    items: [
      {
        id: 'phys1',
        label: 'スピード・アジリティ',
        description: '走力と敏捷性',
        order: 1,
      },
      {
        id: 'phys2',
        label: 'スタミナ・持久力',
        description: '90分間動き続けられる体力',
        order: 2,
      },
      {
        id: 'phys3',
        label: 'パワー・当たり負けしない',
        description: 'フィジカルコンタクトでの強さ',
        order: 3,
      },
      {
        id: 'phys4',
        label: '柔軟性・バランス',
        description: '体の柔軟性とバランス感覚',
        order: 4,
      },
    ],
  },
  mental: {
    label: 'メンタル (Mental)',
    items: [
      {
        id: 'ment1',
        label: '集中力・モチベーション',
        description: '練習や試合での集中力維持',
        order: 1,
      },
      {
        id: 'ment2',
        label: '勝負強さ・プレッシャーへの対応',
        description: '重要な場面でのメンタルの強さ',
        order: 2,
      },
      {
        id: 'ment3',
        label: 'コミュニケーション',
        description: 'チームメイトやコーチとのコミュニケーション',
        order: 3,
      },
      {
        id: 'ment4',
        label: 'リーダーシップ',
        description: 'チームを引っ張る力',
        order: 4,
      },
    ],
  },
};

// ===========================
// モックデータ
// ===========================

export const mockIDPData: IndividualDevelopmentPlan[] = [
  {
    id: 'idp1',
    playerId: 'p2', // 佐藤 翔太（CB, 6年生）
    season: '2023-2024',
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',

    behaviorEvaluations: [
      { behaviorId: 'b1', month: 4, checked: true },
      { behaviorId: 'b2', month: 4, checked: true },
      { behaviorId: 'b3', month: 4, checked: false },
      { behaviorId: 'b4', month: 4, checked: true },
      { behaviorId: 'b1', month: 5, checked: true },
      { behaviorId: 'b2', month: 5, checked: true },
      { behaviorId: 'b3', month: 5, checked: true },
      { behaviorId: 'b4', month: 5, checked: false },
    ],

    seasonGoals: `【シーズン目標 2023-2024】
・ディフェンスリーダーとして、チーム全体を統率する
・U-12県選抜に選出される
・空中戦での競り合いで勝率80%以上を目指す
・ビルドアップでのパス成功率を向上させる`,

    strengths: [
      '対人ディフェンスの強さ',
      '声出しによるチームの統率',
      'セットプレーでの得点力',
      '責任感と集中力の高さ',
    ],

    weaknesses: [
      'ビルドアップ時の判断の迷い',
      '体の疲労の蓄積',
      'ボールを持ちすぎる傾向',
      '長距離からの正確性の低下',
    ],

    evaluationItems: [
      // 技術評価
      {
        id: 'eval1',
        category: 'technical',
        label: 'ボールコントロール (ボールを持つ・だせる)',
        description: 'トラップ、ドリブル、フェイントなどの基本技術',
        monthlyEvaluations: [
          {
            month: 4,
            score: 7,
            coachComment:
              'トラップの精度が向上しています。次はプレッシャー下でも同じクオリティを維持できるよう練習しましょう。',
            playerComment:
              'ありがとうございます。プレッシャーを感じると慌ててしまうことがあるので、意識します。',
            evaluatedAt: '2023-04-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 5,
            score: 7,
            coachComment:
              'プレッシャー下でも落ち着いてプレーできるようになってきました。',
            evaluatedAt: '2023-05-31T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 6,
            score: 8,
            coachComment:
              '大きく成長しています。この調子で頑張りましょう！',
            playerComment: 'はい！次の試合でも活かせるように頑張ります。',
            evaluatedAt: '2023-06-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
        ],
        comments: [
          {
            id: 'comment1',
            evaluationItemId: 'eval1',
            author: 'coach',
            authorId: 'coach1',
            authorName: '田中コーチ',
            content:
              'トラップの基本姿勢が良くなっています。次の段階として、ファーストタッチで相手をかわす技術を身につけましょう。',
            createdAt: '2023-05-15T10:00:00Z',
          },
          {
            id: 'comment2',
            evaluationItemId: 'eval1',
            author: 'player',
            authorId: 'p2',
            authorName: '佐藤 翔太',
            content:
              'ファーストタッチの練習、自主練でも取り組んでいます！コツがあれば教えてください。',
            createdAt: '2023-05-16T18:30:00Z',
          },
          {
            id: 'comment3',
            evaluationItemId: 'eval1',
            author: 'coach',
            authorId: 'coach1',
            authorName: '田中コーチ',
            content:
              '良い姿勢です！コツは、ボールが来る前に周りを見て、次のプレーをイメージすることです。動画を見せながら詳しく説明しますね。',
            createdAt: '2023-05-17T09:00:00Z',
          },
        ],
      },
      {
        id: 'eval2',
        category: 'technical',
        label: '正確なパス (味方の足元、スペースへの配給)',
        description: 'ショート・ロングパスの精度',
        monthlyEvaluations: [
          {
            month: 4,
            score: 6,
            coachComment:
              'ショートパスは良いですが、ロングパスの精度を上げる必要があります。',
            evaluatedAt: '2023-04-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 5,
            score: 7,
            coachComment: 'ロングパスの練習の成果が出てきています。',
            playerComment: '毎日練習しています！もっと上手くなりたいです。',
            evaluatedAt: '2023-05-31T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 6,
            score: 7,
            coachComment: 'この調子で継続していきましょう。',
            evaluatedAt: '2023-06-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
        ],
        comments: [],
      },
      // 戦術評価
      {
        id: 'eval3',
        category: 'tactical',
        label: 'ポジショニング (状況に応じた適切な位置)',
        description: '攻守におけるポジショニング',
        monthlyEvaluations: [
          {
            month: 4,
            score: 8,
            coachComment:
              'DFとしてのポジショニングは優秀です。相手の動きを予測できています。',
            evaluatedAt: '2023-04-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 5,
            score: 8,
            coachComment: '引き続き素晴らしいポジショニングです。',
            evaluatedAt: '2023-05-31T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 6,
            score: 9,
            coachComment:
              '完璧です。チームの守備の要として頼りにしています。',
            playerComment: 'ありがとうございます！もっと頑張ります！',
            evaluatedAt: '2023-06-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
        ],
        comments: [
          {
            id: 'comment4',
            evaluationItemId: 'eval3',
            author: 'coach',
            authorId: 'coach1',
            authorName: '田中コーチ',
            content:
              'あなたのポジショニングは、チームの中で最も安定しています。後輩にも教えてあげてください。',
            createdAt: '2023-06-15T14:00:00Z',
          },
          {
            id: 'comment5',
            evaluationItemId: 'eval3',
            author: 'player',
            authorId: 'p2',
            authorName: '佐藤 翔太',
            content:
              'はい！5年生の後輩にも積極的に声をかけています。',
            createdAt: '2023-06-15T20:00:00Z',
          },
        ],
      },
      // フィジカル評価
      {
        id: 'eval4',
        category: 'physical',
        label: 'スピード・アジリティ',
        description: '走力と敏捷性',
        monthlyEvaluations: [
          {
            month: 4,
            score: 6,
            coachComment:
              'もう少しスピードが欲しいです。走り込みを増やしましょう。',
            evaluatedAt: '2023-04-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 5,
            score: 6,
            coachComment: '変化はまだ小さいですが、継続が大事です。',
            evaluatedAt: '2023-05-31T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 6,
            score: 7,
            coachComment: '少しずつ速くなってきました。継続しましょう。',
            playerComment: '朝練でダッシュを頑張っています！',
            evaluatedAt: '2023-06-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
        ],
        comments: [],
      },
      // メンタル評価
      {
        id: 'eval5',
        category: 'mental',
        label: '集中力・モチベーション',
        description: '練習や試合での集中力維持',
        monthlyEvaluations: [
          {
            month: 4,
            score: 9,
            coachComment:
              '常に高いモチベーションで練習に取り組んでいます。素晴らしい！',
            evaluatedAt: '2023-04-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 5,
            score: 9,
            coachComment: 'チームの模範となる姿勢です。',
            playerComment: 'ありがとうございます！',
            evaluatedAt: '2023-05-31T15:00:00Z',
            evaluatedBy: 'coach1',
          },
          {
            month: 6,
            score: 10,
            coachComment:
              '完璧です。この姿勢を最後まで維持してください。',
            playerComment: '最後まで全力で頑張ります！',
            evaluatedAt: '2023-06-30T15:00:00Z',
            evaluatedBy: 'coach1',
          },
        ],
        comments: [],
      },
    ],

    // 振り返りシート
    reflectionSheets: [
      {
        id: 'ref1',
        idpId: 'idp1',
        sessionNumber: 1,
        month: 4,
        year: 2023,
        idpReflection: `今月は細かいポジショニング取りがより意識できました。練習でもコーチから教わったパス技術を繰り返し練習しました。DFとしてチームを引っ張れるように頑張っています。まだプレッシャーを感じると慌ててしまうことがあるので、次の月は冷静さを持って試合に臨みたいです。`,
        schoolLifeReflection: `学校では委員会活動を頑張っています。クラスでも友達と協力して学級目標に向かって取り組んでいます。最近は算数が少し難しくなってきましたが、先生や友達に教えてもらいながら理解を深めています。`,
        coachComment: `IDP面談をした際に、積極性が見られてとても良かったです。技術的には着実に向上しています。プレッシャー下での判断力向上のため、次回の練習では2対1の状況を多く作りましょう。学校生活でも責任ある行動ができており、素晴らしいです。`,
        createdAt: '2023-04-30T16:00:00Z',
        updatedAt: '2023-05-02T10:00:00Z',
        createdBy: 'p2',
        lastEditedBy: 'coach1',
      },
      {
        id: 'ref2',
        idpId: 'idp1',
        sessionNumber: 2,
        month: 5,
        year: 2023,
        idpReflection: `ポジショニングは今月も意識できました。先月の反省を活かして、プレッシャーがかかる場面でも冷静にプレーできるようになってきました。コーチに教わった2対1の練習が試合でも活かせています。パスの精度も上がってきた気がします。`,
        schoolLifeReflection: `運動会の練習が始まりました。リレーの選手に選ばれたので、放課後も練習を頑張っています。算数のテストで良い点が取れて嬉しかったです。友達との関係も良好で、休み時間にサッカーをして楽しんでいます。`,
        coachComment: `先月と比べて大きく成長しています。特にプレッシャー下での冷静さが目に見えて向上しました。この調子で継続していきましょう。運動会での活躍も期待しています。学業とサッカーの両立、素晴らしいですね。`,
        createdAt: '2023-05-31T16:00:00Z',
        updatedAt: '2023-06-01T14:30:00Z',
        createdBy: 'p2',
        lastEditedBy: 'coach1',
      },
      {
        id: 'ref3',
        idpId: 'idp1',
        sessionNumber: 3,
        month: 6,
        year: 2023,
        idpReflection: `今月は試合でキャプテンを任されました。責任感を持ってチームを引っ張ることができたと思います。ビルドアップでのパスも成功率が上がってきました。空中戦での競り合いでも勝てる場面が増えました。次の目標は県選抜に選ばれることなので、さらに技術を磨いていきたいです。`,
        schoolLifeReflection: `運動会で優勝できました！リレーでも頑張りました。学校の勉強も頑張っていて、特に理科の実験が楽しいです。クラスのまとめ役として、みんなをサポートできるように心がけています。`,
        coachComment: `キャプテンとしての責任を果たし、チームを勝利に導いてくれました。技術面、メンタル面ともに大きく成長しています。県選抜に向けて、今の調子を維持していきましょう。学校生活でもリーダーシップを発揮しており、人間的にも成長していますね。今後も期待しています！`,
        createdAt: '2023-06-30T16:00:00Z',
        updatedAt: '2023-07-03T09:15:00Z',
        createdBy: 'p2',
        lastEditedBy: 'coach1',
      },
    ],
  },
];

// ===========================
// ヘルパー関数
// ===========================

export function getIDPByPlayerId(playerId: string): IndividualDevelopmentPlan | undefined {
  return mockIDPData.find((idp) => idp.playerId === playerId);
}

export function getIDPBySeason(
  playerId: string,
  season: string
): IndividualDevelopmentPlan | undefined {
  return mockIDPData.find(
    (idp) => idp.playerId === playerId && idp.season === season
  );
}

export function getEvaluationItemsByCategory(
  idp: IndividualDevelopmentPlan,
  category: IDPCategory
): IDPEvaluationItem[] {
  return idp.evaluationItems.filter((item) => item.category === category);
}

export function getLatestMonthlyEvaluation(
  item: IDPEvaluationItem
): MonthlyEvaluation | undefined {
  if (item.monthlyEvaluations.length === 0) return undefined;
  return item.monthlyEvaluations[item.monthlyEvaluations.length - 1];
}

export function getAverageScoreByCategory(
  idp: IndividualDevelopmentPlan,
  category: IDPCategory
): number {
  const items = getEvaluationItemsByCategory(idp, category);
  if (items.length === 0) return 0;

  const totalScore = items.reduce((sum, item) => {
    const latestEval = getLatestMonthlyEvaluation(item);
    return sum + (latestEval?.score || 0);
  }, 0);

  return Math.round((totalScore / items.length) * 10) / 10;
}

// ===========================
// 振り返りシート用ヘルパー関数
// ===========================

export function getReflectionSheetsByIDPId(idpId: string): ReflectionSheet[] {
  const idp = mockIDPData.find((item) => item.id === idpId);
  if (!idp) return [];

  return idp.reflectionSheets.sort((a, b) => {
    // 年でソート、年が同じなら月でソート
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });
}

export function getReflectionSheetById(
  reflectionSheetId: string
): ReflectionSheet | undefined {
  for (const idp of mockIDPData) {
    const sheet = idp.reflectionSheets.find((rs) => rs.id === reflectionSheetId);
    if (sheet) return sheet;
  }
  return undefined;
}

export function getLatestReflectionSheet(idpId: string): ReflectionSheet | undefined {
  const sheets = getReflectionSheetsByIDPId(idpId);
  return sheets[sheets.length - 1];
}
