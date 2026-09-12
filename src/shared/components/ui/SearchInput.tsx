import type { InputHTMLAttributes } from 'react';
import { SearchIcon, CloseIcon } from '../../icons';
import { cn } from '../../lib/cn';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'> {
  value: string;
  onValueChange: (value: string) => void;
  shortcut?: string;
  size?: 'md' | 'sm';
  /** Override the resting border colour. Defaults to the plain `border-line`
   * every other field uses; kept as its own slot (rather than folded into
   * `className`) so a caller can swap it without the two colours fighting. */
  borderClassName?: string;
}

export const SearchInput = ({
  value,
  onValueChange,
  shortcut,
  size = 'md',
  borderClassName = 'border-line',
  className,
  ...rest
}: SearchInputProps) => {
  return (
    <label
      className={cn(
        'flex items-center gap-2 rounded-lg border text-ink-soft',
        borderClassName,
        'focus-within:border-primary focus-within:ring-2 focus-within:ring-brand-tint',
        size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm',
        className,
      )}
    >
      <SearchIcon className="h-4 w-4 shrink-0 text-ink-faint" />
      <input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="w-full bg-transparent text-ink placeholder:text-ink-faint focus:outline-none"
        {...rest}
      />
      {value && (
        <button
          type="button"
          onClick={() => onValueChange('')}
          aria-label="Clear search"
          className="shrink-0 rounded-lg p-0.5 text-ink-faint hover:bg-hover hover:text-ink"
        >
          <CloseIcon className="h-3.5 w-3.5" />
        </button>
      )}
      {shortcut && !value && (
        <kbd className="hidden shrink-0 rounded-lg border border-line-strong bg-hover px-1.5 py-0.5 text-[10px] font-medium text-ink-faint sm:block">
          {shortcut}
        </kbd>
      )}
    </label>
  );
};

export default SearchInput;
