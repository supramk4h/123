import React, { useState, useMemo, useEffect } from 'react';
import { Payment, Customer, ReceivableAccount } from '../types';
import { PageHeader } from './common/PageHeader';
import { Table } from './common/Table';
import { AutoCompleteInput } from './common/AutoCompleteInput';
import { PlusIcon } from './Icons';
import { formatDate } from '../data/utils';
import { Modal } from './common/Modal';

interface PaymentsProps {
  payments: Payment[];
  customers: Customer[];
  receivables: ReceivableAccount[];
  onAddPayment: (payment: Omit<Payment, 'id'>) => void;
  onUpdatePayment: (payment: Payment) => void;
  onDeletePayment: (id: string) => void;
}

const PaymentForm: React.FC<Omit<PaymentsProps, 'payments' | 'onDeletePayment'> & { initialData?: Payment | null; onDone: () => void; }> = ({ customers, receivables, onAddPayment, onUpdatePayment, initialData, onDone }) => {
    const initialState = {
        date: new Date().toISOString().split('T')[0],
        customerName: '', amount: 0, accountName: '', narration: '',
    };
    const [formState, setFormState] = useState(initialData || initialState);

    useEffect(() => {
        setFormState(initialData || initialState);
    }, [initialData]);

    const customerNames = useMemo(() => customers.map(c => c.name), [customers]);
    const accountNames = useMemo(() => receivables.filter(r => r.type === 'Bank' || r.type === 'Cash').map(r => r.name), [receivables]);
    
    const handleChange = (field: keyof Omit<Payment, 'id'>, value: any) => {
        setFormState(prev => ({...prev, [field]: value}));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData?.id) {
            onUpdatePayment(formState as Payment);
        } else {
            onAddPayment(formState);
        }
        onDone();
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50 mb-6">
            <input type="date" value={formState.date} onChange={e => handleChange('date', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required/>
            <AutoCompleteInput label="Customer" value={formState.customerName} onChange={val => handleChange('customerName', val)} suggestions={customerNames} />
            <AutoCompleteInput label="Receiving Account" value={formState.accountName} onChange={val => handleChange('accountName', val)} suggestions={accountNames} />
            <input type="number" placeholder="Amount" value={formState.amount} step="0.01" onChange={e => handleChange('amount', parseFloat(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required/>
            <input type="text" placeholder="Narration" value={formState.narration} onChange={e => handleChange('narration', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            <div className="flex items-end space-x-2 md:col-start-3">
                <button type="button" onClick={onDone} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md w-full justify-center">Cancel</button>
                <button type="submit" className="bg-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md inline-flex items-center space-x-2 transition-colors w-full justify-center">
                    <PlusIcon /> <span>{initialData ? 'Update' : 'Add'} Payment</span>
                </button>
            </div>
        </form>
    );
};

const Payments: React.FC<PaymentsProps> = ({ payments, customers, receivables, onAddPayment, onUpdatePayment, onDeletePayment }) => {
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [deletingPayment, setDeletingPayment] = useState<Payment | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);


  const columns = useMemo(() => [
    { header: 'ID', accessor: 'id' as keyof Payment },
    { header: 'Date', accessor: 'date' as keyof Payment, formatter: formatDate },
    { header: 'Customer', accessor: 'customerName' as keyof Payment },
    { header: 'Amount', accessor: 'amount' as keyof Payment, isCurrency: true },
    { header: 'Account', accessor: 'accountName' as keyof Payment },
    { header: 'Narration', accessor: 'narration' as keyof Payment },
  ], []);

  const handleAddClick = () => {
    setEditingPayment(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (payment: Payment) => {
    setEditingPayment(payment);
    setIsFormVisible(true);
  };

  const handleFormDone = () => {
    setIsFormVisible(false);
    setEditingPayment(null);
  };

  const handleDeleteConfirm = () => {
    if(deletingPayment?.id) {
        onDeletePayment(deletingPayment.id);
    }
    setDeletingPayment(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <PageHeader
        title="Payments"
        buttonText={isFormVisible ? 'Close Form' : 'Add New Payment'}
        ButtonIcon={PlusIcon}
        onButtonClick={() => isFormVisible ? handleFormDone() : handleAddClick()}
      />

      {isFormVisible && <PaymentForm customers={customers} receivables={receivables} onAddPayment={onAddPayment} onUpdatePayment={onUpdatePayment} initialData={editingPayment} onDone={handleFormDone} />}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <Table 
            columns={columns} 
            data={payments} 
            actionButtons 
            onEdit={(item) => handleEditClick(item as Payment)}
            onDelete={(item) => setDeletingPayment(item as Payment)}
        />
      </div>

      <Modal isOpen={!!deletingPayment} onClose={() => setDeletingPayment(null)} onConfirm={handleDeleteConfirm} title="Confirm Deletion">
        Are you sure you want to delete payment {deletingPayment?.id}? This action cannot be undone.
      </Modal>
    </div>
  );
};

export default Payments;
