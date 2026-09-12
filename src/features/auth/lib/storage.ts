/**
 * "Remember me" persistence — separate from `session.ts` because this one
 * genuinely needs to survive across browser restarts (localStorage), while
 * the one-time login notice / in-flight OTP state in `session.ts` should
 * not.
 */
const REMEMBER_KEY = 'ekash.auth.remember';

export const isRemembered = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(REMEMBER_KEY) === '1';
};

export const setRemembered = (remember: boolean): void => {
  if (typeof window === 'undefined') return;
  if (remember) {
    window.localStorage.setItem(REMEMBER_KEY, '1');
  } else {
    window.localStorage.removeItem(REMEMBER_KEY);
  }
};
