import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface PopoverRenderProps {
  close: () => void;
}

interface PopoverProps {
  label: string;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: 'left' | 'right' | 'start' | 'end';
  children: (props: PopoverRenderProps) => ReactNode;
}

/**
 * Trigger + floating panel for free-form content (forms, pickers) —
 * anything that isn't a flat list of actions. Use DropdownMenu for that.
 */
export const Popover = ({ label, trigger, triggerClassName, align = 'start', children }: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
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
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={triggerClassName}
      >
        {trigger}
      </button>

      {open && (
        <div
          role="dialog"
          className={cn(
            'absolute z-30 mt-2 w-80 overflow-hidden rounded-lg border border-line bg-canvas shadow-xl',
            alignRight ? 'right-0' : 'left-0',
          )}
        >
          {children({ close })}
        </div>
      )}
    </div>
  );
};

export default Popover;
