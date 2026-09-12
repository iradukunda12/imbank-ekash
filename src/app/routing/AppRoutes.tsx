import { useEffect, useState, type ComponentType } from 'react';
import { useNavigation } from './useNavigation';
import { DashboardPage } from '../../features/dashboard';
import { DesignSystemPage } from '../../features/design-system';
import PlaceholderPage from '../../shared/components/PlaceholderPage';
import RouteSkeleton from '../../shared/components/RouteSkeleton';
import {
  WalletIcon,
  TransactionsIcon,
  RebateIcon,
  ReportsIcon,
  BellIcon,
  SupportIcon,
} from '../../shared/icons';

interface PlaceholderRoute {
  prefix: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
}

/**
 * Every non-dashboard nav destination that doesn't have a real feature
 * behind it yet. Matched by path prefix so /transactions/pending,
 * /transactions/completed etc. all land here too, until each gets its
 * own page.
 */
const PLACEHOLDER_ROUTES: PlaceholderRoute[] = [
  { prefix: '/accounts', title: 'Accounts', description: 'View and manage your linked accounts.', icon: WalletIcon },
  {
    prefix: '/transactions',
    title: 'Transactions',
    description: 'Browse pending, completed and failed transactions.',
    icon: TransactionsIcon,
  },
  { prefix: '/rebates', title: 'Rebates', description: 'Track and claim your vehicle rebates.', icon: RebateIcon },
  { prefix: '/reports', title: 'Reports', description: 'Export and review account activity reports.', icon: ReportsIcon },
  { prefix: '/notifications', title: 'Notifications', description: 'All your recent alerts in one place.', icon: BellIcon },
  { prefix: '/support', title: 'Help Center', description: 'Get help or contact support.', icon: SupportIcon },
];

/**
 * Minimal path-based switch backed by useNavigation's in-memory router.
 * Swap this for react-router routes later — every page below already
 * reads/writes the same `{ path, navigate }` shape a real router gives.
 */
// How long the skeleton stays up on every navigation — long enough to
// register as a loading beat, short enough not to feel sluggish.
const ROUTE_TRANSITION_MS = 450;

export const AppRoutes = () => {
  const { path } = useNavigation();
  // Comparing against the last *settled* path — rather than a plain
  // isLoading flag toggled from the effect — keeps the "start loading"
  // transition derived from render instead of an extra synchronous
  // setState inside the effect body.
  const [resolvedPath, setResolvedPath] = useState<string | null>(null);
  const isLoading = resolvedPath !== path;

  useEffect(() => {
    const timer = window.setTimeout(() => setResolvedPath(path), ROUTE_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [path]);

  if (isLoading) return <RouteSkeleton />;

  if (path.startsWith('/design-system')) return <DesignSystemPage />;
  if (path.startsWith('/dashboard')) return <DashboardPage />;

  const placeholder = PLACEHOLDER_ROUTES.find((route) => path.startsWith(route.prefix));
  if (placeholder) {
    return <PlaceholderPage title={placeholder.title} description={placeholder.description} icon={placeholder.icon} />;
  }

  return <DashboardPage />;
};

export default AppRoutes;
