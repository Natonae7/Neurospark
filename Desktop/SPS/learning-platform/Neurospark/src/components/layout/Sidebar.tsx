
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, BarChart, Users, 
  MessageCircle, Settings, LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userType: 'teacher' | 'student';
}

const Sidebar = ({ userType }: SidebarProps) => {
  const navItems = userType === 'teacher' ? [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/app/teacher/dashboard' },
    { name: 'Lessons', icon: BookOpen, path: '/app/lessons' },
    { name: 'Performance', icon: BarChart, path: '/app/teacher/performance' },
    { name: 'Students', icon: Users, path: '/app/teacher/students' },
  ] : [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/app/student/dashboard' },
    { name: 'My Lessons', icon: BookOpen, path: '/app/lessons' },
    { name: 'Progress', icon: BarChart, path: '/app/student/progress' },
  ];

  const commonItems = [
    { name: 'AI Assistant', icon: MessageCircle, path: '/app/ai-assistant' },
    { name: 'Settings', icon: Settings, path: '/app/settings' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-border hidden md:flex flex-col transition-all duration-300">
      <div className="p-4 border-b border-border flex items-center">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-electric-blue to-mint-green flex items-center justify-center">
          <span className="text-white font-bold text-sm">EDU</span>
        </div>
        <h1 className="ml-3 font-bold text-lg text-foreground">EduDashboard</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4 flex flex-col">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="group py-2 px-3 flex items-center text-sm font-medium rounded-md hover:bg-muted transition-colors"
            >
              <item.icon className="mr-3 h-5 w-5 text-electric-blue" />
              {item.name}
            </Link>
          ))}

          <div className="pt-6 pb-2 px-3">
            <div className="border-t border-border" />
            <h3 className="mt-4 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Support
            </h3>
          </div>
          
          {commonItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="group py-2 px-3 flex items-center text-sm font-medium rounded-md hover:bg-muted transition-colors"
            >
              <item.icon className="mr-3 h-5 w-5 text-soft-purple" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
