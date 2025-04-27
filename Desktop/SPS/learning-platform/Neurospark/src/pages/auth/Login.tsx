
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState<'admin' | 'teacher' | 'student'>('student');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const role = searchParams.get('role');
    if (role && ['admin', 'teacher', 'student'].includes(role)) {
      setUserType(role as 'admin' | 'teacher' | 'student');
    }
  }, [searchParams]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(email, password);
      const { user } = response;
      
      if (user.role !== userType) {
        throw new Error(`Invalid credentials for ${userType} login`);
      }

      // First show success message
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });

      // Then handle login and navigation
      await login(user.token, user.role);
      const dashboardRoutes = {
        admin: '/app/admin/dashboard',
        teacher: '/app/teacher/dashboard',
        student: '/app/student/dashboard'
      };
      navigate(dashboardRoutes[user.role]);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showLoginButton={false} />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#00BCD4] flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">NS</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to continue to NeuroSpark</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="w-full shadow-lg border-0">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Please enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>User Type</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {['student', 'teacher', 'admin'].map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant={userType === type ? 'default' : 'outline'}
                          className="w-full capitalize"
                          onClick={() => setUserType(type as typeof userType)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#00BCD4] hover:bg-[#00ACC1]"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-muted-foreground">
                  New to NeuroSpark? <Link to="app/register" className="text-[#00BCD4] hover:underline">Create an account</Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
