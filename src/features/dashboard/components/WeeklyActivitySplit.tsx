import { useMemo } from 'react';
import Card from '../../../shared/components/ui/Card';
import { SearchIcon, ChevronRightIcon } from '../../../shared/icons';
import { activitySplit } from '../data/mockDashboardData';

const SIZE = 176;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const WeeklyActivitySplit = () => {
  const segments = useMemo(() => {
    let cumulative = 0;
    return activitySplit.map((slice) => {
      const dash = (slice.percentage / 100) * CIRCUMFERENCE;
      const gap = CIRCUMFERENCE - dash;
      const offset = -((cumulative / 100) * CIRCUMFERENCE);
      cumulative += slice.percentage;
      return { ...slice, dash, gap, offset };
    });
  }, []);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <SearchIcon className="h-3.5 w-3.5" />
          </span>
          Weekly Activity Split
        </h3>
        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50" aria-label="See details">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-center py-2">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="#F1F5F9" strokeWidth={STROKE} />
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
          <div key={slice.label} className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
            <span className="truncate">
              {slice.label}: <span className="font-semibold text-slate-700">{slice.percentage}%</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeeklyActivitySplit;
