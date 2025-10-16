import { Farm, Customer, ReceivableAccount, Sale, Payment } from '../types';

export const mockFarms: Farm[] = [
  { id: 'F-0001', name: 'AL REHMAN PROTEIN FARM 1', flockNo: 301, chickens: 4800, address: '0', createdAt: '2025-05-12T08:30:00Z' },
  { id: 'F-0002', name: 'AL REHMAN PROTEIN FARM 2', flockNo: 302, chickens: 5200, address: '0', createdAt: '2025-06-01T10:15:00Z' },
  { id: 'F-0003', name: 'AL REHMAN PROTEIN FARM 3', flockNo: 303, chickens: 6100, address: '0', createdAt: '2025-06-20T11:45:00Z' },
];

export const mockCustomers: Customer[] = [
  { id: 'C-0001', name: 'AOUN ARTI', phone: '0300-5551111', address: '0', openingBalance: 0, createdAt: '2025-07-05T09:30:00Z' },
  { id: 'C-0002', name: 'SHAMS ARTI', phone: '0301-4442222', address: '0', openingBalance: 2000, createdAt: '2025-07-10T09:45:00Z' },
  { id: 'C-0003', name: 'RASHID ARTI', phone: '0302-3339999', address: '0', openingBalance: -500, createdAt: '2025-07-20T10:00:00Z' },
];

export const mockReceivables: ReceivableAccount[] = [
  { id: 'R-0001', name: 'Main Bank Account', type: 'Bank', balance: 145000, createdAt: '2025-01-01T00:00:00Z' },
  { id: 'R-0002', name: 'Petty Cash', type: 'Cash', balance: 12000, createdAt: '2025-01-01T00:00:00Z' },
  { id: 'R-0003', name: 'Office Expenses', type: 'Expense', balance: 2000, createdAt: '2025-01-01T00:00:00Z' },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
const fourDaysAgo = new Date(today);
fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

export const mockSales: Sale[] = [
  // Fully unpaid (due)
  { id: 'S-0001', date: fourDaysAgo.toISOString().split('T')[0], customerName: 'AOUN ARTI', farmName: 'AL REHMAN PROTEIN FARM 1', vehicleNo: 'TR-101', crates: 60, chickens: 600, netWeight: 1350, rate: 2.55, total: 3442.5, paymentType: 'Credit', narration: 'Morning sale – unpaid' },

  // Partially paid
  { id: 'S-0002', date: threeDaysAgo.toISOString().split('T')[0], customerName: 'SHAMS ARTI', farmName: 'AL REHMAN PROTEIN FARM 2', vehicleNo: 'TR-202', crates: 80, chickens: 800, netWeight: 1820, rate: 2.60, total: 4732, paymentType: 'Credit', narration: 'Evening delivery – partial payment' },

  // Fully paid (cash)
  { id: 'S-0003', date: twoDaysAgo.toISOString().split('T')[0], customerName: 'RASHID ARTI', farmName: 'AL REHMAN PROTEIN FARM 3', vehicleNo: 'TR-303', crates: 50, chickens: 500, netWeight: 1100, rate: 2.58, total: 2838, paymentType: 'Cash', narration: 'Full payment on delivery' },

  // Partial again
  { id: 'S-0004', date: yesterday.toISOString().split('T')[0], customerName: 'AOUN ARTI', farmName: 'AL REHMAN PROTEIN FARM 2', vehicleNo: 'TR-404', crates: 40, chickens: 400, netWeight: 910, rate: 2.54, total: 2311.4, paymentType: 'Credit', narration: 'Partial pending balance' },

  // Fully unpaid
  { id: 'S-0005', date: today.toISOString().split('T')[0], customerName: 'SHAMS ARTI', farmName: 'AL REHMAN PROTEIN FARM 3', vehicleNo: 'TR-505', crates: 90, chickens: 900, netWeight: 2100, rate: 2.62, total: 5502, paymentType: 'Credit', narration: 'Unpaid delivery today' },
];

export const mockPayments: Payment[] = [
  // Partial payment for S-0002
  { id: 'P-0001', date: twoDaysAgo.toISOString().split('T')[0], customerName: 'SHAMS ARTI', amount: 2500, accountName: 'Main Bank Account', narration: 'Partial payment for S-0002' },

  // Partial payment for S-0004
  { id: 'P-0002', date: yesterday.toISOString().split('T')[0], customerName: 'AOUN ARTI', amount: 1000, accountName: 'Petty Cash', narration: 'Part payment for S-0004' },

  // Full payment for S-0003
  { id: 'P-0003', date: twoDaysAgo.toISOString().split('T')[0], customerName: 'RASHID ARTI', amount: 2838, accountName: 'Main Bank Account', narration: 'Full payment for S-0003' },
];
