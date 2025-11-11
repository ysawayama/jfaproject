// チーム連絡窓口の担当者情報
export interface ClubContact {
  id: string;
  clubName: string; // チーム名
  contactPerson: string; // 担当者名
  email: string; // メールアドレス
  phone: string; // 電話番号
  position?: string; // 役職（任意）
}

// モックデータ
export const clubContacts: ClubContact[] = [
  {
    id: '1',
    clubName: '鹿島アントラーズユース',
    contactPerson: '佐藤健一',
    email: 'k.sato@antlers-youth.jp',
    phone: '03-1234-5678',
    position: 'ユース育成部長',
  },
  {
    id: '2',
    clubName: '横浜F・マリノス',
    contactPerson: '田中美紀',
    email: 'm.tanaka@f-marinos.com',
    phone: '045-2345-6789',
    position: 'アカデミーディレクター',
  },
  {
    id: '3',
    clubName: '桐蔭学園高校',
    contactPerson: '鈴木誠二',
    email: 's.suzuki@toin-gakuen.ac.jp',
    phone: '042-3456-7890',
    position: 'サッカー部監督',
  },
  {
    id: '4',
    clubName: 'サンフレッチェ広島ユース',
    contactPerson: '山田太郎',
    email: 't.yamada@sanfrecce-youth.jp',
    phone: '082-4567-8901',
    position: 'ユース統括',
  },
  {
    id: '5',
    clubName: '柏レイソル',
    contactPerson: '伊藤花子',
    email: 'h.ito@reysol.co.jp',
    phone: '04-5678-9012',
    position: '強化部',
  },
  {
    id: '6',
    clubName: '浦和レッズユース',
    contactPerson: '渡辺修',
    email: 'o.watanabe@urawa-reds.co.jp',
    phone: '048-6789-0123',
    position: 'ユース育成コーチ',
  },
  {
    id: '7',
    clubName: '横浜F・マリノスユース',
    contactPerson: '小林恵美',
    email: 'e.kobayashi@marinos-youth.com',
    phone: '045-7890-1234',
    position: 'ユース事務局',
  },
  {
    id: '8',
    clubName: '川崎フロンターレU-18',
    contactPerson: '高橋大輔',
    email: 'd.takahashi@frontale.co.jp',
    phone: '044-8901-2345',
    position: 'アカデミーコーチ',
  },
  {
    id: '9',
    clubName: '大分トリニータU-18',
    contactPerson: '中村裕子',
    email: 'y.nakamura@oita-trinita.co.jp',
    phone: '097-9012-3456',
    position: 'ユース担当',
  },
  {
    id: '10',
    clubName: 'ロサンゼルスFC',
    contactPerson: 'John Martinez',
    email: 'j.martinez@lafc.com',
    phone: '+1-310-123-4567',
    position: 'Academy Director',
  },
  {
    id: '11',
    clubName: 'アルビレックス新潟U-18',
    contactPerson: '佐々木健太',
    email: 'k.sasaki@albirex.co.jp',
    phone: '025-0123-4567',
    position: 'ユースコーチ',
  },
];

// チーム名から連絡窓口を取得
export function getClubContactByName(clubName: string): ClubContact | undefined {
  return clubContacts.find((contact) => contact.clubName === clubName);
}
