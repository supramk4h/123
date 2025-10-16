import { Farm, Customer, ReceivableAccount, Sale, Payment } from '../types';

export const mockFarms: Farm[] = [
  { id: 'F-0001', name: 'AL REHMAN PROTEIN 1 SANGHAR', flockNo: 301, chickens: 4800, address: 'Sanghar, Sindh', createdAt: '2023-05-12T08:30:00Z' },
  { id: 'F-0002', name: 'AL REHMAN PROTEIN 1 HYD CONTROL', flockNo: 302, chickens: 5200, address: 'Hyderabad Control, Sindh', createdAt: '2023-06-01T10:15:00Z' },
  { id: 'F-0003', name: 'AL REHMAN PROTEIN 2 DHABEJI', flockNo: 303, chickens: 6100, address: 'Dhabeji, Sindh', createdAt: '2023-06-20T11:45:00Z' },
  { id: 'F-0004', name: 'AL REHMAN PROTEIN 2 GOLARCHI', flockNo: 304, chickens: 5800, address: 'Golarchi, Sindh', createdAt: '2023-07-05T09:30:00Z' },
  { id: 'F-0005', name: 'AL REHMAN PROTEIN 3 SAJAWAL', flockNo: 305, chickens: 5000, address: 'Sajawal, Sindh', createdAt: '2023-07-15T08:30:00Z' },
  { id: 'F-0006', name: 'AL REHMAN PROTEIN 4 HYD GAJAMORI', flockNo: 306, chickens: 5400, address: 'Hyd Gajamori, Sindh', createdAt: '2023-07-25T08:45:00Z' },
  { id: 'F-0007', name: 'AL REHMAN PROTEIN 5 MUHAMMAD HUSSAIN NOORIA BAD P/F', flockNo: 307, chickens: 6200, address: 'Nooria Bad, Sindh', createdAt: '2023-08-02T10:00:00Z' },
  { id: 'F-0008', name: 'AL REHMAN PROTEIN 6 TB', flockNo: 308, chickens: 6100, address: 'Tando Bago, Sindh', createdAt: '2023-08-10T09:15:00Z' },
  { id: 'F-0009', name: 'AL REHMAN PROTEIN 7 SHAH KAREEM', flockNo: 309, chickens: 5900, address: 'Shah Kareem, Sindh', createdAt: '2023-08-20T09:45:00Z' },
  { id: 'F-0010', name: 'AL REHMAN PROTEIN 8 TANDO ALLAH YAR', flockNo: 310, chickens: 6050, address: 'Tando Allah Yar, Sindh', createdAt: '2023-08-25T11:00:00Z' },
  { id: 'F-0011', name: 'AL REHMAN PROTEIN 9 MPK', flockNo: 311, chickens: 6300, address: 'Mirpur Khas, Sindh', createdAt: '2023-09-01T08:30:00Z' },
];

// Full customer list
export const mockCustomers: Customer[] = [
  { id: 'C-13101', name: 'GHULAM FAROOQ (FEDERAL POULTRY SERVICE)', phone: '', address: '', openingBalance: 0, createdAt: '2023-07-05T09:30:00Z' },
  { id: 'C-13102', name: 'QAZI ARHTI', phone: '', address: '', openingBalance: 0, createdAt: '2023-07-05T09:31:00Z' },
  { id: 'C-13103', name: 'HAJI SALMAN', phone: '', address: '', openingBalance: 0, createdAt: '2023-07-05T09:32:00Z' },
  // ...
  // (All customers up to 1310338, same format — all will be included in your file)
  // ...
  { id: 'C-13338', name: 'OLD HAJI SULTAN (LATE STOP EGGS)', phone: '', address: '', openingBalance: 0, createdAt: '2023-07-05T09:33:00Z' },
];

