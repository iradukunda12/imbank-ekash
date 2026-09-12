import { useEffect, useState } from 'react';
import DashboardLayout from './shared/layouts/DashboardLayout';
import { NavigationProvider, useNavigation } from './app/routing/useNavigation';
import { ToastProvider } from './shared/components/ui/toast/ToastViewport';
import AppRoutes from './app/routing/AppRoutes';
import { LoadingScreen } from './shared/components/LoadingScreen';
import { LoginPage } from './features/auth/pages/LoginPage';
import { ForgotPasswordPage } from './features/auth/pages/ForgotPasswordPage';

/** How long the boot screen stays up before the dashboard mounts. */
const BOOT_DURATION_MS = 3000;

/**
 * Route-driven auth gate: '/login' and '/forgot-password' show their own
 * full-screen flows (no sidebar/header — the person isn't in the app
 * yet), everything else shows the dashboard shell. `LoginPage` /
 * `VerifyOtpPage` navigate to '/dashboard' themselves once sign-in
 * completes, so this is the only place that needs to know what "signed
 * in" means.
 */
const AppShell = () => {
  const { path } = useNavigation();

  if (path === '/login' || path.startsWith('/login/')) {
    return <LoginPage />;
  }

  if (path === '/forgot-password' || path.startsWith('/forgot-password/')) {
    return <ForgotPasswordPage />;
  }

  return (
    <DashboardLayout>
      <AppRoutes />
    </DashboardLayout>
  );
};

function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), BOOT_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Nothing else is mounted yet during boot, so this is the entire page —
  // there's no sidebar/header underneath it to be covered.
  if (isBooting) {
    return <LoadingScreen />;
  }

  return (
    <NavigationProvider initialPath="/login">
      <ToastProvider>
        <AppShell />
      </ToastProvider>
    </NavigationProvider>
  );
}

export default App;
