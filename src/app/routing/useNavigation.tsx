import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface NavigationValue {
  path: string;
  navigate: (path: string) => void;
}

const NavigationContext = createContext<NavigationValue | undefined>(undefined);

interface NavigationProviderProps {
  initialPath?: string;
  children: ReactNode;
}

/**
 * Lightweight in-memory "router" so nav items can highlight as active and
 * actually respond to clicks without pulling in react-router. Swap this
 * provider for a real router context later — every consumer just reads
 * `{ path, navigate }`, same shape either way.
 */
export const NavigationProvider = ({ initialPath = '/dashboard', children }: NavigationProviderProps) => {
  const [path, setPath] = useState(initialPath);

  const value = useMemo<NavigationValue>(() => ({ path, navigate: setPath }), [path]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = (): NavigationValue => {
  const ctx = useContext(NavigationContext);

  if (!ctx) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  return ctx;
};
