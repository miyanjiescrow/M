import express from 'express';
import cors from 'cors';
import contractRoutes from './routes/contractRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/contracts', contractRoutes);

export default app;
