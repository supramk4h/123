import React, { useState } from 'react';
import { Farm, Customer, ReceivableAccount } from '../types';
import { PageHeader } from './common/PageHeader';
import { Table } from './common/Table';
import { PlusIcon } from './Icons';
import { Modal } from './common/Modal';

interface AccountsProps {
  farms: Farm[];
  customers: Customer[];
  receivables: ReceivableAccount[];
  onAddFarm: (farm: Omit<Farm, 'id' | 'createdAt'>) => void;
  onUpdateFarm: (farm: Farm) => void;
  onDeleteFarm: (id: string) => void;
  onAddCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  onUpdateCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onAddReceivable: (receivable: Omit<ReceivableAccount, 'id' | 'createdAt'>) => void;
  onUpdateReceivable: (receivable: ReceivableAccount) => void;
  onDeleteReceivable: (id: string) => void;
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

const FormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    title: string;
    children: React.ReactNode;
}> = ({ isOpen, onClose, onSubmit, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg m-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
                <form onSubmit={onSubmit}>
                    <div className="space-y-4">{children}</div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-blue-900 font-semibold">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Accounts: React.FC<AccountsProps> = (props) => {
  const [activeTab, setActiveTab] = useState('Farms');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Farm | Customer | ReceivableAccount | null>(null);
  const [deletingItem, setDeletingItem] = useState<Farm | Customer | ReceivableAccount | null>(null);
  const [formState, setFormState] = useState<any>({});

  const handleOpenModal = (item: Farm | Customer | ReceivableAccount | null = null) => {
    setEditingItem(item);
    setFormState(item || {});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormState({});
  };

  const handleChange = (field: string, value: any) => {
    setFormState((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'Farms') {
      editingItem ? props.onUpdateFarm(formState) : props.onAddFarm(formState);
    } else if (activeTab === 'Customers') {
      editingItem ? props.onUpdateCustomer(formState) : props.onAddCustomer(formState);
    } else if (activeTab === 'Receivables') {
        editingItem ? props.onUpdateReceivable(formState) : props.onAddReceivable(formState);
    }
    handleCloseModal();
  };
  
  const handleDeleteConfirm = () => {
    if (deletingItem) {
        if (activeTab === 'Farms') props.onDeleteFarm(deletingItem.id!);
        else if (activeTab === 'Customers') props.onDeleteCustomer(deletingItem.id!);
        else if (activeTab === 'Receivables') props.onDeleteReceivable(deletingItem.id!);
    }
    setDeletingItem(null);
  };
  

  const renderFormFields = () => {
    switch (activeTab) {
      case 'Farms':
        return <>
          <input type="text" placeholder="Farm Name" value={formState.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full border p-2 rounded" required />
          <input type="number" placeholder="Flock No" value={formState.flockNo || ''} onChange={e => handleChange('flockNo', Number(e.target.value))} className="w-full border p-2 rounded" required/>
          <input type="number" placeholder="Chickens" value={formState.chickens || ''} onChange={e => handleChange('chickens', Number(e.target.value))} className="w-full border p-2 rounded" required/>
          <input type="text" placeholder="Address" value={formState.address || ''} onChange={e => handleChange('address', e.target.value)} className="w-full border p-2 rounded" />
        </>;
      case 'Customers':
        return <>
          <input type="text" placeholder="Customer Name" value={formState.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full border p-2 rounded" required />
          <input type="text" placeholder="Phone" value={formState.phone || ''} onChange={e => handleChange('phone', e.target.value)} className="w-full border p-2 rounded" />
          <input type="text" placeholder="Address" value={formState.address || ''} onChange={e => handleChange('address', e.target.value)} className="w-full border p-2 rounded" />
          <input type="number" placeholder="Opening Balance" value={formState.openingBalance || 0} onChange={e => handleChange('openingBalance', Number(e.target.value))} className="w-full border p-2 rounded" />
        </>;
      case 'Receivables':
         return <>
          <input type="text" placeholder="Account Name" value={formState.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full border p-2 rounded" required />
          <input type="text" placeholder="Type (e.g., Bank, Cash)" value={formState.type || ''} onChange={e => handleChange('type', e.target.value)} className="w-full border p-2 rounded" required/>
          <input type="number" placeholder="Balance" value={formState.balance || 0} onChange={e => handleChange('balance', Number(e.target.value))} className="w-full border p-2 rounded" />
        </>;
      default: return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Accounts Management" ButtonIcon={PlusIcon} buttonText="Add New" onButtonClick={() => handleOpenModal()} />
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          <TabButton active={activeTab === 'Farms'} onClick={() => setActiveTab('Farms')}>Farms</TabButton>
          <TabButton active={activeTab === 'Customers'} onClick={() => setActiveTab('Customers')}>Customers</TabButton>
          <TabButton active={activeTab === 'Receivables'} onClick={() => setActiveTab('Receivables')}>Receivable Accounts</TabButton>
        </nav>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'Farms' && (
          <Table 
            columns={[
              { header: 'ID', accessor: 'id' }, { header: 'Name', accessor: 'name' }, { header: 'Flock No', accessor: 'flockNo' },
              { header: 'Chickens', accessor: 'chickens' }, { header: 'Address', accessor: 'address' },
            ]}
            data={props.farms} actionButtons onEdit={(item) => handleOpenModal(item as Farm)} onDelete={(item) => setDeletingItem(item as Farm)}
          />
        )}
        {activeTab === 'Customers' && (
          <Table 
            columns={[
              { header: 'ID', accessor: 'id' }, { header: 'Name', accessor: 'name' }, { header: 'Phone', accessor: 'phone' },
              { header: 'Address', accessor: 'address' }, { header: 'Opening Balance', accessor: 'openingBalance', isCurrency: true },
            ]}
            data={props.customers} actionButtons onEdit={(item) => handleOpenModal(item as Customer)} onDelete={(item) => setDeletingItem(item as Customer)}
          />
        )}
        {activeTab === 'Receivables' && (
          <Table 
            columns={[
              { header: 'ID', accessor: 'id' }, { header: 'Account Name', accessor: 'name' }, { header: 'Type', accessor: 'type' },
              { header: 'Balance', accessor: 'balance', isCurrency: true },
            ]}
            data={props.receivables} actionButtons onEdit={(item) => handleOpenModal(item as ReceivableAccount)} onDelete={(item) => setDeletingItem(item as ReceivableAccount)}
          />
        )}
      </div>

      <FormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} title={editingItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}>
        {renderFormFields()}
      </FormModal>
      
      <Modal isOpen={!!deletingItem} onClose={() => setDeletingItem(null)} onConfirm={handleDeleteConfirm} title="Confirm Deletion">
        Are you sure you want to delete this item? This action cannot be undone.
      </Modal>

    </div>
  );
};

export default Accounts;
