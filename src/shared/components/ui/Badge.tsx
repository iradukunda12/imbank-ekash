import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'primary' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  primary: 'bg-primary-50 text-primary-700 ring-primary-700/15',
  brand: 'bg-brand-tint text-brand-ink ring-brand-ink/15',
  success: 'bg-emerald-50 text-emerald-600 ring-emerald-600/15',
  warning: 'bg-amber-50 text-amber-600 ring-amber-600/15',
  danger: 'bg-rose-50 text-rose-600 ring-rose-600/15',
  info: 'bg-sky-50 text-sky-600 ring-sky-600/15',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-600/10',
};

export const Badge = ({ children, tone = 'neutral', icon, className = '' }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
      toneClasses[tone],
      className,
    )}
  >
    {icon}
    {children}
  </span>
);

interface PriorityBarsProps {
  level: 1 | 2 | 3;
  className?: string;
}

/**
 * Three little bars, `level` of them filled — a compact stand-in for a
 * priority icon (Low/Medium/High) that reads at a glance in a badge.
 */
export const PriorityBars = ({ level, className }: PriorityBarsProps) => (
  <span className={cn('inline-flex items-end gap-[1.5px]', className)} aria-hidden>
    {[1, 2, 3].map((bar) => (
      <span
        key={bar}
        className="w-[3px] rounded-sm bg-current"
        style={{ height: `${bar * 3 + 2}px`, opacity: bar <= level ? 1 : 0.3 }}
      />
    ))}
  </span>
);

export default Badge;
