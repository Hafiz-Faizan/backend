import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import businessRoutes from './routes/businessRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import formRoutes from './routes/formRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import adRoutes from './routes/adRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
  credentials: true
};

// Apply CORS middleware with configuration
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/businesses', businessRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/ads', adRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));