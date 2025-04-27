
import { Menu, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";

interface TopNavProps {
  userType: 'teacher' | 'student' | 'admin';
}

const TopNav = ({ userType }: TopNavProps) => {
  const { logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-border px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-gradient-to-r from-[#2196F3] to-[#00BCD4] rounded-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#2196F3] to-[#00BCD4]">
            NS
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={logout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default TopNav;
