import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CheckIcon } from '../../icons';

interface ActionItem {
  kind?: 'item';
  id: string;
  label: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  hint?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  /** @deprecated use `tone: 'danger'` */
  danger?: boolean;
  tone?: 'danger';
}

interface LabelItem {
  kind: 'label';
  id: string;
  label: string;
}

interface SeparatorItem {
  kind: 'separator';
  id: string;
}

export type MenuItem = ActionItem | LabelItem | SeparatorItem;

interface DropdownMenuProps {
  label: string;
  items: MenuItem[];
  trigger: ReactNode;
  triggerClassName?: string;
  menuClassName?: string;
  header?: ReactNode;
  align?: 'left' | 'right' | 'start' | 'end';
}

/**
 * Generic click-to-open menu. Anything that needs a "..." / kebab menu,
 * a select-style dropdown, or a profile menu can reuse this instead of
 * rolling its own open/close state each time.
 */
export const DropdownMenu = ({
  label,
  items,
  trigger,
  triggerClassName,
  menuClassName,
  header,
  align = 'right',
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const alignRight = align === 'right' || align === 'end';

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={triggerClassName}
      >
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-30 mt-2 w-56 overflow-hidden rounded-lg border border-line bg-canvas py-1.5 shadow-xl',
            alignRight ? 'right-0' : 'left-0',
            menuClassName,
          )}
        >
          {header && <div className="border-b border-line px-3.5 py-3">{header}</div>}

          {items.map((item) => {
            if (item.kind === 'label') {
              return (
                <p key={item.id} className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                  {item.label}
                </p>
              );
            }

            if (item.kind === 'separator') {
              return <div key={item.id} className="my-1 h-px bg-line" />;
            }

            const Icon = item.icon;
            const isDanger = item.tone === 'danger' || item.danger;

            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  setOpen(false);
                  item.onSelect?.();
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3.5 py-2 text-sm transition-colors',
                  item.disabled
                    ? 'cursor-not-allowed text-ink-faint'
                    : isDanger
                      ? 'text-rose-500 hover:bg-rose-50'
                      : 'text-ink-soft hover:bg-brand-tint hover:text-brand-ink',
                )}
              >
                {Icon && <Icon size={16} className="shrink-0" />}
                <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
                {item.hint && <span className="shrink-0 text-[11px] text-ink-faint">{item.hint}</span>}
                {item.selected && <CheckIcon size={14} className="shrink-0 text-brand-ink" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
