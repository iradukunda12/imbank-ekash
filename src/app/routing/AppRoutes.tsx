import { useNavigation } from './useNavigation';
import { DashboardPage } from '../../features/dashboard';
import { DesignSystemPage } from '../../features/design-system';

/**
 * Minimal path-based switch backed by useNavigation's in-memory router.
 * Swap this for react-router routes later — every page below already
 * reads/writes the same `{ path, navigate }` shape a real router gives.
 */
export const AppRoutes = () => {
  const { path } = useNavigation();

  if (path.startsWith('/design-system')) return <DesignSystemPage />;

  return <DashboardPage />;
};

export default AppRoutes;