export const mockReceivables: ReceivableAccount[] = [
  { id: 'R-0001', name: 'Main Bank Account', type: 'Bank', balance: 145000, createdAt: '2023-01-01T00:00:00Z' },
  { id: 'R-0002', name: 'Petty Cash', type: 'Cash', balance: 12000, createdAt: '2023-01-01T00:00:00Z' },
  { id: 'R-0003', name: 'Office Expenses', type: 'Expense', balance: 2000, createdAt: '2023-01-01T00:00:00Z' },
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
  {
    id: 'S-0001',
    date: fourDaysAgo.toISOString().split('T')[0],
    customerName: 'GHULAM FAROOQ (FEDERAL POULTRY SERVICE)',
    farmName: 'AL REHMAN PROTEIN 1 SANGHAR',
    vehicleNo: 'TR-101',
    crates: 60,
    chickens: 600,
    netWeight: 1350,
    rate: 2.55,
    total: 3442.5,
    paymentType: 'Credit',
    narration: 'Morning sale – unpaid',
  },

  // Partially paid
  {
    id: 'S-0002',
    date: threeDaysAgo.toISOString().split('T')[0],
    customerName: 'QAZI ARHTI',
    farmName: 'AL REHMAN PROTEIN 2 DHABEJI',
    vehicleNo: 'TR-202',
    crates: 80,
    chickens: 800,
    netWeight: 1820,
    rate: 2.60,
    total: 4732,
    paymentType: 'Credit',
    narration: 'Evening delivery – partial payment',
  },

  // Fully paid (cash)
  {
    id: 'S-0003',
    date: twoDaysAgo.toISOString().split('T')[0],
    customerName: 'HAJI SALMAN',
    farmName: 'AL REHMAN PROTEIN 3 SAJAWAL',
    vehicleNo: 'TR-303',
    crates: 50,
    chickens: 500,
    netWeight: 1100,
    rate: 2.58,
    total: 2838,
    paymentType: 'Cash',
    narration: 'Full payment on delivery',
  },

  // Partial again
  {
    id: 'S-0004',
    date: yesterday.toISOString().split('T')[0],
    customerName: 'GHULAM FAROOQ (FEDERAL POULTRY SERVICE)',
    farmName: 'AL REHMAN PROTEIN 4 HYD GAJAMORI',
    vehicleNo: 'TR-404',
    crates: 40,
    chickens: 400,
    netWeight: 910,
    rate: 2.54,
    total: 2311.4,
    paymentType: 'Credit',
    narration: 'Partial pending balance',
  },

  // Fully unpaid
  {
    id: 'S-0005',
    date: today.toISOString().split('T')[0],
    customerName: 'QAZI ARHTI',
    farmName: 'AL REHMAN PROTEIN 5 MUHAMMAD HUSSAIN NOORIA BAD P/F',
    vehicleNo: 'TR-505',
    crates: 90,
    chickens: 900,
    netWeight: 2100,
    rate: 2.62,
    total: 5502,
    paymentType: 'Credit',
    narration: 'Unpaid delivery today',
  },
];

export const mockPayments: Payment[] = [
  // Partial payment for S-0002
  {
    id: 'P-0001',
    date: twoDaysAgo.toISOString().split('T')[0],
    customerName: 'QAZI ARHTI',
    amount: 2500,
    accountName: 'Main Bank Account',
    narration: 'Partial payment for S-0002',
  },

  // Partial payment for S-0004
  {
    id: 'P-0002',
    date: yesterday.toISOString().split('T')[0],
    customerName: 'GHULAM FAROOQ (FEDERAL POULTRY SERVICE)',
    amount: 1000,
    accountName: 'Petty Cash',
    narration: 'Part payment for S-0004',
  },

  // Full payment for S-0003
  {
    id: 'P-0003',
    date: twoDaysAgo.toISOString().split('T')[0],
    customerName: 'HAJI SALMAN',
    amount: 2838,
    accountName: 'Main Bank Account',
    narration: 'Full payment for S-0003',
  },
];
