'use client';

import { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  User,
  Palette,
  Save,
  Info,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Globe,
  Clock,
} from 'lucide-react';

type SettingsTab = 'team' | 'notifications' | 'privacy' | 'account' | 'display';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('team');

  // チーム情報設定
  const [teamSettings, setTeamSettings] = useState({
    teamName: '緑ヶ丘FC ジュニア',
    category: 'U-12（小学生）',
    coachName: '田中 太郎',
    assistantCoaches: '佐藤 健一、山田 美咲',
    homeGround: '緑ヶ丘小学校グラウンド',
    establishedYear: '2015',
    contactEmail: 'midorigaoka.fc@example.com',
    contactPhone: '090-1234-5678',
  });

  // 通知設定
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newMessages: true,
    scheduleUpdates: true,
    attendanceReminders: true,
    growthRecords: true,
    albumUpdates: true,
    emergencyAlerts: true,
  });

  // プライバシー設定
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'team' as 'public' | 'team' | 'private',
    showEmail: false,
    showPhone: false,
    allowPhotoTagging: true,
    allowPhotoDownload: true,
    shareDataWithCoaches: true,
  });

  // 表示設定
  const [displaySettings, setDisplaySettings] = useState({
    language: 'ja',
    timezone: 'Asia/Tokyo',
    dateFormat: 'YYYY/MM/DD',
    theme: 'light' as 'light' | 'dark' | 'auto',
  });

  const handleSave = () => {
    alert('設定を保存しました！');
  };

  const tabs = [
    { id: 'team', label: 'チーム情報', icon: Info },
    { id: 'notifications', label: '通知設定', icon: Bell },
    { id: 'privacy', label: 'プライバシー', icon: Shield },
    { id: 'account', label: 'アカウント', icon: User },
    { id: 'display', label: '表示設定', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-3xl font-bold text-base-dark mb-2">設定</h1>
        <p className="text-neutral-600">
          チームとアカウントの設定を管理します
        </p>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        {/* チーム情報タブ */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-base-dark mb-4">
                チーム基本情報
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                チームの基本情報を設定します。この情報は保護者全員に表示されます。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  チーム名
                </label>
                <input
                  type="text"
                  value={teamSettings.teamName}
                  onChange={(e) =>
                    setTeamSettings({ ...teamSettings, teamName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  カテゴリ
                </label>
                <select
                  value={teamSettings.category}
                  onChange={(e) =>
                    setTeamSettings({ ...teamSettings, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <option value="U-6（幼児）">U-6（幼児）</option>
                  <option value="U-8（1-2年生）">U-8（1-2年生）</option>
                  <option value="U-10（3-4年生）">U-10（3-4年生）</option>
                  <option value="U-12（小学生）">U-12（小学生）</option>
                  <option value="U-15（中学生）">U-15（中学生）</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  監督・コーチ名
                </label>
                <input
                  type="text"
                  value={teamSettings.coachName}
                  onChange={(e) =>
                    setTeamSettings({ ...teamSettings, coachName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  アシスタントコーチ
                </label>
                <input
                  type="text"
                  value={teamSettings.assistantCoaches}
                  onChange={(e) =>
                    setTeamSettings({
                      ...teamSettings,
                      assistantCoaches: e.target.value,
                    })
                  }
                  placeholder="カンマ区切りで入力"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  ホームグラウンド
                </label>
                <input
                  type="text"
                  value={teamSettings.homeGround}
                  onChange={(e) =>
                    setTeamSettings({
                      ...teamSettings,
                      homeGround: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  設立年
                </label>
                <input
                  type="text"
                  value={teamSettings.establishedYear}
                  onChange={(e) =>
                    setTeamSettings({
                      ...teamSettings,
                      establishedYear: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  連絡先メールアドレス
                </label>
                <input
                  type="email"
                  value={teamSettings.contactEmail}
                  onChange={(e) =>
                    setTeamSettings({
                      ...teamSettings,
                      contactEmail: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  連絡先電話番号
                </label>
                <input
                  type="tel"
                  value={teamSettings.contactPhone}
                  onChange={(e) =>
                    setTeamSettings({
                      ...teamSettings,
                      contactPhone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* 通知設定タブ */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-base-dark mb-4">
                通知設定
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                受け取りたい通知の種類を設定します。
              </p>
            </div>

            {/* 全体設定 */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-neutral-800 mb-3">
                通知方法
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-neutral-800">
                        メール通知
                      </p>
                      <p className="text-sm text-neutral-600">
                        登録メールアドレスに通知を送信
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500/50"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-neutral-800">
                        プッシュ通知
                      </p>
                      <p className="text-sm text-neutral-600">
                        スマートフォンアプリに通知を送信
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500/50"
                  />
                </label>
              </div>
            </div>

            {/* 通知タイプ */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3">
                通知タイプ
              </h3>
              <div className="space-y-2">
                {[
                  {
                    key: 'newMessages',
                    label: '新着メッセージ',
                    description: '連絡帳に新しいメッセージが届いたとき',
                  },
                  {
                    key: 'scheduleUpdates',
                    label: 'スケジュール更新',
                    description: '練習や試合のスケジュールが追加・変更されたとき',
                  },
                  {
                    key: 'attendanceReminders',
                    label: '出欠リマインダー',
                    description: '出欠回答の締切が近づいたとき',
                  },
                  {
                    key: 'growthRecords',
                    label: '成長記録',
                    description: '新しい成長記録が追加されたとき',
                  },
                  {
                    key: 'albumUpdates',
                    label: 'アルバム更新',
                    description: '新しいアルバムや写真が追加されたとき',
                  },
                  {
                    key: 'emergencyAlerts',
                    label: '緊急連絡',
                    description: '緊急のお知らせが送信されたとき',
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-neutral-800">
                        {item.label}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings[
                          item.key as keyof typeof notificationSettings
                        ] as boolean
                      }
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500/50"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* プライバシー設定タブ */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-base-dark mb-4">
                プライバシー設定
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                個人情報の公開範囲や写真の取り扱いを設定します。
              </p>
            </div>

            {/* プロフィール公開範囲 */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3">
                プロフィール公開範囲
              </h3>
              <div className="space-y-2">
                {[
                  {
                    value: 'public',
                    label: '公開',
                    description: '誰でも閲覧できます',
                  },
                  {
                    value: 'team',
                    label: 'チームメンバーのみ',
                    description: 'チームメンバーと保護者のみ閲覧できます',
                  },
                  {
                    value: 'private',
                    label: '非公開',
                    description: '自分とコーチのみ閲覧できます',
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-neutral-800">
                        {option.label}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {option.description}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="profileVisibility"
                      checked={
                        privacySettings.profileVisibility === option.value
                      }
                      onChange={() =>
                        setPrivacySettings({
                          ...privacySettings,
                          profileVisibility: option.value as
                            | 'public'
                            | 'team'
                            | 'private',
                        })
                      }
                      className="w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500/50"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* 連絡先情報 */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3">
                連絡先情報の公開
              </h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-neutral-600" />
                    <div>
                      <p className="font-medium text-neutral-800">
                        メールアドレスを公開
                      </p>
                      <p className="text-sm text-neutral-600">
                        他の保護者にメールアドレスを表示
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.showEmail}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        showEmail: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500/50"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-neutral-600" />
                    <div>
                      <p className="font-medium text-neutral-800">
                        電話番号を公開
                      </p>
                      <p className="text-sm text-neutral-600">
                        他の保護者に電話番号を表示
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.showPhone}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        showPhone: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500/50"
                  />
                </label>
              </div>
            </div>

            {/* 写真・動画設定 */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3">
                写真・動画の取り扱い
              </h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                  <div>
                    <p className="font-medium text-neutral-800">
                      写真のタグ付けを許可
                    </p>
                    <p className="text-sm text-neutral-600">
                      他のユーザーが写真にお子様をタグ付けできます
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.allowPhotoTagging}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        allowPhotoTagging: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500/50"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                  <div>
                    <p className="font-medium text-neutral-800">
                      写真のダウンロードを許可
                    </p>
                    <p className="text-sm text-neutral-600">
                      他のユーザーが写真をダウンロードできます
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.allowPhotoDownload}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        allowPhotoDownload: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500/50"
                  />
                </label>
              </div>
            </div>

            {/* データ共有 */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3">
                データ共有
              </h3>
              <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                <div>
                  <p className="font-medium text-neutral-800">
                    コーチとデータを共有
                  </p>
                  <p className="text-sm text-neutral-600">
                    成長記録や出欠状況をコーチと共有します
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.shareDataWithCoaches}
                  onChange={(e) =>
                    setPrivacySettings({
                      ...privacySettings,
                      shareDataWithCoaches: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500/50"
                />
              </label>
            </div>
          </div>
        )}

        {/* アカウント設定タブ */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-base-dark mb-4">
                アカウント設定
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                アカウント情報とセキュリティ設定を管理します。
              </p>
            </div>

            {/* ログイン情報 */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3">
                ログイン情報
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    メールアドレス
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value="parent@example.com"
                      readOnly
                      className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg bg-neutral-50"
                    />
                    <button className="px-4 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-semibold">
                      変更
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    パスワード
                  </label>
                  <button className="w-full px-4 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-semibold text-left">
                    パスワードを変更
                  </button>
                </div>
              </div>
            </div>

            {/* 2段階認証 */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-800 mb-1">
                    2段階認証（推奨）
                  </h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    アカウントのセキュリティを強化するため、2段階認証を有効にすることをお勧めします。
                  </p>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold">
                    2段階認証を有効にする
                  </button>
                </div>
              </div>
            </div>

            {/* アカウント削除 */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 mb-1">
                    アカウントの削除
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    アカウントを削除すると、すべてのデータが完全に削除されます。この操作は取り消せません。
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                    アカウントを削除
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 表示設定タブ */}
        {activeTab === 'display' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-base-dark mb-4">
                表示設定
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                言語、タイムゾーン、テーマなどの表示設定を管理します。
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  言語
                </label>
                <select
                  value={displaySettings.language}
                  onChange={(e) =>
                    setDisplaySettings({
                      ...displaySettings,
                      language: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                  <option value="ko">한국어</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  タイムゾーン
                </label>
                <select
                  value={displaySettings.timezone}
                  onChange={(e) =>
                    setDisplaySettings({
                      ...displaySettings,
                      timezone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <option value="Asia/Tokyo">東京（日本標準時）</option>
                  <option value="America/New_York">ニューヨーク（EST）</option>
                  <option value="Europe/London">ロンドン（GMT）</option>
                  <option value="Asia/Shanghai">上海（CST）</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  日付フォーマット
                </label>
                <select
                  value={displaySettings.dateFormat}
                  onChange={(e) =>
                    setDisplaySettings({
                      ...displaySettings,
                      dateFormat: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <option value="YYYY/MM/DD">2025/10/31</option>
                  <option value="MM/DD/YYYY">10/31/2025</option>
                  <option value="DD/MM/YYYY">31/10/2025</option>
                  <option value="YYYY-MM-DD">2025-10-31</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  テーマ
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'light', label: 'ライト', icon: '☀️' },
                    { value: 'dark', label: 'ダーク', icon: '🌙' },
                    { value: 'auto', label: '自動', icon: '⚙️' },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() =>
                        setDisplaySettings({
                          ...displaySettings,
                          theme: theme.value as 'light' | 'dark' | 'auto',
                        })
                      }
                      className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                        displaySettings.theme === theme.value
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-neutral-200 text-neutral-700 hover:border-green-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{theme.icon}</div>
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 保存ボタン */}
      <div className="flex items-center justify-end gap-3">
        <button className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-semibold">
          リセット
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
        >
          <Save className="w-5 h-5" />
          変更を保存
        </button>
      </div>
    </div>
  );
}
