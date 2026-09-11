import { cn } from '../../lib/cn';

interface SpinnerProps {
  size?: number;
  thickness?: number;
  className?: string;
}

export const Spinner = ({ size = 18, thickness = 2, className }: SpinnerProps) => (
  <svg
    className={cn('animate-spin text-current', className)}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={thickness} opacity={0.2} />
    <path
      d="M22 12a10 10 0 0 0-10-10"
      stroke="currentColor"
      strokeWidth={thickness}
      strokeLinecap="round"
    />
  </svg>
);

export default Spinner;
