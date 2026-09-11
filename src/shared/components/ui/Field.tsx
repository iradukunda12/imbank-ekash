import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}

export const Field = ({ label, htmlFor, hint, children }: FieldProps) => (
  <div className="space-y-1.5">
    <label htmlFor={htmlFor} className="block text-[13px] font-medium text-ink">
      {label}
    </label>
    {children}
    {hint && <p className="text-[11.5px] text-ink-faint">{hint}</p>}
  </div>
);

const fieldClass =
  'h-9 w-full rounded-lg border border-line bg-canvas px-3 text-[13px] text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-brand-tint disabled:bg-muted disabled:text-ink-faint';

export const TextInput = ({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cn(fieldClass, className)} {...rest} />
);

export const Select = ({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cn(fieldClass, 'appearance-none bg-no-repeat pr-8', className)} {...rest}>
    {children}
  </select>
);

export default Field;
