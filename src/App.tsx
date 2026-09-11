import DashboardLayout from './shared/layouts/DashboardLayout';
import { NavigationProvider } from './app/routing/useNavigation';
import { ToastProvider } from './shared/components/ui/toast/ToastViewport';
import AppRoutes from './app/routing/AppRoutes';

function App() {
  return (
    <NavigationProvider>
      <ToastProvider>
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      </ToastProvider>
    </NavigationProvider>
  );
}

export default App;
