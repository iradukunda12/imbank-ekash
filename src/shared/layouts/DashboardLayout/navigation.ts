import type { ComponentType } from 'react';
import {
  DashboardIcon,
  WalletIcon,
  TransactionsIcon,
  RebateIcon,
  ReportsIcon,
  SupportIcon,
  BellIcon,
  GridIcon,
} from '../../icons';

export interface NavItem {
  label: string;
  path: string;
  icon?: ComponentType<{ className?: string; size?: number }>;
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const NAVIGATION: NavSection[] = [
  {
    items: [{ label: 'Dashboard', path: '/dashboard', icon: DashboardIcon }],
  },
  {
    title: 'Banking',
    items: [
      { label: 'Accounts', path: '/accounts', icon: WalletIcon },
      {
        label: 'Transactions',
        path: '/transactions',
        icon: TransactionsIcon,
        children: [
          { label: 'Pending', path: '/transactions/pending' },
          { label: 'Completed', path: '/transactions/completed' },
          { label: 'Failed', path: '/transactions/failed' },
        ],
      },
      { label: 'Rebates', path: '/rebates', icon: RebateIcon },
    ],
  },
  {
    title: 'Insights',
    items: [
      { label: 'Reports', path: '/reports', icon: ReportsIcon },
      { label: 'Notifications', path: '/notifications', icon: BellIcon },
    ],
  },
  {
    title: 'Developer',
    items: [{ label: 'Design system', path: '/design-system', icon: GridIcon }],
  },
  {
    title: 'Support',
    items: [{ label: 'Help Center', path: '/support', icon: SupportIcon }],
  },
];

export const isActivePath = (itemPath: string, currentPath: string): boolean =>
  currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

const flatten = (items: NavItem[]): NavItem[] =>
  items.flatMap((item) => [item, ...(item.children ? flatten(item.children) : [])]);

/**
 * The most specific nav item that matches the current path — a child
 * route wins over its parent. Used for breadcrumbs and the collapsed
 * "jump to a section" menu.
 */
export const findActiveItem = (currentPath: string): NavItem | undefined => {
  const all = NAVIGATION.flatMap((section) => flatten(section.items));
  const matches = all.filter((item) => isActivePath(item.path, currentPath));
  if (matches.length === 0) return undefined;
  return matches.reduce((best, item) => (item.path.length > best.path.length ? item : best));
};
