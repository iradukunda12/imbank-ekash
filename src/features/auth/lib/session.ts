/**
 * Short-lived sign-in state that only needs to survive a page refresh
 * mid-flow (sessionStorage), not a full browser restart — the remembered
 * username lives in `storage.ts` instead since that one *should* persist.
 */
const USERNAME_KEY = 'ekash.auth.username';
const NOTICE_KEY = 'ekash.auth.notice';
const PENDING_OTP_KEY = 'ekash.auth.pendingOtpUsername';
const PENDING_OTP_MESSAGE_KEY = 'ekash.auth.pendingOtpMessage';
const PRE_AUTH_TOKEN_KEY = 'ekash.auth.preAuthToken';

const read = (storage: 'local' | 'session', key: string): string | null => {
  if (typeof window === 'undefined') return null;
  const target = storage === 'local' ? window.localStorage : window.sessionStorage;
  return target.getItem(key);
};

const write = (storage: 'local' | 'session', key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  const target = storage === 'local' ? window.localStorage : window.sessionStorage;
  target.setItem(key, value);
};

const clear = (storage: 'local' | 'session', key: string): void => {
  if (typeof window === 'undefined') return;
  const target = storage === 'local' ? window.localStorage : window.sessionStorage;
  target.removeItem(key);
};

/** The username to prefill when "Remember me" was checked last time. */
export const rememberedUsername = (): string => read('local', USERNAME_KEY) ?? '';
export const storeRememberedUsername = (username: string): void => write('local', USERNAME_KEY, username);
export const clearRememberedUsername = (): void => clear('local', USERNAME_KEY);

/** A one-time banner (e.g. "You were signed out") shown once then cleared. */
export const readLoginNotice = (): string | null => read('session', NOTICE_KEY);
export const setLoginNotice = (message: string): void => write('session', NOTICE_KEY, message);
export const clearLoginNotice = (): void => clear('session', NOTICE_KEY);

/** The username waiting on OTP verification, if a sign-in is mid-flow. */
export const readPendingOtpUsername = (): string | null => read('session', PENDING_OTP_KEY);
export const storePendingOtpUsername = (username: string): void => write('session', PENDING_OTP_KEY, username);
export const clearPendingOtpUsername = (): void => clear('session', PENDING_OTP_KEY);

/** "A new code is on its way" style message for the OTP screen — kept
 * separate from the notice above since it's scoped to one in-flight OTP
 * step, not the whole sign-in screen. */
export const readPendingOtpMessage = (): string | null => read('session', PENDING_OTP_MESSAGE_KEY);
export const storePendingOtpMessage = (message: string): void => write('session', PENDING_OTP_MESSAGE_KEY, message);
export const clearPendingOtpMessage = (): void => clear('session', PENDING_OTP_MESSAGE_KEY);

/** Short-lived token issued after password check, before OTP is verified. */
export const readPreAuthToken = (): string | null => read('session', PRE_AUTH_TOKEN_KEY);
export const storePreAuthToken = (token: string): void => write('session', PRE_AUTH_TOKEN_KEY, token);
export const clearPreAuthToken = (): void => clear('session', PRE_AUTH_TOKEN_KEY);
