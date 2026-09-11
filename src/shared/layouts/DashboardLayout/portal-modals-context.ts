import { createContext, useContext } from 'react';

export interface PortalModals {
  openProfile: () => void;
  openChangePassword: () => void;
  openNewPayment: () => void;
}

export const PortalModalsContext = createContext<PortalModals | undefined>(undefined);

export const usePortalModals = (): PortalModals => {
  const ctx = useContext(PortalModalsContext);

  if (!ctx) {
    throw new Error('usePortalModals must be used within a DashboardLayout');
  }

  return ctx;
};
