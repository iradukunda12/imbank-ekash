import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { DropdownMenu, type MenuItem } from './DropdownMenu';
import { ChevronDownIcon, ChevronsUpDownIcon } from '../../icons';

/**
 * Generic data-table building blocks — the same pieces documented in the
 * Design System's "Data table" section and used by the real Upcoming
 * Payments table, so every table in the app shares one look (bordered
 * Actions dropdown, chevrons-up-down sort icon, row hover) instead of each
 * feature rolling its own <table> markup.
 */

interface TableProps {
  children: ReactNode;
  className?: string;
  /** e.g. 'min-w-[680px]' — set when columns need a minimum width before scrolling. */
  minWidth?: string;
}

export const Table = ({ children, className, minWidth }: TableProps) => (
  <div className="overflow-x-auto">
    <table className={cn('w-full border-collapse text-sm', minWidth, className)}>{children}</table>
  </div>
);

export const TableHead = ({ children, className }: { children: ReactNode; className?: string }) => (
  <thead>
    <tr className={cn('border-y border-line text-left text-xs font-medium text-ink-faint', className)}>{children}</tr>
  </thead>
);

interface TableHeaderCellProps {
  children?: ReactNode;
  className?: string;
  sortable?: boolean;
  active?: boolean;
  direction?: 'asc' | 'desc';
  onSort?: () => void;
}

export const TableHeaderCell = ({
  children,
  className,
  sortable = false,
  active = false,
  direction = 'asc',
  onSort,
}: TableHeaderCellProps) => (
  <th className={cn('px-5 py-3 font-medium', className)}>
    {sortable ? (
      <button
        type="button"
        onClick={onSort}
        className={cn('inline-flex items-center gap-1 transition-colors hover:text-ink', active && 'text-brand-ink')}
      >
        {children}
        <ChevronsUpDownIcon
          size={14}
          className={cn(
            'shrink-0 transition-transform',
            active ? 'opacity-100' : 'opacity-30',
            active && direction === 'desc' && 'rotate-180',
          )}
        />
      </button>
    ) : (
      children
    )}
  </th>
);

export const TableBody = ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>;

export const TableRow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <tr className={cn('border-b border-line last:border-0 hover:bg-hover', className)}>{children}</tr>
);

export const TableCell = ({
  children,
  className,
  colSpan,
}: {
  children?: ReactNode;
  className?: string;
  colSpan?: number;
}) => (
  <td className={cn('px-5 py-3.5', className)} colSpan={colSpan}>
    {children}
  </td>
);

export const TableEmptyState = ({ colSpan, children }: { colSpan: number; children: ReactNode }) => (
  <tr>
    <td colSpan={colSpan} className="px-5 py-10 text-center text-[13px] text-ink-faint">
      {children}
    </td>
  </tr>
);

/**
 * The bordered "Actions ▾" row-menu trigger used by every data table — a
 * real button (not a bare icon) so it reads clearly inside a dense row, and
 * portaled so it always escapes a horizontally-scrolling table.
 */
export const TableActionsMenu = ({ label, items }: { label: string; items: MenuItem[] }) => (
  <DropdownMenu
    label={label}
    items={items}
    align="start"
    usePortal
    triggerClassName="inline-flex items-center gap-1 h-8 pl-2.5 pr-2 rounded-lg border border-line text-[12px] font-medium text-ink-soft transition-colors hover:border-line-strong hover:bg-hover hover:text-ink"
    trigger={
      <>
        Actions
        <ChevronDownIcon size={12} className="text-ink-faint" />
      </>
    }
  />
);
