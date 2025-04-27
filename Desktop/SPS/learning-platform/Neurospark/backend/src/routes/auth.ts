import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { z } from 'zod';

const router = Router();

// Temporary in-memory storage (replace with database later)
const users = {
  admin: {
    id: 'admin-1',
    email: 'nathansachika@gmail.com',
    password: '$2a$10$YourHashedPasswordHere', // Will be set on first run
    role: 'admin'
  },
  teachers: new Map(),
  students: new Map()
};

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

const createTeacherSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

// Initialize admin password on first run
(async () => {
  if (!users.admin.password.startsWith('$2a')) {
    users.admin.password = await bcrypt.hash('Natonae#7', 10);
  }
})();

// Admin login
router.post('/login/admin', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    if (email !== users.admin.email) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, users.admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: users.admin.id, role: 'admin' },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: 'admin' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher login
router.post('/login/teacher', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const teacher = Array.from(users.teachers.values()).find(t => t.email === email);
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, teacher.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: teacher.id, role: 'teacher' },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: 'teacher' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Student login
router.post('/login/student', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const student = Array.from(users.students.values()).find(s => s.email === email);
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: student.id, role: 'student' },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: 'student' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register/student', async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    // Check if email is already in use
    const existingStudent = Array.from(users.students.values()).find(s => s.email === email);
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = `student-${Date.now()}`;

    users.students.set(id, {
      id,
      name,
      email,
      password: hashedPassword,
      role: 'student'
    });

    const token = jwt.sign(
      { id, role: 'student' },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/teacher', async (req, res) => {
  try {
    const { name, email, password } = createTeacherSchema.parse(req.body);

    // Check if email is already in use
    const existingTeacher = Array.from(users.teachers.values()).find(t => t.email === email);
    if (existingTeacher) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = `teacher-${Date.now()}`;

    users.teachers.set(id, {
      id,
      name,
      email,
      password: hashedPassword,
      role: 'teacher'
    });

    res.status(201).json({ message: 'Teacher account created successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/teachers', (req, res) => {
  const teachersList = Array.from(users.teachers.values()).map(({ password, ...teacher }) => teacher);
  res.json(teachersList);
});

export default router;
