import type { ReactNode } from 'react';
import Brand from '../../../shared/layouts/DashboardLayout/Brand';
import wLogo from '../../../assets/w-logo.png';
import { WalletIcon, LockIcon, TransactionsIcon } from '../../../shared/icons';

const HIGHLIGHTS = [
  {
    icon: TransactionsIcon,
    title: 'Swift transfers',
    description: 'Move money between banks and mobile money services in seconds.',
  },
  {
    icon: WalletIcon,
    title: 'One connected platform',
    description: 'Banks, mobile money providers and financial entities, all in one place.',
  },
  {
    icon: LockIcon,
    title: 'Protected by design',
    description: 'Every transaction is encrypted and monitored end to end.',
  },
];

/**
 * On the dark brand panel this is the transparent white "I&M Bank" mark
 * (`w-logo.png`) plus the "eKash" platform name beside it — no card or
 * background needed, it just sits on the gradient. The compact mobile
 * lockup keeps the sidebar's dark-on-light `Brand` asset instead, since
 * that one sits on a white page there.
 */
const EkashMark = ({ tone = 'light' }: { tone?: 'light' | 'dark' }) =>
  tone === 'light' ? (
    <div className="flex items-center gap-3">
      <img src={wLogo} alt="I&M Bank" className="h-14 w-auto" />
      <span className="text-2xl font-extrabold tracking-tight text-white">eKash</span>
    </div>
  ) : (
    <div className="flex items-center gap-2.5">
      <Brand className="h-9 w-auto" />
      <span className="text-lg font-extrabold tracking-tight text-brand-ink">eKash</span>
    </div>
  );

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Shared shell for every auth screen (sign-in, OTP verification, and any
 * future forgot-password / reset-password page) — the brand panel is
 * built once here so every step in the flow looks like part of the same
 * product instead of each page rolling its own layout.
 */
export const AuthLayout = ({ title, subtitle, footer, children }: AuthLayoutProps) => (
  <div className="flex min-h-screen w-full bg-canvas">
    <div className="relative hidden w-[44%] shrink-0 flex-col justify-center gap-14 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-10 py-12 lg:flex xl:px-14">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-primary-400/30 blur-3xl" aria-hidden />

      <div className="relative space-y-7">
        <EkashMark />
        <p className="max-w-sm text-[15px] leading-relaxed text-white/85">
          An electronic payment platform enabling swift and protected transactions among banks, mobile money
          services, and financial entities within Rwanda.
        </p>
      </div>

      <div className="relative space-y-5">
        {HIGHLIGHTS.map(({ icon: Icon, title: hTitle, description }) => (
          <div key={hTitle} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-inset ring-white/20">
              <Icon size={16} />
            </span>
            <div>
              <p className="text-[13.5px] font-semibold text-white">{hTitle}</p>
              <p className="mt-0.5 text-[12.5px] text-white/70">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="absolute inset-x-10 bottom-6 text-[11px] text-white/50 xl:inset-x-14">
        © 2026 IMBANK eKash. All rights reserved.
      </p>
    </div>

    <div className="flex w-full flex-1 items-center justify-center px-6 py-12 sm:px-10">
      <div className="w-full max-w-md">
        <div className="mb-8 lg:hidden">
          <EkashMark tone="dark" />
        </div>

        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-ink">{title}</h1>
        <p className="mt-1.5 text-[13px] text-ink-soft">{subtitle}</p>

        <div className="mt-8">{children}</div>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  </div>
);

export default AuthLayout;
