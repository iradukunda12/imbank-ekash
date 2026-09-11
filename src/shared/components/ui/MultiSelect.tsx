import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { CheckIcon, ChevronDownIcon, CloseIcon } from '../../icons';
import { groupOptions, type SelectOption } from './select-option';

interface MultiSelectProps {
  id?: string;
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  maxChips?: number;
  className?: string;
}

export const MultiSelect = ({
  id,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  searchable = true,
  maxChips = 3,
  className,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const selectedOptions = options.filter((o) => value.includes(o.value));
  const visibleChips = selectedOptions.slice(0, maxChips);
  const hiddenCount = selectedOptions.length - visibleChips.length;

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const toggle = (optionValue: string) => {
    onChange(value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]);
  };

  const removeLast = () => {
    if (selectedOptions.length === 0) return;
    onChange(value.slice(0, -1));
  };

  return (
    <div ref={rootRef} className="relative">
      <div
        id={id}
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
        className={cn(
          'flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-[13px] cursor-text',
          'focus-within:border-primary focus-within:ring-2 focus-within:ring-brand-tint',
          className,
        )}
      >
        {visibleChips.map((opt) => (
          <span
            key={opt.value}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-tint px-1.5 py-0.5 text-[12px] font-medium text-brand-ink"
          >
            {opt.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggle(opt.value);
              }}
              aria-label={`Remove ${opt.label}`}
              className="rounded-lg hover:bg-brand/10"
            >
              <CloseIcon size={11} />
            </button>
          </span>
        ))}
        {hiddenCount > 0 && (
          <span className="rounded-lg bg-hover px-1.5 py-0.5 text-[12px] font-medium text-ink-soft">
            +{hiddenCount} more
          </span>
        )}

        {searchable ? (
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && query === '') removeLast();
            }}
            placeholder={selectedOptions.length === 0 ? placeholder : ''}
            className="min-w-[6ch] flex-1 bg-transparent text-ink placeholder:text-ink-faint focus:outline-none"
          />
        ) : (
          selectedOptions.length === 0 && <span className="text-ink-faint">{placeholder}</span>
        )}

        <ChevronDownIcon size={14} className={cn('ml-auto shrink-0 text-ink-faint transition-transform', open && 'rotate-180')} />
      </div>

      {open && (
        <div className="absolute z-30 mt-1.5 max-h-64 w-full overflow-y-auto rounded-lg border border-line bg-canvas py-1.5 shadow-xl">
          {selectedOptions.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="w-full px-3.5 py-1.5 text-left text-[12px] font-medium text-ink-faint hover:text-ink"
            >
              Clear all
            </button>
          )}

          {groupOptions(filtered).map(([group, groupItems]) => (
            <div key={group ?? '_'}>
              {group && (
                <p className="px-3.5 pb-1 pt-2 text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">{group}</p>
              )}
              {groupItems.map((opt) => {
                const checked = value.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => toggle(opt.value)}
                    className={cn(
                      'flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[13px] transition-colors',
                      opt.disabled ? 'cursor-not-allowed text-ink-faint' : 'text-ink hover:bg-hover',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                        checked ? 'border-primary bg-primary text-on-brand' : 'border-line-strong',
                      )}
                    >
                      {checked && <CheckIcon size={11} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{opt.label}</span>
                      {opt.hint && <span className="block truncate text-[11.5px] text-ink-faint">{opt.hint}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}

          {filtered.length === 0 && <p className="px-3.5 py-3 text-[12.5px] text-ink-faint">No matches</p>}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
