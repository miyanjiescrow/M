import express from 'express';
import cors from 'cors';
import contractRoutes from './routes/contractRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/contracts', contractRoutes);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
