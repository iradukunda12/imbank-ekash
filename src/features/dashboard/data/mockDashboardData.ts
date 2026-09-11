import type { ActivitySplitSlice, HighlightStat, ProgressPoint, UpcomingPayment } from '../types/dashboard.types';

export const highlightStats: HighlightStat[] = [
  { id: 'balance', label: 'Total Balance', value: 'RWF 4.2M', delta: '+12%', deltaTone: 'up', icon: 'wallet' },
  { id: 'transactions', label: 'Transactions', value: '128', delta: '+5%', deltaTone: 'up', icon: 'transactions' },
  { id: 'rebates', label: 'Rebates Earned', value: 'RWF 88K', delta: '+10%', deltaTone: 'up', icon: 'rebate' },
  { id: 'streak', label: 'On-time Streak', value: '07 Days', delta: '+6%', deltaTone: 'up', icon: 'streak' },
];

export const progressPoints: ProgressPoint[] = [
  { day: 1, amount: 18 },
  { day: 5, amount: 30 },
  { day: 10, amount: 34 },
  { day: 15, amount: 75 },
  { day: 20, amount: 58 },
  { day: 25, amount: 80 },
  { day: 30, amount: 96 },
];

export const activitySplit: ActivitySplitSlice[] = [
  { label: 'Transfers', percentage: 45, color: '#0199A6' },
  { label: 'Bill Payments', percentage: 25, color: '#45BEC7' },
  { label: 'Rebate Claims', percentage: 20, color: '#024A51' },
  { label: 'Top Ups', percentage: 10, color: '#93DDE3' },
];

export const upcomingPayments: UpcomingPayment[] = [
  {
    id: 'p1',
    name: 'Business Loan Installment',
    dueDate: '2026-09-18',
    type: 'Repayment',
    status: 'Pending',
    priority: 'High',
  },
  {
    id: 'p2',
    name: 'Electricity Bill (REG)',
    dueDate: '2026-09-20',
    type: 'Bill',
    status: 'Not Started',
    priority: 'Medium',
  },
  {
    id: 'p3',
    name: 'Q3 Rebate Claim Review',
    dueDate: '2026-09-22',
    type: 'Rebate',
    status: 'In Progress',
    priority: 'High',
  },
];
