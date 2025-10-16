import { Farm, Customer, ReceivableAccount, Sale, Payment } from '../types';

export const mockFarms: Farm[] = [
  { id: 'F-0001', name: 'AL REHMAN FARM 1', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0002', name: 'AL REHMAN FARM 2', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0003', name: 'AL REHMAN FARM 3', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0004', name: 'AL REHMAN FARM 4', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0005', name: 'AL REHMAN FARM 5', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0006', name: 'AL REHMAN FARM 6', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0007', name: 'AL REHMAN FARM 7', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0008', name: 'AL REHMAN FARM 8', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0009', name: 'AL REHMAN FARM 9', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'F-0010', name: 'AL REHMAN FARM 10', flockNo: 0, chickens: 0, address: '', createdAt: '2025-01-01T00:00:00Z' },
];

export const mockCustomers: Customer[] = [
  { id: 'C-0001', name: 'AHMAD TRADERS ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-05T00:00:00Z' },
  { id: 'C-0002', name: 'HASSAN BROILERS ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-06T00:00:00Z' },
  { id: 'C-0003', name: 'USMAN POULTRY ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-07T00:00:00Z' },
  { id: 'C-0004', name: 'KHALID FEED SUPPLIERS ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-08T00:00:00Z' },
  { id: 'C-0005', name: 'TAHIR CHICKEN CENTER ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-09T00:00:00Z' },
  { id: 'C-0006', name: 'JAVED POULTRY ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-10T00:00:00Z' },
  { id: 'C-0007', name: 'RAFIQ TRADERS ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-11T00:00:00Z' },
  { id: 'C-0008', name: 'IMRAN FEED STORE ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-12T00:00:00Z' },
  { id: 'C-0009', name: 'ASIF CHICKEN SUPPLY ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-13T00:00:00Z' },
  { id: 'C-0010', name: 'NAVEED POULTRY DEALERS ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-14T00:00:00Z' },
  { id: 'C-0011', name: 'SAJID BROILER POINT ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-15T00:00:00Z' },
  { id: 'C-0012', name: 'WAQAR CHICKEN HOUSE ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-16T00:00:00Z' },
  { id: 'C-0013', name: 'MAZHAR SUPPLY CO ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-17T00:00:00Z' },
  { id: 'C-0014', name: 'SHAHID FEED POINT ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-18T00:00:00Z' },
  { id: 'C-0015', name: 'YASIR TRADERS ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-19T00:00:00Z' },
  { id: 'C-0016', name: 'BILAL BROILERS ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-20T00:00:00Z' },
  { id: 'C-0017', name: 'ZUBAIR FEED AGENCY ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-21T00:00:00Z' },
  { id: 'C-0018', name: 'ADEEL POULTRY SERVICES ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-22T00:00:00Z' },
  { id: 'C-0019', name: 'FAHAD CHICKEN SUPPLIERS ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-23T00:00:00Z' },
  { id: 'C-0020', name: 'HAMZA FOOD POINT ARTI', phone: '', address: '', openingBalance: 0, createdAt: '2025-01-24T00:00:00Z' },
];

export const mockReceivables: ReceivableAccount[] = [
  { id: 'R-0001', name: 'Main Bank Account', type: 'Bank', balance: 0, createdAt: '2025-01-01T00:00:00Z' },
  { id: 'R-0002', name: 'Petty Cash', type: 'Cash', balance: 0, createdAt: '2025-01-01T00:00:00Z' },
  { id: 'R-0003', name: 'Office Expenses', type: 'Expense', balance: 0, createdAt: '2025-01-01T00:00:00Z' },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

export const mockSales: Sale[] = [
  { id: 'S-0001', date: twoDaysAgo.toISOString().split('T')[0], customerName: 'AHMAD TRADERS ARTI', farmName: 'AL REHMAN FARM 1', vehicleNo: 'TR-101', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Credit', narration: '' },
  { id: 'S-0002', date: yesterday.toISOString().split('T')[0], customerName: 'HASSAN BROILERS ARTI', farmName: 'AL REHMAN FARM 2', vehicleNo: 'TR-102', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Cash', narration: '' },
  { id: 'S-0003', date: today.toISOString().split('T')[0], customerName: 'USMAN POULTRY ARTI', farmName: 'AL REHMAN FARM 3', vehicleNo: 'TR-103', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Credit', narration: '' },
  { id: 'S-0004', date: today.toISOString().split('T')[0], customerName: 'KHALID FEED SUPPLIERS ARTI', farmName: 'AL REHMAN FARM 4', vehicleNo: 'TR-104', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Cash', narration: '' },
  { id: 'S-0005', date: yesterday.toISOString().split('T')[0], customerName: 'TAHIR CHICKEN CENTER ARTI', farmName: 'AL REHMAN FARM 5', vehicleNo: 'TR-105', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Credit', narration: '' },
  { id: 'S-0006', date: yesterday.toISOString().split('T')[0], customerName: 'JAVED POULTRY ARTI', farmName: 'AL REHMAN FARM 6', vehicleNo: 'TR-106', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Cash', narration: '' },
  { id: 'S-0007', date: today.toISOString().split('T')[0], customerName: 'RAFIQ TRADERS ARTI', farmName: 'AL REHMAN FARM 7', vehicleNo: 'TR-107', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Credit', narration: '' },
  { id: 'S-0008', date: today.toISOString().split('T')[0], customerName: 'IMRAN FEED STORE ARTI', farmName: 'AL REHMAN FARM 8', vehicleNo: 'TR-108', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Cash', narration: '' },
  { id: 'S-0009', date: twoDaysAgo.toISOString().split('T')[0], customerName: 'ASIF CHICKEN SUPPLY ARTI', farmName: 'AL REHMAN FARM 9', vehicleNo: 'TR-109', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Credit', narration: '' },
  { id: 'S-0010', date: today.toISOString().split('T')[0], customerName: 'HAMZA FOOD POINT ARTI', farmName: 'AL REHMAN FARM 10', vehicleNo: 'TR-110', crates: 0, chickens: 0, netWeight: 0, rate: 0, total: 0, paymentType: 'Cash', narration: '' },
];

export const mockPayments: Payment[] = [
  { id: 'P-0001', date: yesterday.toISOString().split('T')[0], customerName: 'AHMAD TRADERS ARTI', amount: 0, accountName: 'Main Bank Account', narration: '' },
  { id: 'P-0002', date: today.toISOString().split('T')[0], customerName: 'USMAN POULTRY ARTI', amount: 0, accountName: 'Petty Cash', narration: '' },
  { id: 'P-0003', date: today.toISOString().split('T')[0], customerName: 'HASSAN BROILERS ARTI', amount: 0, accountName: 'Main Bank Account', narration: '' },
  { id: 'P-0004', date: twoDaysAgo.toISOString().split('T')[0], customerName: 'IMRAN FEED STORE ARTI', amount: 0, accountName: 'Petty Cash', narration: '' },
];
