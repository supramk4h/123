
import React, { useState, useEffect, useCallback } from 'react';

// Components
import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';
import Sales from './components/Sales';
import Payments from './components/Payments';
import Reports from './components/Reports';
import Balances from './components/Balances';
import Help from './components/Help';
import {
  AccountsIcon,
  BalancesIcon,
  ChickenIcon,
  CloseIcon,
  DashboardIcon,
  HelpIcon,
  MenuIcon,
  PaymentsIcon,
  ReportsIcon,
  SalesIcon,
} from './components/Icons';

// Types
import { Farm, Customer, ReceivableAccount, Sale, Payment } from './types';

// Data & Utils
import { mockFarms, mockCustomers, mockReceivables, mockSales, mockPayments } from './data/mockData';
import { generateId } from './data/utils';

// A simple hook for localStorage
const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Initialize with localStorage if available, otherwise use mock data
    try {
      const item = window.localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : null;
      // Ensure mock data is loaded if local storage is empty
      if (parsedItem === null || (Array.isArray(parsedItem) && parsedItem.length === 0)) {
        return initialValue;
      }
      return parsedItem;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};


const NavLink: React.FC<{
  Icon: React.FC<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-700 text-white shadow-lg'
        : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
    }`}
  >
    <Icon className="w-6 h-6" />
    <span className="font-medium">{label}</span>
  </button>
);

const App: React.FC = () => {
  const [page, setPage] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data states with localStorage persistence
  const [farms, setFarms] = useLocalStorage<Farm[]>('farms', mockFarms);
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', mockCustomers);
  const [receivables, setReceivables] = useLocalStorage<ReceivableAccount[]>('receivables', mockReceivables);
  const [sales, setSales] = useLocalStorage<Sale[]>('sales', mockSales);
  const [payments, setPayments] = useLocalStorage<Payment[]>('payments', mockPayments);

  const handleSetPage = (newPage: string) => {
    setPage(newPage);
    setIsSidebarOpen(false); // Close sidebar on navigation
  };

  const createHandler = <T extends { id?: string; createdAt?: string }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    prefix: string
  ) => (item: Omit<T, 'id' | 'createdAt'>) => {
    setter(prev => {
      const lastId = prev.length > 0 ? prev[prev.length - 1].id! : `${prefix}-0000`;
      const newItem = { ...item, id: generateId(prefix, lastId), createdAt: new Date().toISOString() } as T;
      return [...prev, newItem];
    });
  };

  const updateHandler = <T extends { id?: string }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => (updatedItem: T) => {
    setter(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const deleteHandler = <T extends { id?: string }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => (id: string) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  // Farm Handlers
  const handleAddFarm = createHandler(setFarms, 'F');
  const handleUpdateFarm = updateHandler(setFarms);
  const handleDeleteFarm = deleteHandler(setFarms);

  // Customer Handlers
  const handleAddCustomer = createHandler(setCustomers, 'C');
  const handleUpdateCustomer = updateHandler(setCustomers);
  const handleDeleteCustomer = deleteHandler(setCustomers);

  // Receivable Handlers
  const handleAddReceivable = createHandler(setReceivables, 'R');
  const handleUpdateReceivable = updateHandler(setReceivables);
  const handleDeleteReceivable = deleteHandler(setReceivables);

  // Sale Handlers
  const handleAddSale = (sale: Omit<Sale, 'id'>) => {
    setSales(prev => {
      const lastId = prev.length > 0 ? prev[prev.length - 1].id! : 'S-0000';
      const newSale = { ...sale, id: generateId('S', lastId) };
      return [...prev, newSale];
    });
  };
  const handleUpdateSale = updateHandler(setSales);
  const handleDeleteSale = deleteHandler(setSales);

  // Payment Handlers
  const handleAddPayment = (payment: Omit<Payment, 'id'>) => {
    setPayments(prev => {
        const lastId = prev.length > 0 ? prev[prev.length-1].id! : 'P-0000';
        const newPayment = { ...payment, id: generateId('P', lastId) };
        return [...prev, newPayment];
    })
  };
  const handleUpdatePayment = updateHandler(setPayments);
  const handleDeletePayment = deleteHandler(setPayments);


  const renderPage = useCallback(() => {
    switch (page) {
      case 'Dashboard':
        return <Dashboard sales={sales} customers={customers} farms={farms} payments={payments} setPage={handleSetPage} />;
      case 'Accounts':
        return <Accounts
          farms={farms} customers={customers} receivables={receivables}
          onAddFarm={handleAddFarm} onUpdateFarm={handleUpdateFarm} onDeleteFarm={handleDeleteFarm}
          onAddCustomer={handleAddCustomer} onUpdateCustomer={handleUpdateCustomer} onDeleteCustomer={handleDeleteCustomer}
          onAddReceivable={handleAddReceivable} onUpdateReceivable={handleUpdateReceivable} onDeleteReceivable={handleDeleteReceivable}
        />;
      case 'Sales':
        return <Sales sales={sales} customers={customers} farms={farms} onAddSale={handleAddSale} onUpdateSale={handleUpdateSale} onDeleteSale={handleDeleteSale} />;
      case 'Payments':
        return <Payments payments={payments} customers={customers} receivables={receivables} onAddPayment={handleAddPayment} onUpdatePayment={handleUpdatePayment} onDeletePayment={handleDeletePayment} />;
      case 'Reports':
        return <Reports sales={sales} customers={customers} payments={payments} />;
      case 'Balances':
        return <Balances customers={customers} sales={sales} payments={payments} />;
      case 'Help':
        return <Help />;
      default:
        return <Dashboard sales={sales} customers={customers} farms={farms} payments={payments} setPage={handleSetPage} />;
    }
  }, [page, farms, customers, receivables, sales, payments, handleAddFarm, handleUpdateFarm, handleDeleteFarm, handleAddCustomer, handleUpdateCustomer, handleDeleteCustomer, handleAddReceivable, handleUpdateReceivable, handleDeleteReceivable, handleAddSale, handleUpdateSale, handleDeleteSale, handleAddPayment, handleUpdatePayment, handleDeletePayment]);

  const navigationItems = [
    { name: 'Dashboard', icon: DashboardIcon },
    { name: 'Accounts', icon: AccountsIcon },
    { name: 'Sales', icon: SalesIcon },
    { name: 'Payments', icon: PaymentsIcon },
    { name: 'Reports', icon: ReportsIcon },
    { name: 'Balances', icon: BalancesIcon },
    { name: 'Help', icon: HelpIcon },
  ];

  const sidebarContent = (
    <div className="bg-white h-full flex flex-col p-4 shadow-lg">
      <div className="flex items-center space-x-2 p-2 mb-6 border-b pb-4">
        <ChickenIcon className="h-10 w-10 text-blue-700" />
        <h1 className="text-2xl font-bold text-gray-800">Poultry ERP</h1>
      </div>
      <nav className="flex-grow space-y-2">
        {navigationItems.map(item => (
            <NavLink
                key={item.name}
                Icon={item.icon}
                label={item.name}
                isActive={page === item.name}
                onClick={() => handleSetPage(item.name)}
            />
        ))}
      </nav>
      <div className="mt-auto text-center text-xs text-gray-400">
        <p>&copy; 2024 Poultry ERP</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        {sidebarContent}
      </aside>
      
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <aside className="w-64 h-full">
            {sidebarContent}
        </aside>
      </div>
       {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md lg:hidden p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">{page}</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
