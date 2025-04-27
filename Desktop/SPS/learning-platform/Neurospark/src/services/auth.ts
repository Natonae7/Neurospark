interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  token: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

const DEFAULT_USERS = {
  admin: {
    id: '1',
    email: 'admin@neurospark.edu',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const
  },
  teacher: {
    id: '2',
    email: 'teacher@neurospark.edu',
    password: 'teacher123',
    name: 'Teacher User',
    role: 'teacher' as const
  },
  student: {
    id: '3',
    email: 'student@neurospark.edu',
    password: 'student123',
    name: 'Student User',
    role: 'student' as const
  }
};

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find matching user
    const user = Object.values(DEFAULT_USERS).find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Create a mock JWT token
    const token = btoa(JSON.stringify({ 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    }));

    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        token: 'mock-jwt-token'
      },
      token
    };
  }
};
