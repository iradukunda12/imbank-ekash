import { createContext } from 'react';

export type ToastTone = 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  tone?: ToastTone;
  title: string;
  description?: string;
  /** ms before auto-dismiss. 0 = stays until dismissed. Default 4500. */
  duration?: number;
  action?: ToastAction;
}

export interface ToastRecord extends ToastOptions {
  id: string;
  tone: ToastTone;
}

export interface ToastContextValue {
  toasts: ToastRecord[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);
