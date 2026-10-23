import React from 'react';
import { Contract, WalletTransaction } from '../../types';

interface DashboardProps {
  contracts: Contract[];
  transactions: WalletTransaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ contracts, transactions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* کارت نمایش موجودی */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm text-slate-500 mb-2">موجودی کیف پول</h3>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">۴۵,۰۰۰,۰۰۰ تومان</p>
      </div>
      
      {/* آمار معاملات */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm text-slate-500 mb-2">معاملات فعال</h3>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{contracts.filter(c => c.status === 'active').length}</p>
      </div>

      {/* آخرین تراکنش */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm text-slate-500 mb-2">آخرین تراکنش</h3>
        <p className="text-lg font-semibold text-slate-900 dark:text-white truncate">
            {transactions[0]?.title || 'تراکنشی یافت نشد'}
        </p>
      </div>
    </div>
  );
};
