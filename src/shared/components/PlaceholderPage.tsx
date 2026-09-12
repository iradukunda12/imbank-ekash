import type { ComponentType } from 'react';
import Card from './ui/Card';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: ComponentType<{ className?: string; size?: number }>;
}

/**
 * Honest "not built yet" page for nav destinations that don't have a real
 * feature behind them yet. Deliberately not fake data — it says plainly
 * that this section isn't wired up, so the app never looks finished when
 * it isn't.
 */
export const PlaceholderPage = ({ title, description, icon: Icon }: PlaceholderPageProps) => (
  <div className="flex w-full flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
    <header>
      <h1 className="text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[25px]">{title}</h1>
      <p className="mt-1 text-[13px] text-ink-soft">{description}</p>
    </header>

    <Card className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      {Icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-tint text-brand-ink">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <p className="text-sm font-semibold text-ink">This section is still being built</p>
      <p className="max-w-sm text-[13px] text-ink-faint">
        {title} isn&apos;t wired up with real data yet. Check back soon, or head back to the Dashboard.
      </p>
    </Card>
  </div>
);

export default PlaceholderPage;
