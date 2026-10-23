import { db } from '../db'; // فرض بر این است که کلاینت دیتابیس اکسپورت شده
import { contracts, contractHistory, transactions } from '../db/schema';
import { eq } from 'drizzle-orm';

export class EscrowService {
  /**
   * قفل کردن وجه و فعال‌سازی قرارداد
   * این متد باید در یک تراکنش (Transaction) اجرا شود.
   */
  async lockFunds(contractId: string, buyerId: string, amount: string) {
    return await db.transaction(async (tx: any) => {
      // ۱. به‌روزرسانی وضعیت قرارداد
      await tx.update(contracts)
        .set({ status: 'active', sellerId: buyerId }) // ساده‌سازی برای نمونه
        .where(eq(contracts.id, contractId));

      // ۲. ثبت تراکنش مالی
      await tx.insert(transactions).values({
        contractId,
        type: 'lock',
        amount: amount,
      });

      // ۳. ثبت لاگ تاریخچه (Immutable Log)
      await tx.insert(contractHistory).values({
        contractId,
        event: 'وجه توسط کارفرما قفل و قرارداد فعال شد.',
        actor: 'system',
      });
    });
  }

  /**
   * تسویه نهایی (آزاد سازی وجه برای مجری)
   */
  async releaseFunds(contractId: string, amount: string) {
    return await db.transaction(async (tx: any) => {
      await tx.update(contracts)
        .set({ status: 'completed' })
        .where(eq(contracts.id, contractId));

      await tx.insert(transactions).values({
        contractId,
        type: 'release',
        amount: amount,
      });

      await tx.insert(contractHistory).values({
        contractId,
        event: 'تسویه نهایی انجام شد.',
        actor: 'system',
      });
    });
  }
}
