import { setRemembered } from '../lib/storage';
import {
  clearPendingOtpUsername,
  clearRememberedUsername,
  storePendingOtpMessage,
  storePendingOtpUsername,
  storeRememberedUsername,
} from '../lib/session';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface SignInResult {
  /** True while a second verification step (OTP) still needs to complete. */
  otpRequired: boolean;
  username: string;
}

// Stands in for real network latency until this is wired to an actual API.
const MOCK_LATENCY_MS = 500;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Stand-in for a real auth hook. Swap this for your actual auth provider
 * (context / query / session) when it's wired up — everything that reads
 * `user` from here already expects this same shape, and `signIn` /
 * `verifyOtp` / `resendOtp` already return the shapes the login flow
 * expects.
 */
export const useAuth = () => {
  const user: AuthUser = {
    name: 'Kevin Mugisha',
    email: 'kevin.mugisha@imbank.rw',
    role: 'Account Holder',
  };

  const logout = () => {
     
    console.info('logout() called — wire this up to your real auth provider.');
  };

  /**
   * Every sign-in goes through a second OTP step — consistent with this
   * being a payment platform ("Protected by design" on the login screen
   * isn't just copy). Swap the body for a real request; the shape callers
   * rely on (`{ otpRequired, username }` or a thrown Error) stays the same.
   */
  const signIn = async (username: string, password: string, remember: boolean): Promise<SignInResult> => {
    await wait(MOCK_LATENCY_MS);

    if (!username.trim() || !password.trim()) {
      throw new Error('Enter your username and password to continue.');
    }

    setRemembered(remember);
    if (remember) {
      storeRememberedUsername(username);
    } else {
      clearRememberedUsername();
    }

    storePendingOtpUsername(username);
    return { otpRequired: true, username };
  };

  /** Accepts any 6-digit code — replace with a real verification call. */
  const verifyOtp = async (_username: string, otp: string): Promise<void> => {
    await wait(MOCK_LATENCY_MS);

    if (!/^\d{6}$/.test(otp.trim())) {
      throw new Error('That code could not be verified.');
    }

    clearPendingOtpUsername();
  };

  /** Triggers a new code and returns the message to show on the OTP screen. */
  const resendOtp = async (username: string): Promise<string> => {
    await wait(MOCK_LATENCY_MS);

    const message = `We just sent a new code to the number on file for ${username}.`;
    storePendingOtpMessage(message);
    return message;
  };

  /**
   * Always resolves with the same "check your inbox" message regardless
   * of whether the email matches an account — replace with a real request
   * once wired up, but keep that same "don't reveal whether an account
   * exists" behavior, since that's a deliberate security property, not a
   * placeholder shortcut.
   */
  const requestPasswordReset = async (email: string): Promise<string> => {
    await wait(MOCK_LATENCY_MS);

    if (!email.trim()) {
      throw new Error('Enter your email address to continue.');
    }

    return `We've sent a password reset link to ${email}.`;
  };

  return { user, logout, signIn, verifyOtp, resendOtp, requestPasswordReset };
};

export default useAuth;
