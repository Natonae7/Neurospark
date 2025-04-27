import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authApi = {
  loginAdmin: (data: LoginData) => api.post('/auth/login/admin', data),
  loginTeacher: (data: LoginData) => api.post('/auth/login/teacher', data),
  loginStudent: (data: LoginData) => api.post('/auth/login/student', data),
  registerStudent: (data: RegisterData) => api.post('/auth/register/student', data),
  createTeacher: (data: RegisterData) => api.post('/auth/teacher', data),
  getTeachers: () => api.get('/auth/teachers')
};

export const dashboardApi = {
  getAdminDashboard: () => api.get('/admin/dashboard'),
  getTeacherDashboard: () => api.get('/teacher/dashboard'),
  getStudentDashboard: () => api.get('/student/dashboard')
};

export default api;
