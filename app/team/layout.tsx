import { ReactNode } from 'react';
import TeamLayout from '@/components/team/TeamLayout';
import { UserProvider } from '@/contexts/UserContext';

export const metadata = {
  title: 'JFA A代表チームポータル | SAMURAI BLUE',
  description: '日本代表チームの統合管理ポータル - 内部管理と外部公開を兼ね備えたハイブリッド型プラットフォーム',
};

interface TeamLayoutWrapperProps {
  children: ReactNode;
}

export default function TeamLayoutWrapper({ children }: TeamLayoutWrapperProps) {
  return (
    <UserProvider>
      <TeamLayout>
        {children}
      </TeamLayout>
    </UserProvider>
  );
}
