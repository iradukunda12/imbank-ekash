export type StatVisual =
  | { type: 'bars'; points: number[] }
  | { type: 'segments'; segments: { label: string; percentage: number; color: string }[] }
  | { type: 'gauge'; percent: number; caption: string };

export interface HighlightStat {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaTone: 'up' | 'down';
  caption: string;
  icon: 'wallet' | 'transactions' | 'rebate' | 'streak';
  visual: StatVisual;
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
