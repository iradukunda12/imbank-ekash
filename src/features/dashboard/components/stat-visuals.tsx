/**
 * Small per-card visuals for the stat cards — same "icon badge + value +
 * delta chip + mini visual" layout family as the rest of the dashboard,
 * just three different compact chart shapes so the row doesn't feel
 * repetitive: a tiny bar sparkline, a stacked segment bar, and a gauge ring.
 */

interface MiniBarsProps {
  points: number[];
}

export const MiniBars = ({ points }: MiniBarsProps) => {
  const max = Math.max(...points, 1);
  return (
    <div className="flex h-8 items-end gap-1">
      {points.map((value, i) => {
        const isLast = i === points.length - 1;
        return (
          <span
            key={i}
            className={isLast ? 'flex-1 rounded-sm bg-primary' : 'flex-1 rounded-sm bg-line'}
            style={{ height: `${Math.max(12, (value / max) * 100)}%` }}
          />
        );
      })}
    </div>
  );
};

interface SegmentBarProps {
  segments: { label: string; percentage: number; color: string }[];
}

export const SegmentBar = ({ segments }: SegmentBarProps) => (
  <div className="space-y-1.5">
    <div className="flex h-2 w-full overflow-hidden rounded-lg bg-muted">
      {segments.map((segment) => (
        <span
          key={segment.label}
          style={{ width: `${segment.percentage}%`, backgroundColor: segment.color }}
          title={`${segment.label}: ${segment.percentage}%`}
        />
      ))}
    </div>
    <div className="flex flex-wrap gap-x-2.5 gap-y-1">
      {segments.map((segment) => (
        <span key={segment.label} className="inline-flex items-center gap-1 text-[10.5px] text-ink-faint">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
          {segment.label}
        </span>
      ))}
    </div>
  </div>
);

interface GaugeRingProps {
  percent: number;
  caption: string;
}

const GAUGE_SIZE = 40;
const GAUGE_STROKE = 5;
const GAUGE_RADIUS = (GAUGE_SIZE - GAUGE_STROKE) / 2;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

export const GaugeRing = ({ percent, caption }: GaugeRingProps) => {
  const dash = (percent / 100) * GAUGE_CIRCUMFERENCE;
  return (
    <div className="flex items-center gap-2.5">
      <svg width={GAUGE_SIZE} height={GAUGE_SIZE} viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`} role="img" aria-label={caption}>
        <g transform={`rotate(-90 ${GAUGE_SIZE / 2} ${GAUGE_SIZE / 2})`}>
          <circle cx={GAUGE_SIZE / 2} cy={GAUGE_SIZE / 2} r={GAUGE_RADIUS} fill="none" stroke="#EEF2F6" strokeWidth={GAUGE_STROKE} />
          <circle
            cx={GAUGE_SIZE / 2}
            cy={GAUGE_SIZE / 2}
            r={GAUGE_RADIUS}
            fill="none"
            stroke="#223D94"
            strokeWidth={GAUGE_STROKE}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${GAUGE_CIRCUMFERENCE - dash}`}
          />
        </g>
      </svg>
      <p className="text-[11px] leading-snug text-ink-faint">{caption}</p>
    </div>
  );
};
