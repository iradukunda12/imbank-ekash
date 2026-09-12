import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigation } from '../../../app/routing/useNavigation';
import { Button } from '../../../shared/components/ui/Button';
import { Field, TextInput } from '../../../shared/components/ui/Field';
import { useToast } from '../../../shared/components/ui/toast/useToast';
import { isRemembered } from '../lib/storage';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { FormError, FormNotice } from '../components/FormMessage';
import { PasswordInput } from '../components/PasswordInput';
import {
  clearLoginNotice,
  clearPendingOtpUsername,
  clearPendingOtpMessage,
  clearPreAuthToken,
  readLoginNotice,
  readPendingOtpUsername,
  rememberedUsername,
} from '../lib/session';
import VerifyOtpPage from './VerifyOtpPage';

/**
 * Standalone sign-in screen, rendered outside the dashboard shell (no
 * sidebar/header) since the person isn't inside the app yet. `signIn` /
 * `verifyOtp` on `useAuth` are a stand-in for a real auth call, same as
 * the rest of `useAuth` — swap them for real requests when they exist.
 * Navigating to '/dashboard' (rather than an `onLogin` callback) is what
 * actually lets the person in — `App`'s route gate shows this screen for
 * every '/login' path and the dashboard shell for everything else.
 */
export const LoginPage = () => {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();
  const { toast } = useToast();

  const [username, setUsername] = useState(rememberedUsername);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(isRemembered);
  const [pendingUsername, setPendingUsername] = useState<string | null>(readPendingOtpUsername);
  const [notice] = useState<string | null>(readLoginNotice);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);

  useEffect(() => clearLoginNotice(), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (submitting.current) return;

    setError(null);
    submitting.current = true;
    setBusy(true);

    try {
      const result = await signIn(username, password, remember);

      if (result.otpRequired) {
        submitting.current = false;
        setPassword('');
        setPendingUsername(result.username);
        setBusy(false);
        return;
      }

      navigate('/dashboard');
    } catch (err) {
      submitting.current = false;
      setError(err instanceof Error ? err.message : 'Could not sign you in.');
      setBusy(false);
    }
  };

  const handleBackToSignIn = () => {
    clearPendingOtpUsername();
    clearPendingOtpMessage();
    clearPreAuthToken();
    setPendingUsername(null);
    setPassword('');
  };

  if (pendingUsername) {
    return <VerifyOtpPage username={pendingUsername} onBack={handleBackToSignIn} />;
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your IMBANK eKash account to continue."
      footer={
        <p className="text-center text-[13px] text-ink-soft">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() =>
              toast({
                tone: 'info',
                title: 'Account registration is coming soon',
                description: 'For now, ask your bank branch to set up your IMBANK eKash access.',
              })
            }
            className="font-semibold text-brand-ink hover:underline"
          >
            Create an account
          </button>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormNotice message={notice} />

        <Field label="Username" htmlFor="login-username">
          <TextInput
            id="login-username"
            type="text"
            autoComplete="username"
            placeholder="your.username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Field>

        <Field label="Password" htmlFor="login-password">
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            visible={showPassword}
            onToggleVisibility={() => setShowPassword((v) => !v)}
            required
          />
        </Field>

        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-[12.5px] text-ink-soft cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 rounded-[4px] accent-primary"
            />
            Remember me
          </label>

          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-[12.5px] font-semibold text-brand-ink hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <FormError message={error} />

        <Button type="submit" block disabled={busy}>
          {busy ? 'Signing in…' : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
