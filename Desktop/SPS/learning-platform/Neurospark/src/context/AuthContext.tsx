import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const login = async (token: string, role: string) => {
    try {
      // First set the auth state
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      setIsAuthenticated(true);
      setUserRole(role);
      console.log('Logged in with role:', role);

      // Then navigate based on role
      const dashboardRoutes = {
        admin: '/app/admin/dashboard',
        teacher: '/app/teacher/dashboard',
        student: '/app/student/dashboard'
      };

      const route = dashboardRoutes[role as keyof typeof dashboardRoutes] || '/';
      await Promise.resolve(); // Ensure state is updated before navigation
      navigate(route, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      logout();
    }
  };

  const logout = () => {
    // First clear the auth state
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    console.log('Logged out');
    
    // Then navigate
    navigate('/app/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
