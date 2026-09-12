import type { InputHTMLAttributes } from 'react';
import { cn } from '../../../shared/lib/cn';
import { EyeIcon, EyeOffIcon } from '../../../shared/icons';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  visible: boolean;
  onToggleVisibility: () => void;
}

/**
 * Same visual style as the shared `TextInput`, but built directly rather
 * than composed with it — the show/hide toggle needs right-side padding
 * and `TextInput`'s base class sets left+right padding together via
 * `px-3`. Concatenating a `pr-9` override on top of that would leave two
 * class rules fighting over `padding-right` with no guaranteed winner
 * (this app's `cn()` doesn't de-duplicate), so the padding is written
 * once here instead, split as `pl-3 pr-9`.
 */
export const PasswordInput = ({ visible, onToggleVisibility, className, ...rest }: PasswordInputProps) => (
  <div className="relative">
    <input
      type={visible ? 'text' : 'password'}
      className={cn(
        'h-9 w-full rounded-lg border border-line bg-canvas pl-3 pr-9 text-[13px] text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-brand-tint disabled:bg-muted disabled:text-ink-faint',
        className,
      )}
      {...rest}
    />
    <button
      type="button"
      onClick={onToggleVisibility}
      aria-label={visible ? 'Hide password' : 'Show password'}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-ink-soft"
    >
      {visible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
    </button>
  </div>
);

export default PasswordInput;
