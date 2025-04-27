import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import authRoutes from './routes/auth';
import { verifyToken, requireRole } from './middleware/auth';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:8080', // Frontend URL
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/admin/dashboard', verifyToken, requireRole(['admin']), (req, res) => {
  res.json({ message: 'Admin dashboard data' });
});

app.get('/api/teacher/dashboard', verifyToken, requireRole(['teacher']), (req, res) => {
  res.json({ message: 'Teacher dashboard data' });
});

app.get('/api/student/dashboard', verifyToken, requireRole(['student']), (req, res) => {
  res.json({ message: 'Student dashboard data' });
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
