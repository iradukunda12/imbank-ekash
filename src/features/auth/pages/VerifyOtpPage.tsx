import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigation } from '../../../app/routing/useNavigation';
import { Button } from '../../../shared/components/ui/Button';
import { Field, TextInput } from '../../../shared/components/ui/Field';
import { APP } from '../../../config/app';
import { ShieldIcon } from '../../../shared/icons';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { BackToSignIn } from '../components/BackToSignIn';
import { FormError } from '../components/FormMessage';
import { readPendingOtpMessage } from '../lib/session';

interface VerifyOtpPageProps {
  username: string;
  onBack: () => void;
}

/**
 * Second step of sign-in — shown instead of the credentials form once
 * `signIn` reports `otpRequired`. Kept as its own page (rather than a
 * modal) so it gets the same full-screen `AuthLayout` treatment as the
 * sign-in screen itself, and navigates into the app itself once verified
 * (rather than reporting back to `LoginPage`) so this step owns its own
 * "done" transition end to end.
 */
export const VerifyOtpPage = ({ username, onBack }: VerifyOtpPageProps) => {
  const { verifyOtp, resendOtp } = useAuth();
  const { navigate } = useNavigation();

  const [otp, setOtp] = useState('');
  const [notice, setNotice] = useState<string | null>(readPendingOtpMessage);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState<number>(APP.otpResendSeconds);
  const submitting = useRef(false);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = window.setTimeout(() => {
      setCooldown((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (resending || cooldown > 0) return;

    setError(null);
    setResending(true);

    try {
      const message = await resendOtp(username);
      setOtp('');
      setCooldown(APP.otpResendSeconds);
      setNotice(message || 'A new code is on its way.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send a new code.');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (submitting.current) return;

    setError(null);

    if (otp.length !== APP.otpLength) {
      setError(`Enter all ${APP.otpLength} digits of your code.`);
      return;
    }

    submitting.current = true;
    setBusy(true);

    try {
      await verifyOtp(username, otp);
      navigate('/dashboard');
    } catch (err) {
      submitting.current = false;
      setOtp('');
      setError(err instanceof Error ? err.message : 'That code could not be verified.');
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Verify your identity"
      subtitle={`Enter the one-time code sent to the contact details registered for ${username}.`}
      footer={<BackToSignIn onClick={onBack} />}
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="flex items-start gap-3 rounded-lg border border-brand/25 bg-brand-tint p-4">
          <ShieldIcon size={18} className="mt-px shrink-0 text-brand-ink" />
          <p className="text-[12.5px] leading-relaxed text-ink-soft">
            {notice ?? 'Your account requires two-step verification. The code expires shortly, so enter it as soon as it arrives.'}
          </p>
        </div>

        <Field label="Verification code" htmlFor="otp-code">
          <TextInput
            id="otp-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\s+/g, '').slice(0, APP.otpLength))}
            maxLength={APP.otpLength}
            className="text-center font-semibold tracking-[0.4em]"
            autoFocus
            required
          />
        </Field>

        <FormError message={error} />

        <Button type="submit" block disabled={busy || otp.length !== APP.otpLength}>
          {busy ? 'Verifying…' : 'Verify and continue'}
        </Button>

        <p className="text-center text-[12.5px] text-ink-soft">
          Didn&apos;t get a code?{' '}
          {cooldown > 0 ? (
            <span className="text-ink-faint">Resend in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending || busy}
              className="font-semibold text-brand-ink hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:no-underline"
            >
              {resending ? 'Sending…' : 'Resend code'}
            </button>
          )}
        </p>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtpPage;
