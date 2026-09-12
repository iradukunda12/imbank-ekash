import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

type SkeletonTone = 'neutral' | 'brand';

interface SkeletonProps {
  className?: string;
  circle?: boolean;
  /** 'brand' for a placeholder standing in for something that's normally
   * tinted (an icon chip, an avatar) — softer and closer to the real
   * content than a flat grey block would be. Defaults to 'neutral'. */
  tone?: SkeletonTone;
  style?: CSSProperties;
}

const toneClasses: Record<SkeletonTone, string> = {
  neutral: 'bg-line/60',
  brand: 'bg-brand-tint',
};

export const Skeleton = ({ className, circle, tone = 'neutral', style }: SkeletonProps) => (
  <div
    className={cn(
      'animate-pulse',
      toneClasses[tone],
      circle ? 'rounded-full' : 'rounded-lg',
      !className?.includes('h-') && 'h-3',
      className,
    )}
    style={style}
  />
);

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText = ({ lines = 2, className }: SkeletonTextProps) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={i === lines - 1 ? 'h-3 w-2/3' : 'h-3 w-full'} />
    ))}
  </div>
);

export default Skeleton;
