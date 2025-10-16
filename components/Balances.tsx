

import React, { useMemo } from 'react';
import { Customer, Sale, Payment } from '../types';
import { PageHeader } from './common/PageHeader';
import { Table } from './common/Table';

interface BalancesProps {
  customers: Customer[];
  sales: Sale[];
  payments: Payment[];
}

const Balances: React.FC<BalancesProps> = ({ customers, sales, payments }) => {
  const balanceData = useMemo(() => {
    return customers.map(customer => {
      const customerSales = sales.filter(s => s.customerName === customer.name);
      const customerPayments = payments.filter(p => p.customerName === customer.name);
      
      const totalSales = customerSales.reduce((sum, s) => sum + s.total, 0);
      const totalPayments = customerPayments.reduce((sum, p) => sum + p.amount, 0);
      
      const balance = (customer.openingBalance + totalSales) - totalPayments;
      
      const allTransactions = [...customerSales, ...customerPayments].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const lastTransactionDate = allTransactions.length > 0 ? allTransactions[0].date : 'N/A';

      return {
        id: customer.id,
        name: customer.name,
        type: 'Customer',
        totalSales,
        totalPayments,
        balance,
        lastTransaction: lastTransactionDate,
      };
    });
  }, [customers, sales, payments]);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <PageHeader title="Live Balances View" />
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Table 
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Type', accessor: 'type' },
            { header: 'Total Sales', accessor: 'totalSales', isCurrency: true },
            { header: 'Total Payments', accessor: 'totalPayments', isCurrency: true },
            { header: 'Balance', accessor: 'balance', isCurrency: true },
            { header: 'Last Transaction', accessor: 'lastTransaction' },
          ]}
          data={balanceData}
        />
      </div>
    </div>
  );
};

export default Balances;