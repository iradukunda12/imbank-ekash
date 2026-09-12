import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { PortalModalsContext } from './portal-modals-context';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import ProfileModal from '../../../features/auth/components/ProfileModal';
import ChangePasswordModal from '../../../features/auth/components/ChangePasswordModal';
import NewPaymentModal from '../../../features/payments/components/NewPaymentModal';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(() => window.innerWidth < 1024);
  const [showProfile, setShowProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNewPayment, setShowNewPayment] = useState(false);

  const closeSidebar = () => setIsCollapsed(true);

  const modals = useMemo(
    () => ({
      openProfile: () => setShowProfile(true),
      openChangePassword: () => setShowChangePassword(true),
      openNewPayment: () => setShowNewPayment(true),
    }),
    [],
  );

  return (
    <PortalModalsContext.Provider value={modals}>
      <main className="relative flex min-h-screen w-full items-start justify-start overflow-x-hidden bg-surface">
        {!isCollapsed && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/50 transition-opacity duration-300 ease-in-out lg:hidden"
            onClick={closeSidebar}
            aria-hidden
          />
        )}

        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          className="fixed left-0 top-0 z-50 h-full"
        />

        <DashboardHeader
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onOpenProfile={modals.openProfile}
          onOpenChangePassword={modals.openChangePassword}
        />

        <section
          className={
            !isCollapsed
              ? 'z-10 ml-0 min-h-screen w-full bg-surface transition-all duration-300 ease-in-out lg:ml-72 lg:w-[calc(100vw-18rem)]'
              : 'ml-0 min-h-screen w-full bg-surface transition-all duration-300 ease-in-out'
          }
        >
          <div className="w-full pt-[73px]">{children}</div>
        </section>

        <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />

        <ChangePasswordModal
          isOpen={showChangePassword}
          onClose={() => setShowChangePassword(false)}
        />

        <NewPaymentModal isOpen={showNewPayment} onClose={() => setShowNewPayment(false)} />
      </main>
    </PortalModalsContext.Provider>
  );
};

export default DashboardLayout;
