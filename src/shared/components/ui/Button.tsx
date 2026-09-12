import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'dark';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  block?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'text-on-brand bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-sm shadow-primary-500/30',
  secondary: 'text-white bg-secondary hover:bg-[#1b3176] shadow-sm shadow-secondary/25',
  ghost: 'text-brand-ink border border-line-strong hover:bg-brand-tint hover:border-primary-200',
  danger: 'text-white bg-rose-500 hover:bg-rose-600',
  dark: 'text-white bg-slate-900 hover:bg-slate-800',
};

export const Button = ({ children, variant = 'primary', icon, block, className = '', ...rest }: ButtonProps) => (
  <button
    className={cn(
      'inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
      variantClasses[variant],
      block && 'w-full',
      className,
    )}
    {...rest}
  >
    {icon}
    {children}
  </button>
);

export default Button;
