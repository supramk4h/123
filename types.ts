export interface Farm {
  id?: string;
  name: string;
  flockNo: number;
  chickens: number;
  address: string;
  createdAt: string;
}

export interface Customer {
  id?: string;
  name: string;
  phone: string;
  address: string;
  openingBalance: number;
  createdAt: string;
}

export interface ReceivableAccount {
  id?: string;
  name: string;
  type: 'Bank' | 'Cash' | 'Expense' | string;
  balance: number;
  createdAt: string;
}

export interface Sale {
  id?: string;
  date: string;
  customerName: string;
  farmName: string;
  vehicleNo: string;
  crates: number;
  chickens: number;
  netWeight: number;
  rate: number;
  total: number;
  paymentType: 'Credit' | 'Cash' | string;
  narration: string;
}

export interface Payment {
  id?: string;
  date: string;
  customerName: string;
  amount: number;
  accountName: string;
  narration: string;
}
