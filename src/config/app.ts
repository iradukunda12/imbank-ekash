/**
 * App-wide constants that aren't design tokens (those live in
 * `index.css`) and aren't feature-specific enough to belong in one
 * feature's own folder.
 */
export const APP = {
  /** Length of the one-time verification code sent during sign-in. */
  otpLength: 6,
  /** Seconds to wait before "Resend code" becomes available again. */
  otpResendSeconds: 30,
};
