import express from 'express';
import dotenv from 'dotenv';
import db from './db/db.js';

import childrenRoutes from './routes/childrenRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/children', childrenRoutes);
app.use('/api/donate', donationRoutes);

app.get('/', (req, res) => {
  res.send('EduFund API running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
