import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import { SearchIcon, WalletIcon, TransactionsIcon, RebateIcon, ReportsIcon, ChevronRightIcon } from '../../../shared/icons';
import { usePortalModals } from '../../../shared/layouts/DashboardLayout';

const quickIcons = [WalletIcon, TransactionsIcon, RebateIcon, ReportsIcon];

const QuickActionsCard = () => {
  const { openNewPayment } = usePortalModals();

  return (
    <Card>
      <h3 className="text-base font-bold text-ink">Quick Actions</h3>
      <p className="mt-0.5 text-xs text-ink-faint">Manage your money in a couple of taps.</p>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary-200 bg-brand-tint/40 px-3 py-2.5">
        <SearchIcon className="h-4 w-4 text-primary-400" />
        <input
          type="text"
          placeholder="Search an account or service..."
          className="w-full bg-transparent text-sm text-ink-soft placeholder:text-ink-faint focus:outline-none"
        />
      </div>

      <p className="mt-3 text-xs text-ink-faint">
        Recent: <span className="font-medium text-ink-soft">Rebate Claim - Sept 2026</span>
      </p>

      <div className="mt-4 flex items-center gap-2.5">
        {quickIcons.map((Icon, index) => (
          <span
            key={index}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600"
          >
            <Icon className="h-[18px] w-[18px]" />
          </span>
        ))}
        <button
          type="button"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink-faint hover:bg-hover"
          aria-label="More actions"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex gap-3">
        <Button variant="secondary" className="flex-1">
          View History
        </Button>
        <Button variant="dark" className="flex-1" onClick={openNewPayment}>
          Send Money
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default QuickActionsCard;
