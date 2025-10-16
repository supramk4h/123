import { Farm, Customer, ReceivableAccount, Sale, Payment } from '../types';

export const mockFarms: Farm[] = [
  { id: 'F-0001', name: 'AL REHMAN PROTEIN FARM 1', flockNo: 101, chickens: 5000, address: '123 Farm Road', createdAt: '2025-01-10T10:00:00Z' },
  { id: 'F-0002', name: 'AL REHMAN PROTEIN FARM 2', flockNo: 202, chickens: 7500, address: '456 Meadow Lane', createdAt: '2025-02-15T11:30:00Z' },
];

export const mockCustomers: Customer[] = [
  { id: 'C-0001', name: 'BISMILLAH CHICKEN CENTER', phone: '555-1234', address: '1 Market St', openingBalance: 1500, createdAt: '2025-01-20T09:00:00Z' },
  { id: 'C-0002', name: 'PAK POULTRY SUPPLIERS', phone: '555-5678', address: '2 Metro Ave', openingBalance: 0, createdAt: '2025-03-05T14:00:00Z' },
  { id: 'C-0003', name: 'FRESH FOOD POINT', phone: '555-8765', address: '3 Side St', openingBalance: -250, createdAt: '2025-04-01T16:45:00Z' },
];

export const mockReceivables: ReceivableAccount[] = [
  { id: 'R-0001', name: 'Main Bank Account', type: 'Bank', balance: 125000, createdAt: '2025-01-01T00:00:00Z' },
  { id: 'R-0002', name: 'Petty Cash', type: 'Cash', balance: 5000, createdAt: '2025-01-01T00:00:00Z' },
  { id: 'R-0003', name: 'Office Expenses', type: 'Expense', balance: 0, createdAt: '2025-01-01T00:00:00Z' },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

export const mockSales: Sale[] = [
  { id: 'S-0001', date: twoDaysAgo.toISOString().split('T')[0], customerName: 'BISMILLAH CHICKEN CENTER', farmName: 'AL REHMAN PROTEIN FARM 1', vehicleNo: 'TR-123', crates: 50, chickens: 500, netWeight: 1200, rate: 2.50, total: 3000, paymentType: 'Credit', narration: 'Morning delivery' },
  { id: 'S-0002', date: yesterday.toISOString().split('T')[0], customerName: 'PAK POULTRY SUPPLIERS', farmName: 'AL REHMAN PROTEIN FARM 2', vehicleNo: 'TR-456', crates: 70, chickens: 700, netWeight: 1600, rate: 2.55, total: 4080, paymentType: 'Credit', narration: '' },
  { id: 'S-0003', date: yesterday.toISOString().split('T')[0], customerName: 'FRESH FOOD POINT', farmName: 'AL REHMAN PROTEIN FARM 1', vehicleNo: 'TR-789', crates: 20, chickens: 200, netWeight: 450, rate: 2.60, total: 1170, paymentType: 'Cash', narration: 'Urgent order' },
  { id: 'S-0004', date: today.toISOString().split('T')[0], customerName: 'BISMILLAH CHICKEN CENTER', farmName: 'AL REHMAN PROTEIN FARM 2', vehicleNo: 'TR-123', crates: 30, chickens: 300, netWeight: 680, rate: 2.52, total: 1713.6, paymentType: 'Credit', narration: '' },
];

export const mockPayments: Payment[] = [
  { id: 'P-0001', date: yesterday.toISOString().split('T')[0], customerName: 'BISMILLAH CHICKEN CENTER', amount: 2000, accountName: 'Main Bank Account', narration: 'Partial payment for S-0001' },
];
