import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { CheckIcon, CloseIcon, ClockIcon, EyeIcon } from '../../../icons';
import { cn } from '../../../lib/cn';
import { ToastContext, type ToastOptions, type ToastRecord, type ToastTone } from './toast-context';

const TONE_STYLES: Record<ToastTone, { icon: ReactNode; iconWrap: string; bar: string }> = {
  success: {
    iconWrap: 'bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-600/15',
    icon: <CheckIcon size={14} />,
    bar: 'bg-emerald-500',
  },
  error: {
    iconWrap: 'bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-600/15',
    icon: <CloseIcon size={14} />,
    bar: 'bg-rose-500',
  },
  warning: {
    iconWrap: 'bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-600/15',
    icon: <ClockIcon size={14} />,
    bar: 'bg-amber-500',
  },
  info: {
    iconWrap: 'bg-sky-50 text-sky-600 ring-1 ring-inset ring-sky-600/15',
    icon: <EyeIcon size={14} />,
    bar: 'bg-sky-500',
  },
};

/** How long the exit transition takes — must match the `duration-*` class below. */
const EXIT_MS = 180;

interface ToastCardProps {
  toast: Pick<ToastRecord, 'id' | 'tone' | 'title' | 'description' | 'action' | 'duration'>;
  onDismiss: (id: string) => void;
  standalone?: boolean;
}

export const ToastCard = ({ toast, onDismiss, standalone }: ToastCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const style = TONE_STYLES[toast.tone];
  const isLong = (toast.description?.length ?? 0) > 140;
  const canAutoDismiss = !standalone && !!toast.duration && toast.duration > 0;

  // Flip in on the next frame so the initial (pre-transition) state actually paints first.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const requestClose = useCallback(() => setLeaving(true), []);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => onDismiss(toast.id), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [leaving, onDismiss, toast.id]);

  return (
    <div
      role="status"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        'w-full max-w-sm overflow-hidden rounded-lg border border-line bg-canvas shadow-lg ring-1 ring-black/[0.02] transition-all ease-out',
        entered && !leaving ? 'duration-[220ms] translate-y-0 scale-100 opacity-100' : 'duration-[180ms] -translate-y-1.5 scale-[0.98] opacity-0',
        standalone && 'relative',
      )}
    >
      <div className="flex gap-2.5 p-3.5">
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
                requestClose();
              }}
              className="mt-1.5 text-[12px] font-semibold text-brand-ink hover:underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={requestClose}
          aria-label="Dismiss notification"
          className="shrink-0 p-1 text-ink-faint transition-colors hover:text-ink"
        >
          <CloseIcon size={14} />
        </button>
      </div>

      {canAutoDismiss && (
        <div className="h-0.5 w-full bg-black/[0.06]">
          <div
            className={cn('h-full origin-left', style.bar)}
            style={{
              animationName: 'toast-progress',
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
              animationDuration: `${toast.duration}ms`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
            onAnimationEnd={requestClose}
          />
        </div>
      )}
    </div>
  );
};

const MAX_VISIBLE = 3;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const idsRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    idsRef.current += 1;
    const id = `toast-${Date.now()}-${idsRef.current}`;
    const record: ToastRecord = { tone: 'info', duration: 4500, ...options, id };

    // Auto-dismiss timing lives entirely in ToastCard (its progress bar drives
    // the close, and pauses on hover) — this just holds the queue.
    setToasts((prev) => [...prev, record].slice(-MAX_VISIBLE * 2));

    return id;
  }, []);

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
