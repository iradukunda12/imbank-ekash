import { useState } from 'react';
import Card from '../../../shared/components/ui/Card';
import { cn } from '../../../shared/lib/cn';
import { ChevronDownIcon } from '../../../shared/icons';
import { progressPoints } from '../data/mockDashboardData';

const AXIS = [100, 75, 50, 25, 0];
const AXIS_MAX = 100;
const DEFAULT_FOCUS = progressPoints.findIndex((p) => p.day === 16);

const ProgressOverviewChart = () => {
  const [focus, setFocus] = useState(Math.max(0, DEFAULT_FOCUS));
  const active = progressPoints[focus];

  return (
    <Card className="flex flex-col">
      <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
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

      <div className="relative flex-1 pt-4 pb-2">
        <div className="relative flex gap-3">
          <div className="relative h-[150px] flex-1">
            {AXIS.map((tick) => (
              <div
                key={tick}
                className="absolute inset-x-0 flex items-center"
                style={{ bottom: `${(tick / AXIS_MAX) * 100}%` }}
              >
                <div className="flex-1 border-t border-dashed border-line" />
              </div>
            ))}

            <div className="absolute inset-0 flex items-end gap-[2.2%]">
              {progressPoints.map((point, i) => {
                const isActive = i === focus;
                return (
                  <button
                    key={point.day}
                    type="button"
                    onMouseEnter={() => setFocus(i)}
                    onFocus={() => setFocus(i)}
                    aria-label={`Day ${point.day}: ${point.amount}%`}
                    className="group relative flex h-full flex-1 items-end"
                  >
                    <span
                      className={cn(
                        'mx-auto block w-[58%] rounded-t-md transition-colors duration-200',
                        isActive ? 'bg-primary' : 'bg-line group-hover:bg-line-strong',
                      )}
                      style={{ height: `${(point.amount / AXIS_MAX) * 100}%` }}
                    />

                    {isActive && (
                      <>
                        <span
                          className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-brand/60"
                          style={{ bottom: `${(point.amount / AXIS_MAX) * 100}%` }}
                        />
                        <span
                          className="pointer-events-none absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand ring-2 ring-canvas"
                          style={{ bottom: `calc(${(point.amount / AXIS_MAX) * 100}% - 4px)` }}
                        />
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            <div
              className="pointer-events-none absolute -translate-x-full -translate-y-1/2 pr-3 transition-all duration-200"
              style={{
                left: `${((focus + 0.5) / progressPoints.length) * 100}%`,
                bottom: `${(active.amount / AXIS_MAX) * 100}%`,
              }}
            >
              <span className="inline-block whitespace-nowrap rounded-lg bg-primary px-2 py-1 text-[11px] font-medium text-on-brand shadow-sm">
                Day {active.day} : {active.amount}%
              </span>
            </div>
          </div>

          <div className="relative h-[150px] w-8 shrink-0">
            {AXIS.map((tick) => (
              <span
                key={tick}
                className="absolute right-0 -translate-y-1/2 text-[11px] text-ink-faint tabular-nums"
                style={{ bottom: `${(tick / AXIS_MAX) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>
        </div>

        <div className="mr-11 mt-3 flex">
          {progressPoints.map((point) => (
            <span key={point.day} className="flex-1 text-center text-[11.5px] text-ink-faint">
              Day {point.day}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProgressOverviewChart;
