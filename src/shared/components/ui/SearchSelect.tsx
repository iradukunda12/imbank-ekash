import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { ChevronDownIcon, CloseIcon, SearchIcon } from '../../icons';
import { groupOptions, type SelectOption } from './select-option';

interface SearchSelectProps {
  id?: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
}

export const SearchSelect = ({
  id,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  searchable = true,
  clearable = false,
  className,
}: SearchSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;
  const filtered = query
    ? options.filter(
        (o) => o.label.toLowerCase().includes(query.toLowerCase()) || o.hint?.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  useEffect(() => {
    if (!open) return;
    if (searchable) setTimeout(() => inputRef.current?.focus(), 0);

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, searchable]);

  const commit = (option: SelectOption) => {
    if (option.disabled) return;
    onChange(option.value);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!open) {
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlight(0);
        setOpen(true);
      }
      return;
    }

    const enabled = filtered.filter((o) => !o.disabled);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlight((h) => Math.min(h + 1, enabled.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (enabled[highlight]) commit(enabled[highlight]);
    } else if (event.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  };

  const enabledFiltered = filtered.filter((o) => !o.disabled);

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <button
        id={id}
        type="button"
        onClick={() =>
          setOpen((prev) => {
            const next = !prev;
            if (next) setHighlight(0);
            return next;
          })
        }
        className={cn(
          'flex h-9 w-full items-center gap-2 rounded-lg border border-line bg-canvas px-3 text-left text-[13px]',
          'focus:border-primary focus:outline-none focus:ring-2 focus:ring-brand-tint',
          className,
        )}
      >
        <span className={cn('flex-1 truncate', selected ? 'text-ink' : 'text-ink-faint')}>
          {selected ? selected.label : placeholder}
        </span>
        {clearable && selected && (
          <span
            role="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            aria-label="Clear selection"
            className="rounded-lg p-0.5 text-ink-faint hover:bg-hover hover:text-ink"
          >
            <CloseIcon size={13} />
          </span>
        )}
        <ChevronDownIcon size={14} className={cn('shrink-0 text-ink-faint transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute z-30 mt-1.5 max-h-72 w-full overflow-hidden rounded-lg border border-line bg-canvas shadow-xl">
          {searchable && (
            <div className="flex items-center gap-2 border-b border-line px-3 py-2">
              <SearchIcon size={14} className="text-ink-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to filter…"
                className="w-full bg-transparent text-[13px] text-ink placeholder:text-ink-faint focus:outline-none"
              />
            </div>
          )}

          <div className="max-h-56 overflow-y-auto py-1.5">
            {groupOptions(filtered).map(([group, groupItems]) => (
              <div key={group ?? '_'}>
                {group && (
                  <p className="px-3.5 pb-1 pt-2 text-[10.5px] font-semibold uppercase tracking-wide text-primary-400/85">{group}</p>
                )}
                {groupItems.map((opt) => {
                  const idx = enabledFiltered.indexOf(opt);
                  const isHighlighted = idx === highlight && !opt.disabled;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={opt.disabled}
                      onClick={() => commit(opt)}
                      onMouseEnter={() => !opt.disabled && setHighlight(idx)}
                      className={cn(
                        'block w-full px-3.5 py-2 text-left text-[13px] transition-colors',
                        opt.disabled ? 'cursor-not-allowed text-ink-faint' : 'text-ink',
                        isHighlighted && 'bg-brand-tint text-brand-ink',
                        !isHighlighted && !opt.disabled && 'hover:bg-hover',
                      )}
                    >
                      <span className="block truncate">{opt.label}</span>
                      {opt.hint && <span className="block truncate text-[11.5px] text-ink-faint">{opt.hint}</span>}
                    </button>
                  );
                })}
              </div>
            ))}

            {filtered.length === 0 && <p className="px-3.5 py-3 text-[12.5px] text-ink-faint">No matches</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
