export interface HighlightStat {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaTone: 'up' | 'down';
  icon: 'wallet' | 'transactions' | 'rebate' | 'streak';
}

export interface ProgressPoint {
  day: number;
  amount: number;
}

export interface ActivitySplitSlice {
  label: string;
  percentage: number;
  color: string;
}

export type PaymentStatus = 'Pending' | 'Not Started' | 'In Progress' | 'Completed';
export type PaymentPriority = 'High' | 'Medium' | 'Low';

export interface UpcomingPayment {
  id: string;
  name: string;
  dueDate: string;
  type: string;
  status: PaymentStatus;
  priority: PaymentPriority;
}
