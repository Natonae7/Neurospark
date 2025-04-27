
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface AppShellProps {
  children: ReactNode;
  userType: 'teacher' | 'student';
}

const AppShell = ({ children, userType }: AppShellProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType={userType} />
      <div className="flex flex-col flex-1 w-0">
        <TopNav userType={userType} />
        <main className="flex-1 p-4 md:p-6 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
