import { useMemo, useState } from 'react';
import Card from '../../../shared/components/ui/Card';
import Badge from '../../../shared/components/ui/Badge';
import { ChevronDownIcon } from '../../../shared/icons';
import { progressPoints } from '../data/mockDashboardData';

const WIDTH = 720;
const HEIGHT = 220;
const PADDING_LEFT = 32;
const PADDING_RIGHT = 12;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 28;

const yTicks = [0, 25, 50, 75, 100];

const ProgressOverviewChart = () => {
  const [activeDay, setActiveDay] = useState(15);

  const bars = useMemo(() => {
    const plotWidth = WIDTH - PADDING_LEFT - PADDING_RIGHT;
    const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
    const bandWidth = plotWidth / progressPoints.length;
    const barWidth = bandWidth * 0.46;

    return progressPoints.map((p, i) => {
      const barHeight = (p.amount / 100) * plotHeight;
      const x = PADDING_LEFT + i * bandWidth + (bandWidth - barWidth) / 2;
      const y = PADDING_TOP + plotHeight - barHeight;
      return { ...p, x, y, width: barWidth, height: barHeight, centerX: x + barWidth / 2 };
    });
  }, []);

  const activeBar = bars.find((b) => b.day === activeDay) ?? bars[bars.length - 1];

  return (
    <Card className="lg:col-span-2">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-ink">Progress Overview</h3>
          <p className="mt-0.5 text-xs text-ink-faint">Your account activity and repayment trend.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-hover">
            Primary Account
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-hover">
            September
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full min-w-[420px]" role="img" aria-label="Progress overview chart">
          <defs>
            <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0199A6" stopOpacity="1" />
              <stop offset="100%" stopColor="#0199A6" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => {
            const y = PADDING_TOP + (HEIGHT - PADDING_TOP - PADDING_BOTTOM) * (1 - tick / 100);
            return (
              <g key={tick}>
                <line x1={PADDING_LEFT} x2={WIDTH - PADDING_RIGHT} y1={y} y2={y} stroke="#EEF2F6" strokeDasharray="4 4" />
                <text x={4} y={y + 4} fontSize="10" fill="#94A3B8">
                  {tick}
                </text>
              </g>
            );
          })}

          {bars.map((bar) => (
            <rect
              key={bar.day}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              rx={6}
              fill={bar.day === activeDay ? '#0199A6' : 'url(#barFill)'}
              opacity={bar.day === activeDay ? 1 : 0.85}
              className="cursor-pointer transition-opacity"
              onMouseEnter={() => setActiveDay(bar.day)}
            />
          ))}

          {bars.map((bar) => (
            <text key={bar.day} x={bar.centerX} y={HEIGHT - 8} fontSize="10" fill="#94A3B8" textAnchor="middle">
              {bar.day}
            </text>
          ))}
        </svg>

        {activeBar && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-[115%] rounded-lg border border-line bg-canvas px-3.5 py-2.5 shadow-xl"
            style={{
              left: `${(activeBar.centerX / WIDTH) * 100}%`,
              top: `${(activeBar.y / HEIGHT) * 100}%`,
            }}
          >
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-ink">Sep {activeBar.day}, 2026</p>
              <Badge tone="success" className="px-1.5! py-0.5!">
                +5%
              </Badge>
            </div>
            <p className="mt-1 text-[11px] text-ink-faint">Activity score {activeBar.amount}%</p>
            <div className="mt-1.5 h-1 w-24 overflow-hidden rounded-lg bg-muted">
              <div className="h-full bg-primary-500" style={{ width: `${activeBar.amount}%` }} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProgressOverviewChart;
