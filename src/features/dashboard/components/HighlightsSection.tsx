import Card from '../../../shared/components/ui/Card';
import { cn } from '../../../shared/lib/cn';
import { WalletIcon, TransactionsIcon, RebateIcon, TrendUpIcon } from '../../../shared/icons';
import { highlightStats } from '../data/mockDashboardData';
import type { HighlightStat } from '../types/dashboard.types';
import { MiniBars, SegmentBar, GaugeRing } from './stat-visuals';

const iconMap: Record<HighlightStat['icon'], typeof WalletIcon> = {
  wallet: WalletIcon,
  transactions: TransactionsIcon,
  rebate: RebateIcon,
  streak: TrendUpIcon,
};

const DeltaChip = ({ stat }: { stat: HighlightStat }) => {
  const rising = stat.deltaTone === 'up';
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1 rounded-lg px-1.5 text-[11.5px] font-semibold tabular-nums',
        rising ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger',
      )}
    >
      <TrendUpIcon className={cn('h-3.5 w-3.5', !rising && 'rotate-180')} />
      {stat.delta}
    </span>
  );
};

const StatVisualView = ({ stat }: { stat: HighlightStat }) => {
  switch (stat.visual.type) {
    case 'bars':
      return <MiniBars points={stat.visual.points} />;
    case 'segments':
      return <SegmentBar segments={stat.visual.segments} />;
    case 'gauge':
      return <GaugeRing percent={stat.visual.percent} caption={stat.visual.caption} />;
  }
};

const HighlightsSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlightStats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <Card
              key={stat.id}
              className="flex flex-col gap-4 transition-colors duration-150 hover:border-primary"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-medium text-ink-soft">{stat.label}</p>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-ink-faint">
                  <Icon className="h-[15px] w-[15px]" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-ink">{stat.value}</p>
                  <DeltaChip stat={stat} />
                </div>
                <p className="mt-2 text-[11.5px] text-ink-faint">{stat.caption}</p>
              </div>

              <div className="mt-auto pt-1">
                <StatVisualView stat={stat} />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default HighlightsSection;
