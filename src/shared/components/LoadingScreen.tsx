import { Spinner } from './ui/Spinner';
import vmBankLogo from '../../assets/vm-bank-logo.png';

interface LoadingScreenProps {
  message?: string;
}

/** The full-page boot screen shown only while the session is restoring. */
export const LoadingScreen = ({ message = 'Loading your dashboard…' }: LoadingScreenProps) => (
  <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 bg-canvas">
    <img src={vmBankLogo} alt="V&M Bank" className="h-10 w-auto" />
    <Spinner size={26} thickness={2.5} className="text-brand-ink" />
    <p className="text-[13px] text-ink-soft">{message}</p>
  </div>
);

export default LoadingScreen;
