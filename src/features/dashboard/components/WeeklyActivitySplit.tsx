import { useMemo } from 'react';
import Card from '../../../shared/components/ui/Card';
import { SearchIcon, ChevronRightIcon } from '../../../shared/icons';
import { activitySplit } from '../data/mockDashboardData';

const SIZE = 176;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Segment {
  label: string;
  percentage: number;
  color: string;
  dash: number;
  gap: number;
  offset: number;
}

const WeeklyActivitySplit = () => {
  // Donut chart — same visual family as Progress Overview's bars (flat
  // fills in the indigo brand palette), just a different mark shape since
  // this card is showing a proportional split rather than a trend.
  const segments = useMemo<Segment[]>(() => {
    let cumulative = 0;
    const built: Segment[] = [];
    for (const slice of activitySplit) {
      const dash = (slice.percentage / 100) * CIRCUMFERENCE;
      const gap = CIRCUMFERENCE - dash;
      const offset = -((cumulative / 100) * CIRCUMFERENCE);
      built.push({ ...slice, dash, gap, offset });
      cumulative += slice.percentage;
    }
    return built;
  }, []);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-ink">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-tint text-brand-ink">
            <SearchIcon className="h-3.5 w-3.5" />
          </span>
          Weekly Activity Split
        </h3>
        <button
          className="rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-hover hover:text-ink"
          aria-label="See details"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-center py-2">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Weekly activity split donut chart">
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="#EEF2F6" strokeWidth={STROKE} />
            {segments.map((seg) => (
              <circle
                key={seg.label}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth={STROKE}
                strokeDasharray={`${seg.dash} ${seg.gap}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="butt"
              />
            ))}
          </g>
          <text x="50%" y="47%" textAnchor="middle" fontSize="11" fill="#94A3B8">
            Total Txns
          </text>
          <text x="50%" y="60%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
            128
          </text>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
        {activitySplit.map((slice) => (
          <div key={slice.label} className="flex items-center gap-2 text-xs text-ink-soft">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
            <span className="truncate">
              {slice.label}: <span className="font-semibold text-ink">{slice.percentage}%</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeeklyActivitySplit;
