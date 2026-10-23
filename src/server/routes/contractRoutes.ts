import { Router } from 'express';
import { db } from '../db';
import { contracts } from '../db/schema';
import { EscrowService } from '../services/EscrowService';

const router = Router();
const escrowService = new EscrowService();

// دریافت لیست تمامی قراردادها
router.get('/', async (req, res) => {
  try {
    const allContracts = await db.select().from(contracts);
    res.json(allContracts);
  } catch (error) {
    res.status(500).json({ error: 'خطا در دریافت قراردادها' });
  }
});

// فعال‌سازی قرارداد (قفل کردن وجه)
router.post('/:id/lock', async (req, res) => {
  const { id } = req.params;
  const { buyerId, amount } = req.body;
  try {
    await escrowService.lockFunds(id, buyerId, amount);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'خطا در عملیات اسکرو' });
  }
});

export default router;
