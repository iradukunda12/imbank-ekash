import type { SelectOption } from '../../../shared/components/ui/select-option';

export const DEALER_OPTIONS: SelectOption[] = [
  { value: 'northwind', label: 'Northwind Retail Group', hint: 'DLR-0021', group: 'Kigali' },
  { value: 'veritas', label: 'Veritas Motors', hint: 'DLR-0034', group: 'Kigali' },
  { value: 'plateau', label: 'Plateau Auto Traders', hint: 'DLR-0058', group: 'Huye' },
  { value: 'lakeside', label: 'Lakeside Vehicle Imports', hint: 'DLR-0067', group: 'Rubavu' },
  { value: 'summit', label: 'Summit Dealership Ltd', hint: 'DLR-0072', group: 'Huye', disabled: true },
];

export const CLAIM_TYPE_OPTIONS: SelectOption[] = [
  { value: 'purchase', label: 'Purchase rebate' },
  { value: 'trade-in', label: 'Trade-in rebate' },
  { value: 'fleet', label: 'Fleet rebate' },
  { value: 'loyalty', label: 'Loyalty rebate' },
];

export const MINISTRY_OPTIONS: SelectOption[] = [
  { value: 'psc', label: 'Public Service Commission', hint: 'PSC', group: 'Commissions' },
  { value: 'rra', label: 'Rwanda Revenue Authority', hint: 'RRA', group: 'Agencies' },
  { value: 'mineco', label: 'Ministry of Finance & Economic Planning', hint: 'MINECOFIN', group: 'Ministries' },
  { value: 'minaloc', label: 'Ministry of Local Government', hint: 'MINALOC', group: 'Ministries' },
];
