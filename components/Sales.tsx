import React, { useState, useMemo, useEffect } from 'react';
import { Sale, Customer, Farm } from '../types';
import { PageHeader } from './common/PageHeader';
import { Table } from './common/Table';
import { AutoCompleteInput } from './common/AutoCompleteInput';
import { PlusIcon } from './Icons';
import { formatDate } from '../data/utils';
import { Modal } from './common/Modal';

interface SalesProps {
  sales: Sale[];
  customers: Customer[];
  farms: Farm[];
  onAddSale: (sale: Omit<Sale, 'id'>) => void;
  onUpdateSale: (sale: Sale) => void;
  onDeleteSale: (id: string) => void;
}

const SaleForm: React.FC<Omit<SalesProps, 'sales' | 'onDeleteSale'> & { initialData?: Sale | null; onDone: () => void; }> = ({ customers, farms, onAddSale, onUpdateSale, initialData, onDone }) => {
    const initialState = {
        date: new Date().toISOString().split('T')[0],
        customerName: '', farmName: '', vehicleNo: '', crates: 0, chickens: 0,
        netWeight: 0, rate: 0, paymentType: 'Credit', narration: '',
    };
    const [formState, setFormState] = useState(initialData || initialState);

    useEffect(() => {
        setFormState(initialData || initialState);
    }, [initialData]);

    const customerNames = useMemo(() => customers.map(c => c.name), [customers]);
    const farmNames = useMemo(() => farms.map(f => f.name), [farms]);
    
    const total = useMemo(() => (formState.netWeight || 0) * (formState.rate || 0), [formState.netWeight, formState.rate]);

    const handleChange = (field: keyof Omit<Sale, 'id' | 'total'>, value: any) => {
        setFormState(prev => ({...prev, [field]: value}));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const saleData = { ...formState, total };
        if (initialData?.id) {
            onUpdateSale(saleData as Sale);
        } else {
            onAddSale(saleData);
        }
        onDone();
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-md bg-gray-50 mb-6">
            <input type="date" value={formState.date} onChange={e => handleChange('date', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required/>
            <AutoCompleteInput label="Customer" value={formState.customerName} onChange={val => handleChange('customerName', val)} suggestions={customerNames} />
            <AutoCompleteInput label="Farm" value={formState.farmName} onChange={val => handleChange('farmName', val)} suggestions={farmNames} />
            <input type="text" placeholder="Vehicle No." value={formState.vehicleNo} onChange={e => handleChange('vehicleNo', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            <input type="number" placeholder="Crates" value={formState.crates} onChange={e => handleChange('crates', parseFloat(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            <input type="number" placeholder="Chickens" value={formState.chickens} onChange={e => handleChange('chickens', parseFloat(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            <input type="number" placeholder="Net Weight" value={formState.netWeight} onChange={e => handleChange('netWeight', parseFloat(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required/>
            <input type="number" placeholder="Rate" value={formState.rate} step="0.01" onChange={e => handleChange('rate', parseFloat(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required/>
            <select value={formState.paymentType} onChange={e => handleChange('paymentType', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Credit</option>
                <option>Cash</option>
            </select>
            <input type="text" placeholder="Narration" value={formState.narration} onChange={e => handleChange('narration', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            <div className="flex items-end">
                <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            </div>
            <div className="flex items-end space-x-2">
                <button type="button" onClick={onDone} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md w-full justify-center">Cancel</button>
                <button type="submit" className="bg-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md inline-flex items-center space-x-2 transition-colors w-full justify-center">
                    <PlusIcon /> <span>{initialData ? 'Update' : 'Add'} Sale</span>
                </button>
            </div>
        </form>
    );
};


const Sales: React.FC<SalesProps> = ({ sales, customers, farms, onAddSale, onUpdateSale, onDeleteSale }) => {
    const [editingSale, setEditingSale] = useState<Sale | null>(null);
    const [deletingSale, setDeletingSale] = useState<Sale | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    const columns = useMemo(() => [
        { header: 'ID', accessor: 'id' as keyof Sale },
        { header: 'Date', accessor: 'date' as keyof Sale, formatter: formatDate },
        { header: 'Customer', accessor: 'customerName' as keyof Sale },
        { header: 'Net Weight', accessor: 'netWeight' as keyof Sale },
        { header: 'Rate', accessor: 'rate' as keyof Sale, isCurrency: true },
        { header: 'Total', accessor: 'total' as keyof Sale, isCurrency: true },
        { header: 'Payment', accessor: 'paymentType' as keyof Sale },
    ], []);
    
    const handleAddClick = () => {
        setEditingSale(null);
        setIsFormVisible(true);
    };

    const handleEditClick = (sale: Sale) => {
        setEditingSale(sale);
        setIsFormVisible(true);
    };

    const handleFormDone = () => {
        setIsFormVisible(false);
        setEditingSale(null);
    };

    const handleDeleteConfirm = () => {
        if(deletingSale?.id) {
            onDeleteSale(deletingSale.id);
        }
        setDeletingSale(null);
    };

    return (
        <div className="p-4 md:p-6 space-y-4">
            <PageHeader 
                title="Sales" 
                buttonText={isFormVisible ? "Close Form" : "Add New Sale"}
                ButtonIcon={PlusIcon}
                onButtonClick={() => isFormVisible ? handleFormDone() : handleAddClick()}
            />

            {isFormVisible && <SaleForm customers={customers} farms={farms} onAddSale={onAddSale} onUpdateSale={onUpdateSale} initialData={editingSale} onDone={handleFormDone} />}
            
            <div className="bg-white p-4 rounded-lg shadow-md">
                <Table 
                    columns={columns} 
                    data={sales} 
                    actionButtons 
                    onEdit={(item) => handleEditClick(item as Sale)} 
                    onDelete={(item) => setDeletingSale(item as Sale)}
                />
            </div>
            
            <Modal isOpen={!!deletingSale} onClose={() => setDeletingSale(null)} onConfirm={handleDeleteConfirm} title="Confirm Deletion">
                Are you sure you want to delete sale {deletingSale?.id}? This action cannot be undone.
            </Modal>
        </div>
    );
};

export default Sales;
