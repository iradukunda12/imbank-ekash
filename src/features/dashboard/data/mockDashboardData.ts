import type { ActivitySplitSlice, HighlightStat, ProgressPoint, UpcomingPayment } from '../types/dashboard.types';

export const highlightStats: HighlightStat[] = [
  {
    id: 'balance',
    label: 'Total Balance',
    value: 'RWF 4.2M',
    delta: '+12%',
    deltaTone: 'up',
    caption: 'Across all linked accounts',
    icon: 'wallet',
    visual: { type: 'bars', points: [2.8, 3.1, 3.4, 3.3, 3.9, 4.2] },
  },
  {
    id: 'transactions',
    label: 'Transactions',
    value: '128',
    delta: '+5%',
    deltaTone: 'up',
    caption: 'By type this month',
    icon: 'transactions',
    // Same breakdown shown in Weekly Activity Split, rolled up here.
    visual: {
      type: 'segments',
      segments: [
        { label: 'Transfers', percentage: 45, color: '#223D94' },
        { label: 'Bill Payments', percentage: 25, color: '#5574D8' },
        { label: 'Claims', percentage: 20, color: '#152559' },
        { label: 'Top Ups', percentage: 10, color: '#90A5E6' },
      ],
    },
  },
  {
    id: 'rebates',
    label: 'Claimed',
    value: 'RWF 88K',
    delta: '+10%',
    deltaTone: 'up',
    caption: 'Year to date',
    icon: 'rebate',
    visual: { type: 'bars', points: [42, 51, 58, 66, 79, 88] },
  },
  {
    id: 'streak',
    label: 'On-time Streak',
    value: '07 Days',
    delta: '+6%',
    deltaTone: 'up',
    caption: '7 of 30 days on-time this month',
    icon: 'streak',
    visual: { type: 'gauge', percent: 23, caption: '23% through this month' },
  },
];

export const progressPoints: ProgressPoint[] = [
  { day: 1, amount: 18 },
  { day: 4, amount: 24 },
  { day: 7, amount: 32 },
  { day: 10, amount: 34 },
  { day: 13, amount: 48 },
  { day: 16, amount: 75 },
  { day: 19, amount: 68 },
  { day: 22, amount: 58 },
  { day: 25, amount: 74 },
  { day: 27, amount: 85 },
  { day: 29, amount: 92 },
  { day: 30, amount: 96 },
];

export const activitySplit: ActivitySplitSlice[] = [
  { label: 'Transfers', percentage: 45, color: '#223D94' },
  { label: 'Bill Payments', percentage: 25, color: '#5574D8' },
  { label: 'Rebate Claims', percentage: 20, color: '#152559' },
  { label: 'Top Ups', percentage: 10, color: '#90A5E6' },
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
    name: 'Q3 Claim Review',
    dueDate: '2026-09-22',
    type: 'Claim',
    status: 'In Progress',
    priority: 'High',
  },
];
