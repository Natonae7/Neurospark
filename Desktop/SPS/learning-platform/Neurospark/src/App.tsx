
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TeacherDashboard from "./pages/teacher/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AIAssistant from "./pages/ai/AIAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { isAuthenticated, userRole } = useAuth();
  console.log('Protected route check:', { isAuthenticated, userRole, allowedRoles });

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/app/login" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    console.log('Unauthorized role, redirecting to home');
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, userRole } = useAuth();
  console.log('App routes render:', { isAuthenticated, userRole });

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to={`/app/${userRole}/dashboard`} replace /> : <Index />} />
      
      {/* Auth routes */}
      <Route 
        path="/app/login" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } 
      />
      <Route 
        path="/app/register" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Register />
        } 
      />
      
      {/* Admin routes */}
      <Route 
        path="/app/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Teacher routes */}
      <Route 
        path="/app/teacher/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Student routes */}
      <Route 
        path="/app/student/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Shared routes */}
      <Route 
        path="/app/ai-assistant" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}>
            <AIAssistant />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
