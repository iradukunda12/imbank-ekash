import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
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
  /**
   * Render the panel through a portal at the document root, positioned by
   * the trigger's on-screen coordinates, instead of as an absolutely
   * positioned child. Use this when the trigger lives inside a container
   * that clips overflow (e.g. a horizontally-scrollable table) so the
   * panel isn't cut off.
   */
  usePortal?: boolean;
}

const MENU_WIDTH = 224; // matches `w-56`

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
  usePortal = false,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const alignRight = align === 'right' || align === 'end';

  const updateCoords = () => {
    if (!usePortal || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 8,
      left: alignRight ? rect.right - MENU_WIDTH : rect.left,
    });
  };

  useEffect(() => {
    if (!open) return;

    updateCoords();

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideTrigger = rootRef.current?.contains(target);
      const insidePanel = panelRef.current?.contains(target);
      if (!insideTrigger && !insidePanel) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onReposition = () => updateCoords();

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onReposition, true);
    window.addEventListener('resize', onReposition);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onReposition, true);
      window.removeEventListener('resize', onReposition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const renderItems = () =>
    items.map((item) => {
      if (item.kind === 'label') {
        return (
          <p key={item.id} className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary-400/85">
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
    });

  const panel = open && (
    <div
      ref={panelRef}
      role="menu"
      data-ui-portal={usePortal ? 'true' : undefined}
      className={cn(
        'z-30 w-56 overflow-hidden rounded-lg border border-line bg-canvas py-1.5 shadow-xl',
        usePortal ? 'fixed' : cn('absolute mt-2', alignRight ? 'right-0' : 'left-0'),
        menuClassName,
      )}
      style={usePortal && coords ? { top: coords.top, left: coords.left } : undefined}
    >
      {header && <div className="border-b border-line px-3.5 py-3">{header}</div>}
      {renderItems()}
    </div>
  );

  return (
    <div ref={rootRef} className={usePortal ? 'inline-block' : 'relative inline-block'}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={triggerClassName}
      >
        {trigger}
      </button>

      {panel && (usePortal ? createPortal(panel, document.body) : panel)}
    </div>
  );
};

export default DropdownMenu;
