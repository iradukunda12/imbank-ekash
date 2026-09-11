import { useAuth } from '../../auth/hooks/useAuth';
import { usePortalModals } from '../../../shared/layouts/DashboardLayout/usePortalModals';
import { DropdownMenu, type MenuItem } from '../../../shared/components/ui/DropdownMenu';
import { ColumnsIcon, DownloadIcon, MoreVerticalIcon, RefreshIcon, WalletIcon } from '../../../shared/icons';
import HighlightsSection from '../components/HighlightsSection';
import ProgressOverviewChart from '../components/ProgressOverviewChart';
import WeeklyActivitySplit from '../components/WeeklyActivitySplit';
import UpcomingPaymentsTable from '../components/UpcomingPaymentsTable';
import QuickActionsCard from '../components/QuickActionsCard';
import RangePicker from '../components/RangePicker';

const DashboardPage = () => {
  const { user } = useAuth();
  const { openNewPayment } = usePortalModals();

  const firstName = user.name.split(' ')[0];

  const overviewMenu: MenuItem[] = [
    { kind: 'label', id: 'dash', label: 'Dashboard' },
    { id: 'refresh', label: 'Refresh all widgets', icon: RefreshIcon },
    { id: 'layout', label: 'Customise layout', icon: ColumnsIcon },
    { kind: 'separator', id: 'sep' },
    { id: 'payment', label: 'New payment', icon: WalletIcon, onSelect: openNewPayment },
    { id: 'export', label: 'Export overview (PDF)', icon: DownloadIcon },
  ];

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[25px]">
            Hello, {firstName} <span aria-hidden>👋</span>
          </h1>
          <p className="mt-1 text-[13px] text-ink-soft">
            Here&apos;s where your account and rebate claims stand today, {firstName}.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <RangePicker />
          <DropdownMenu
            label="Dashboard options"
            items={overviewMenu}
            triggerClassName="inline-flex h-8.5 w-8.5 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-hover hover:text-ink"
            trigger={<MoreVerticalIcon className="h-4 w-4" />}
          />
        </div>
      </header>

      <HighlightsSection />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProgressOverviewChart />
        <WeeklyActivitySplit />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <UpcomingPaymentsTable />
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default DashboardPage;
