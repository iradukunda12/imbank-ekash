import Card from '../../../shared/components/ui/Card';
import Badge from '../../../shared/components/ui/Badge';
import { WalletIcon, TransactionsIcon, RebateIcon, TrendUpIcon } from '../../../shared/icons';
import { highlightStats } from '../data/mockDashboardData';
import type { HighlightStat } from '../types/dashboard.types';

const iconMap: Record<HighlightStat['icon'], typeof WalletIcon> = {
  wallet: WalletIcon,
  transactions: TransactionsIcon,
  rebate: RebateIcon,
  streak: TrendUpIcon,
};

const HighlightsSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlightStats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <Card key={stat.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <Badge tone="success">{stat.delta}</Badge>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default HighlightsSection;
