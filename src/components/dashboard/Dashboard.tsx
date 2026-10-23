import React from 'react';

export const Dashboard = ({ contracts, transactions }: { contracts: any[]; transactions: any[] }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold">Dashboard</h2>
    <p>Contracts: {contracts.length}</p>
  </div>
);
