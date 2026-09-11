import type { ReactNode } from 'react';
import Card from '../../../shared/components/ui/Card';

interface SectionProps {
  id?: string;
  title: string;
  description?: string;
  source?: string;
  children: ReactNode;
}

export const Section = ({ id, title, description, source, children }: SectionProps) => (
  <section id={id} className="scroll-mt-24">
    <Card className="space-y-5">
      <header>
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        {description && <p className="mt-1 text-[13px] text-ink-soft">{description}</p>}
        {source && <p className="mt-1.5 font-mono text-[11px] text-ink-faint">{source}</p>}
      </header>
      <div className="space-y-4">{children}</div>
    </Card>
  </section>
);

interface RowProps {
  label?: string;
  children: ReactNode;
}

export const Row = ({ label, children }: RowProps) => (
  <div className="space-y-2">
    {label && <p className="text-[12px] font-medium text-ink-faint">{label}</p>}
    <div className="flex flex-wrap items-center gap-2.5">{children}</div>
  </div>
);

export default Section;
