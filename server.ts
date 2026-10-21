import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes (common for dev and prod)
  app.get('/api/auth/me', (req, res) => res.json({ id: 1802649782, full_name: 'علیرضا رضوانی', role: 'employer', sheba: 'IR520120000000001234567890', national_id: '0012345678' }));
  app.get('/api/contracts', (req, res) => res.json([]));
  app.get('/api/wallet/transactions', (req, res) => res.json([]));
  app.get('/api/disputes', (req, res) => res.json([]));
  app.get('/api/affiliate', (req, res) => res.json({}));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
  });
}

startServer();
