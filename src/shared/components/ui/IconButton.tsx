import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

/** A 36px icon-only button. `label` becomes the accessible name (aria-label). */
export const IconButton = ({ label, children, className, ...rest }: IconButtonProps) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className={cn(
      'inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-hover hover:text-ink',
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

export default IconButton;
