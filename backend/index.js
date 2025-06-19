import express from 'express';
import dotenv from 'dotenv';
import db from './db/db.js';
import cors from 'cors';
import childrenRoutes from './routes/childrenRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import sponsorRoutes from './routes/sponsorRoutes.js';
import authRoutes from './routes/auth.js';


dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ optional: for form data

app.use('/api/children', childrenRoutes);
app.use('/api/donate', donationRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('EduFund API running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
