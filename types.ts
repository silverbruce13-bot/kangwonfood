
export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  GCASH = 'GCASH'
}

export enum ExpenseCategory {
  INGREDIENTS = '식자재',
  MAINTENANCE = '유지보수',
  MARKETING = '마케팅',
  UTILITIES = '공과금',
  SALARY = '인건비',
  OTHER = '기타'
}

export interface ReceiptItem {
  name: string;
  price: number;
  quantity?: number;
}

export interface Transaction {
  id: string;
  date: string; // ISO String
  type: TransactionType;
  amount: number;
  description: string;
  category: ExpenseCategory | string;
  paymentMethod: string; // Changed from enum to string to support dynamic sources
  staffName: string;
  receiptUrl?: string; // For scanned images
  items?: ReceiptItem[]; // Extracted line items
}

export interface FinancialSource {
  id: string; // Changed from enum to string
  name: string;
  balance: number;
  initialBalance: number;
}

export interface ReceiptData {
  totalAmount: number;
  merchantName: string;
  date?: string;
  items?: ReceiptItem[];
  category?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
}

export interface DailyClose {
  id: string;
  date: string;
  totalIncome: number;
  totalExpense: number;
  sourceSnapshots: {
    sourceId: string;
    sourceName: string;
    balance: number;
  }[];
  createdAt: string;
}

export interface BackupData {
  version: string;
  timestamp: string;
  data: {
    transactions: Transaction[];
    sourceDefs: { id: string; name: string; initialBalance: number }[];
    staff: Staff[];
    categories: string[];
    closingHistory: DailyClose[];
  };
}
