import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

interface SkeletonProps {
  className?: string;
  circle?: boolean;
  style?: CSSProperties;
}

export const Skeleton = ({ className, circle, style }: SkeletonProps) => (
  <div
    className={cn('animate-pulse bg-line', circle ? 'rounded-full' : 'rounded-lg', !className?.includes('h-') && 'h-3', className)}
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
