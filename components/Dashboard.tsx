import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import { Sale, Customer, Farm, Payment } from '../types';

interface DashboardProps {
  sales: Sale[];
  customers: Customer[];
  farms: Farm[];
  payments: Payment[];
  setPage: (page: any) => void;
}

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className={`rounded-full p-3 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ShortcutButton = ({ title, icon, onClick }: { title: string, icon: React.ReactNode, onClick: () => void }) => (
    <button onClick={onClick} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 hover:shadow-lg hover:bg-blue-50 transition-all duration-200">
        <div className="text-blue-600">{icon}</div>
        <p className="text-md font-semibold text-gray-700">{title}</p>
    </button>
);


const Dashboard: React.FC<DashboardProps> = ({ sales, customers, farms, payments, setPage }) => {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = today.substring(0, 7);

    const stats = useMemo(() => {
        const totalSalesToday = sales
            .filter(s => s.date === today)
            .reduce((sum, s) => sum + s.total, 0);

        const totalSalesMonth = sales
            .filter(s => s.date.startsWith(currentMonth))
            .reduce((sum, s) => sum + s.total, 0);
        
        const totalSalesOverall = sales.reduce((sum, s) => sum + s.total, 0);
        
        const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);

        const outstandingBalance = totalSalesOverall - totalPayments;

        return {
            totalFarms: farms.length,
            totalCustomers: customers.length,
            totalSalesToday,
            totalSalesMonth,
            totalPayments,
            outstandingBalance
        };
    }, [sales, customers, farms, payments, today, currentMonth]);

    const salesByDay = useMemo(() => {
        // Fix: Use generic on reduce to ensure correct type inference for the accumulator.
        const salesMap = sales.reduce<Record<string, number>>((acc, sale) => {
            const date = sale.date;
            acc[date] = (acc[date] || 0) + sale.total;
            return acc;
        }, {});

        return Object.entries(salesMap)
            .map(([date, total]) => ({ date, total }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-30);
    }, [sales]);

    const topCustomers = useMemo(() => {
        // Fix: Use generic on reduce to ensure correct type inference for the accumulator.
        const customerSales = sales.reduce<Record<string, number>>((acc, sale) => {
            acc[sale.customerName] = (acc[sale.customerName] || 0) + sale.total;
            return acc;
        }, {});

        return Object.entries(customerSales)
            .map(([name, total]) => ({ name, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);
    }, [sales]);

    return (
        <div className="p-4 md:p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <StatCard title="Total Farms" value={stats.totalFarms} color="bg-green-100 text-green-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
                <StatCard title="Total Customers" value={stats.totalCustomers} color="bg-blue-100 text-blue-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
                <StatCard title="Sales (Today)" value={`$${stats.totalSalesToday.toLocaleString()}`} color="bg-yellow-100 text-yellow-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
                <StatCard title="Outstanding Balance" value={`$${stats.outstandingBalance.toLocaleString()}`} color="bg-red-100 text-red-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Sales Trend (Last 30 Days)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesByDay} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`}/>
                                <Legend />
                                <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name="Sales" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 5 Customers by Sales</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topCustomers} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" fontSize={12} />
                                <YAxis type="category" dataKey="name" fontSize={12} width={80} />
                                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`}/>
                                <Legend />
                                <Bar dataKey="total" fill="#8884d8" name="Total Sales" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ShortcutButton title="Add Sale" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} onClick={() => setPage('Sales')} />
                <ShortcutButton title="Add Account" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>} onClick={() => setPage('Accounts')} />
                <ShortcutButton title="View Reports" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} onClick={() => setPage('Reports')} />
            </div>

        </div>
    );
};

export default Dashboard;