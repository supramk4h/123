

import React, { useState, useMemo } from 'react';
import { Sale, Customer, Payment } from '../types';
import { PageHeader } from './common/PageHeader';
import { Table } from './common/Table';
import { DownloadIcon, PrintIcon } from './Icons';
import { formatDate } from '../data/utils';

interface ReportsProps {
    sales: Sale[];
    customers: Customer[];
    payments: Payment[];
}

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
        active ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'
        }`}
    >
        {children}
    </button>
);

const SalesReport: React.FC<{sales: Sale[]}> = ({ sales }) => {
    const columns = useMemo(() => [
        { header: 'ID', accessor: 'id' as keyof Sale },
        { header: 'Date', accessor: 'date' as keyof Sale, formatter: formatDate },
        { header: 'Customer', accessor: 'customerName' as keyof Sale },
        { header: 'Farm', accessor: 'farmName' as keyof Sale },
        { header: 'Net Weight', accessor: 'netWeight' as keyof Sale },
        { header: 'Rate', accessor: 'rate' as keyof Sale, isCurrency: true },
        { header: 'Total', accessor: 'total' as keyof Sale, isCurrency: true },
        { header: 'Payment', accessor: 'paymentType' as keyof Sale },
    ], []);
    return <Table columns={columns} data={sales} showFooter />;
}

const CustomerLedger: React.FC<ReportsProps> = ({ customers, sales, payments }) => {
    const [selectedCustomer, setSelectedCustomer] = useState<string>(customers[0]?.name || '');

    const ledgerData = useMemo(() => {
        if (!selectedCustomer) return [];

        const customer = customers.find(c => c.name === selectedCustomer);
        const customerSales = sales.filter(s => s.customerName === selectedCustomer);
        const customerPayments = payments.filter(p => p.customerName === selectedCustomer);

        const transactions = [
            ...customerSales.map(s => ({
                id: `s-${s.id}`,
                date: s.date,
                particulars: `Sale #${s.id}`,
                debit: s.total,
                credit: 0
            })),
            ...customerPayments.map(p => ({
                id: `p-${p.id}`,
                date: p.date,
                particulars: `Payment #${p.id}`,
                debit: 0,
                credit: p.amount
            }))
        ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        let balance = customer?.openingBalance || 0;
        const runningBalance = transactions.map(t => {
            balance = balance + t.debit - t.credit;
            return { ...t, balance };
        });

        return [
            { id: 'ob', date: '', particulars: 'Opening Balance', debit: '', credit: '', balance: customer?.openingBalance || 0 },
            ...runningBalance
        ];

    }, [selectedCustomer, customers, sales, payments]);
    
    // Fix: Explicitly type the columns array to ensure accessor is a valid key of the data type.
    const columns = useMemo((): Array<{
        header: string;
        accessor: 'date' | 'particulars' | 'debit' | 'credit' | 'balance';
        isCurrency?: boolean;
        formatter?: (value: any) => string;
    }> => [
        { header: 'Date', accessor: 'date', formatter: (d: string) => d ? formatDate(d) : '' },
        { header: 'Particulars', accessor: 'particulars' },
        { header: 'Debit', accessor: 'debit', isCurrency: true },
        { header: 'Credit', accessor: 'credit', isCurrency: true },
        { header: 'Balance', accessor: 'balance', isCurrency: true },
    ], []);
    
    return (
        <div>
            <div className="mb-4 max-w-xs">
                <label htmlFor="customer-select" className="block text-sm font-medium text-gray-700">Select Customer</label>
                <select id="customer-select" value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                    {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
            </div>
            <Table columns={columns} data={ledgerData} />
        </div>
    );
};

const AgingReport: React.FC<ReportsProps> = ({ customers, sales, payments }) => {
    const agingData = useMemo(() => {
        return customers.map(customer => {
            const customerSales = sales.filter(s => s.customerName === customer.name);
            const customerPayments = payments.filter(p => p.customerName === customer.name);
            const totalSales = customerSales.reduce((sum, s) => sum + s.total, 0);
            const totalPayments = customerPayments.reduce((sum, p) => sum + p.amount, 0);
            const balance = (customer.openingBalance || 0) + totalSales - totalPayments;
            
            if (balance <= 0) return null;

            return {
                id: customer.id,
                customerName: customer.name,
                totalDue: balance,
            };
        }).filter((item): item is NonNullable<typeof item> => item !== null);
    }, [customers, sales, payments]);

    // Fix: Explicitly type the columns array to ensure accessor is a valid key of the data type.
    const columns = useMemo((): Array<{
        header: string;
        accessor: 'customerName' | 'totalDue';
        isCurrency?: boolean;
        highlight?: (value: any) => boolean;
    }> => [
        { header: 'Customer Name', accessor: 'customerName' },
        { header: 'Total Due', accessor: 'totalDue', isCurrency: true, highlight: (val: number) => val > 0 },
    ], []);

    return <Table columns={columns} data={agingData} showFooter />;
}

const Reports: React.FC<ReportsProps> = ({ sales, customers, payments }) => {
    const [activeTab, setActiveTab] = useState('Sales Summary');
    const today = new Date().toISOString().split('T')[0];
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];
    
    const [dateRange, setDateRange] = useState({ start: lastMonth, end: today });

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const filteredSales = useMemo(() => {
        return sales.filter(s => s.date >= dateRange.start && s.date <= dateRange.end);
    }, [sales, dateRange]);

    const renderReport = () => {
        switch (activeTab) {
            case 'Sales Summary':
                return <SalesReport sales={filteredSales} />;
            case 'Customer Ledger':
                return <CustomerLedger customers={customers} sales={sales} payments={payments} />;
            case 'Aging Report':
                return <AgingReport customers={customers} sales={sales} payments={payments} />;
            default:
                return null;
        }
    };
    
    const reportActions = (
      <div className="flex items-center space-x-2">
          <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300" onClick={() => window.print()}><PrintIcon /></button>
          <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"><DownloadIcon /></button>
      </div>
    );

    return (
        <div className="p-4 md:p-6 space-y-6">
            <PageHeader title="Reports" actions={reportActions} />

            <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center justify-between gap-4">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6">
                        <TabButton active={activeTab === 'Sales Summary'} onClick={() => setActiveTab('Sales Summary')}>Sales Summary</TabButton>
                        <TabButton active={activeTab === 'Customer Ledger'} onClick={() => setActiveTab('Customer Ledger')}>Customer Ledger</TabButton>
                        <TabButton active={activeTab === 'Aging Report'} onClick={() => setActiveTab('Aging Report')}>Aging Report</TabButton>
                    </nav>
                </div>
                {activeTab === 'Sales Summary' && (
                    <div className="flex items-center space-x-2">
                        <input type="date" name="start" value={dateRange.start} onChange={handleDateChange} className="border p-2 rounded-md" />
                        <span>to</span>
                        <input type="date" name="end" value={dateRange.end} onChange={handleDateChange} className="border p-2 rounded-md" />
                    </div>
                )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                {renderReport()}
            </div>
        </div>
    );
};

export default Reports;