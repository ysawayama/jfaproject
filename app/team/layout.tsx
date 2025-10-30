import { ReactNode } from 'react';
import { UserProvider } from '@/contexts/UserContext';

export const metadata = {
  title: 'JFAチームポータル | SAMURAI BLUE',
  description: 'JFA日本代表チームの統合管理ポータル',
};

interface TeamLayoutWrapperProps {
  children: ReactNode;
}

export default function TeamLayoutWrapper({ children }: TeamLayoutWrapperProps) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
