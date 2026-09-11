import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { CheckIcon, CloseIcon, ClockIcon, EyeIcon } from '../../../icons';
import { cn } from '../../../lib/cn';
import { ToastContext, type ToastOptions, type ToastRecord, type ToastTone } from './toast-context';

const TONE_STYLES: Record<ToastTone, { border: string; icon: ReactNode; iconWrap: string }> = {
  success: {
    border: 'border-l-emerald-500',
    iconWrap: 'bg-emerald-50 text-emerald-600',
    icon: <CheckIcon size={14} />,
  },
  error: {
    border: 'border-l-rose-500',
    iconWrap: 'bg-rose-50 text-rose-600',
    icon: <CloseIcon size={14} />,
  },
  warning: {
    border: 'border-l-amber-500',
    iconWrap: 'bg-amber-50 text-amber-600',
    icon: <ClockIcon size={14} />,
  },
  info: {
    border: 'border-l-sky-500',
    iconWrap: 'bg-sky-50 text-sky-600',
    icon: <EyeIcon size={14} />,
  },
};

interface ToastCardProps {
  toast: Pick<ToastRecord, 'id' | 'tone' | 'title' | 'description' | 'action'>;
  onDismiss: (id: string) => void;
  standalone?: boolean;
}

export const ToastCard = ({ toast, onDismiss, standalone }: ToastCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const style = TONE_STYLES[toast.tone];
  const isLong = (toast.description?.length ?? 0) > 140;

  return (
    <div
      role="status"
      className={cn(
        'w-full max-w-sm rounded-lg border border-l-4 border-line bg-canvas p-3.5 shadow-lg',
        style.border,
        standalone && 'relative',
      )}
    >
      <div className="flex gap-2.5">
        <span className={cn('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg', style.iconWrap)}>
          {style.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-ink">{toast.title}</p>
          {toast.description && (
            <p className={cn('mt-0.5 text-[12.5px] text-ink-soft', isLong && !expanded && 'line-clamp-2')}>
              {toast.description}
            </p>
          )}
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-1 text-[11.5px] font-medium text-brand-ink hover:underline"
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick();
                onDismiss(toast.id);
              }}
              className="mt-1.5 text-[12px] font-semibold text-brand-ink hover:underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-lg p-1 text-ink-faint hover:bg-hover hover:text-ink"
        >
          <CloseIcon size={14} />
        </button>
      </div>
    </div>
  );
};

const MAX_VISIBLE = 3;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const record: ToastRecord = { tone: 'info', duration: 4500, ...options, id };

      setToasts((prev) => [...prev, record].slice(-MAX_VISIBLE * 2));

      if (record.duration && record.duration > 0) {
        setTimeout(() => dismiss(id), record.duration);
      }

      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.slice(-MAX_VISIBLE).map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastCard toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
