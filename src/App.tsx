import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Layout } from './components/layout/Layout';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './components/dashboard/Dashboard';

const fetchContracts = async () => {
  const { data } = await axios.get('/api/contracts');
  return data;
};

export default function App() {
  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: fetchContracts,
  });

  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className={theme}>
      <Layout>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        {isLoading ? (
          <div className="p-8 text-center">در حال بارگذاری...</div>
        ) : (
          <Dashboard contracts={contracts} transactions={[]} />
        )}
      </Layout>
    </div>
  );
}
