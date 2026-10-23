import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

interface ContractCardProps {
  contract: any;
  onDeliver: (contract: any) => void;
  onDispute: (contract: any) => void;
}

export const ContractCard: React.FC<ContractCardProps> = ({ contract, onDeliver, onDispute }) => {
  return (
    <Card className="hover:border-blue-200 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">{contract.title}</h4>
          <span className="text-xs text-slate-500">{contract.contract_id}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
          contract.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
        }`}>
          {contract.status}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{formatCurrency(contract.amount)}</p>
      
      <div className="flex gap-2">
        <Button variant="primary" onClick={() => onDeliver(contract)} className="text-xs py-1.5 px-3">
          تحویل
        </Button>
        <Button variant="outline" onClick={() => onDispute(contract)} className="text-xs py-1.5 px-3">
          داوری
        </Button>
      </div>
    </Card>
  );
};
