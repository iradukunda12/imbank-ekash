import { useRef, useState, type FormEvent } from 'react';
import { useNavigation } from '../../../app/routing/useNavigation';
import { Button } from '../../../shared/components/ui/Button';
import { Field, TextInput } from '../../../shared/components/ui/Field';
import { CheckCircleIcon, MessageIcon } from '../../../shared/icons';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { BackToSignIn } from '../components/BackToSignIn';
import { FormError } from '../components/FormMessage';

/**
 * Two states, one page: the request form, then — once sent — a
 * confirmation screen with a way back to try a different address. Kept
 * as one component (rather than a route each) since the transition
 * between them is local UI state, not a real navigation.
 */
export const ForgotPasswordPage = () => {
  const { requestPasswordReset } = useAuth();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitting = useRef(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (submitting.current) return;

    setError(null);
    submitting.current = true;
    setBusy(true);

    try {
      const message = await requestPasswordReset(email);
      setNotice(message);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the reset email.');
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  };

  const backToSignIn = <BackToSignIn onClick={() => navigate('/login')} />;

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle={`If an account exists for ${email || 'that address'}, we've sent a link to reset your password.`}
        footer={backToSignIn}
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-brand/25 bg-brand-tint p-4">
            <CheckCircleIcon size={18} className="mt-px shrink-0 text-brand-ink" />
            <div>
              <p className="text-[13px] font-semibold text-ink">Reset link sent</p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-soft">
                {notice ?? "Open the link in that email to choose a new password. If it doesn't arrive, check your spam folder or contact your bank branch."}
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            block
            icon={<MessageIcon size={15} />}
            onClick={() => {
              setNotice(null);
              setSent(false);
            }}
          >
            Use a different email
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter the email address on your IMBANK eKash account and we'll send you a link to set a new password."
      footer={backToSignIn}
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field label="Email address" htmlFor="forgot-email">
          <TextInput
            id="forgot-email"
            type="email"
            autoComplete="email"
            placeholder="you@bank.rw"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        <FormError message={error} />

        <Button type="submit" block disabled={busy || email.trim() === ''}>
          {busy ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
