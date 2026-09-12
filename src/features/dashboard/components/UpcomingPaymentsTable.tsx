import { useMemo, useState } from 'react';
import Card from '../../../shared/components/ui/Card';
import Badge, { PriorityBars } from '../../../shared/components/ui/Badge';
import Button from '../../../shared/components/ui/Button';
import { Field } from '../../../shared/components/ui/Field';
import { MultiSelect } from '../../../shared/components/ui/MultiSelect';
import { Modal } from '../../../shared/components/ui/Modal';
import { Popover } from '../../../shared/components/ui/Popover';
import { type MenuItem } from '../../../shared/components/ui/DropdownMenu';
import { SearchInput } from '../../../shared/components/ui/SearchInput';
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableEmptyState,
  TableActionsMenu,
} from '../../../shared/components/ui/Table';
import {
  TransactionsIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FilterIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  BellIcon,
} from '../../../shared/icons';
import { cn } from '../../../shared/lib/cn';
import { upcomingPayments } from '../data/mockDashboardData';
import type { PaymentStatus, PaymentPriority, UpcomingPayment } from '../types/dashboard.types';

/**
 * Same icon + tone vocabulary as the Design System's "Status & identity"
 * section — a status/priority badge should look the same wherever it shows up.
 */
const statusConfig: Record<PaymentStatus, { tone: 'neutral' | 'warning' | 'info' | 'success'; icon: typeof ClockIcon }> = {
  'Not Started': { tone: 'neutral', icon: ClockIcon },
  Pending: { tone: 'warning', icon: ClockIcon },
  'In Progress': { tone: 'info', icon: EyeIcon },
  Completed: { tone: 'success', icon: CheckIcon },
};

const priorityConfig: Record<PaymentPriority, { tone: 'neutral' | 'warning' | 'danger' }> = {
  Low: { tone: 'neutral' },
  Medium: { tone: 'warning' },
  High: { tone: 'danger' },
};

const STATUS_OPTIONS: PaymentStatus[] = ['Pending', 'Not Started', 'In Progress', 'Completed'];
const PRIORITY_OPTIONS: PaymentPriority[] = ['High', 'Medium', 'Low'];
const PRIORITY_RANK: Record<PaymentPriority, 1 | 2 | 3> = { Low: 1, Medium: 2, High: 3 };
const PAGE_SIZE_OPTIONS = [3, 5, 10, 25];

type SortColumn = 'name' | 'dueDate' | 'type' | 'status' | 'priority';
type SortDirection = 'asc' | 'desc';

const COLUMNS: { key: SortColumn; label: string }[] = [
  { key: 'name', label: 'Account / Task' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
];

const compareValues = (a: UpcomingPayment, b: UpcomingPayment, column: SortColumn) => {
  if (column === 'priority') return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
  if (column === 'dueDate') return a.dueDate.localeCompare(b.dueDate);
  return a[column].localeCompare(b[column]);
};

/** Builds a compact page-number list with ellipsis gaps, e.g. [1, '…', 4, 5, 6, '…', 12]. */
const buildPageList = (current: number, total: number): (number | '…')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | '…')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('…');
    result.push(p);
  });
  return result;
};

const rowActions = (onView: () => void): MenuItem[] => [
  { id: 'view', label: 'View details', icon: EyeIcon, onSelect: onView },
  { id: 'mark-paid', label: 'Mark as paid', icon: CheckIcon },
  { id: 'remind', label: 'Send reminder', icon: BellIcon },
];

interface PaymentFilters {
  status: PaymentStatus[];
  priority: PaymentPriority[];
}

const EMPTY_FILTERS: PaymentFilters = { status: [], priority: [] };

/**
 * Popover body for the Filter trigger — a draft copy of the committed
 * filters so Cancel can back out without touching the table, matching the
 * Reset / Cancel / Apply pattern used elsewhere in the app.
 */
const FilterPanel = ({
  filters,
  onApply,
  onClose,
}: {
  filters: PaymentFilters;
  onApply: (next: PaymentFilters) => void;
  onClose: () => void;
}) => {
  const [draft, setDraft] = useState<PaymentFilters>(filters);
  const isEmpty = draft.status.length === 0 && draft.priority.length === 0;

  return (
    <>
      <header className="flex h-12 items-center border-b border-line px-4">
        <h3 className="text-[13px] font-semibold text-ink">Filter payments</h3>
      </header>

      <div className="space-y-3.5 p-4">
        <Field label="Status">
          <MultiSelect
            options={STATUS_OPTIONS.map((status) => ({ value: status, label: status }))}
            value={draft.status}
            onChange={(status) => setDraft((prev) => ({ ...prev, status: status as PaymentStatus[] }))}
            placeholder="Any status"
            searchable={false}
            maxChips={2}
            usePortal
          />
        </Field>

        <Field label="Priority">
          <MultiSelect
            options={PRIORITY_OPTIONS.map((priority) => ({ value: priority, label: priority }))}
            value={draft.priority}
            onChange={(priority) => setDraft((prev) => ({ ...prev, priority: priority as PaymentPriority[] }))}
            placeholder="Any priority"
            searchable={false}
            maxChips={2}
            usePortal
          />
        </Field>
      </div>

      <footer className="flex items-center justify-between gap-2 border-t border-line bg-muted px-4 py-3">
        <button
          type="button"
          onClick={() => setDraft(EMPTY_FILTERS)}
          disabled={isEmpty}
          className="text-[12px] font-medium text-brand-ink hover:underline disabled:cursor-not-allowed disabled:text-ink-faint disabled:no-underline"
        >
          Reset
        </button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onApply(draft);
              onClose();
            }}
          >
            Apply
          </Button>
        </div>
      </footer>
    </>
  );
};

const UpcomingPaymentsTable = () => {
  const [query, setQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<PaymentFilters>(EMPTY_FILTERS);
  const [selectedPayment, setSelectedPayment] = useState<UpcomingPayment | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const toggleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setPage(1);
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = upcomingPayments.filter((item) => {
      if (q && !item.name.toLowerCase().includes(q) && !item.type.toLowerCase().includes(q)) return false;
      if (filters.status.length > 0 && !filters.status.includes(item.status)) return false;
      if (filters.priority.length > 0 && !filters.priority.includes(item.priority)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      const result = compareValues(a, b, sortColumn);
      return sortDirection === 'asc' ? result : -result;
    });
  }, [query, filters, sortColumn, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageList = buildPageList(currentPage, pageCount);

  const activeFilterCount = filters.status.length + filters.priority.length;

  return (
    <Card className="p-0!">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-0">
        <h3 className="flex items-center gap-2 text-base font-bold text-ink">
          <TransactionsIcon className="h-[18px] w-[18px] text-primary-600" />
          Upcoming Payments
        </h3>

        <div className="flex items-center gap-2">
          <SearchInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search payments"
            size="sm"
            className="w-36 sm:w-44 lg:w-56"
          />

          <Popover
            label="Filter payments"
            align="end"
            panelClassName="w-80"
            triggerClassName={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors',
              activeFilterCount > 0
                ? 'border-primary-200 bg-brand-tint text-brand-ink'
                : 'border-line-strong text-ink-soft hover:bg-hover',
            )}
            trigger={
              <>
                <FilterIcon className="h-3.5 w-3.5" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-lg bg-primary-900 px-1 text-[10px] font-semibold text-white">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDownIcon className="h-3.5 w-3.5 text-ink-faint" />
              </>
            }
          >
            {({ close }) => <FilterPanel filters={filters} onApply={setFilters} onClose={close} />}
          </Popover>
        </div>
      </div>

      <div className="mt-4">
        <Table minWidth="min-w-[680px]">
          <TableHead>
            <TableHeaderCell className="w-[104px]">Actions</TableHeaderCell>
            {COLUMNS.map((col) => (
              <TableHeaderCell
                key={col.key}
                sortable
                active={sortColumn === col.key}
                direction={sortDirection}
                onSort={() => toggleSort(col.key)}
              >
                {col.label}
              </TableHeaderCell>
            ))}
          </TableHead>
          <TableBody>
            {pagedRows.length === 0 ? (
              <TableEmptyState colSpan={COLUMNS.length + 1}>No payments match your filters.</TableEmptyState>
            ) : (
              pagedRows.map((item) => {
                const status = statusConfig[item.status];
                const StatusIcon = status.icon;

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TableActionsMenu
                        label={`Actions for ${item.name}`}
                        items={rowActions(() => setSelectedPayment(item))}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-ink">{item.name}</TableCell>
                    <TableCell className="text-ink-soft">{item.dueDate}</TableCell>
                    <TableCell className="text-ink-soft">{item.type}</TableCell>
                    <TableCell>
                      <Badge tone={status.tone} icon={<StatusIcon size={14} />}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge tone={priorityConfig[item.priority].tone} icon={<PriorityBars level={PRIORITY_RANK[item.priority]} />}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={selectedPayment !== null}
        onClose={() => setSelectedPayment(null)}
        title={selectedPayment?.name ?? ''}
        description={selectedPayment?.type}
        footer={
          <Button variant="secondary" onClick={() => setSelectedPayment(null)}>
            Close
          </Button>
        }
      >
        {selectedPayment && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">Due date</span>
              <span className="font-medium text-ink">{selectedPayment.dueDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">Type</span>
              <span className="font-medium text-ink">{selectedPayment.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">Status</span>
              <Badge
                tone={statusConfig[selectedPayment.status].tone}
                icon={(() => {
                  const StatusIcon = statusConfig[selectedPayment.status].icon;
                  return <StatusIcon size={14} />;
                })()}
              >
                {selectedPayment.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">Priority</span>
              <Badge
                tone={priorityConfig[selectedPayment.priority].tone}
                icon={<PriorityBars level={PRIORITY_RANK[selectedPayment.priority]} />}
              >
                {selectedPayment.priority}
              </Badge>
            </div>
          </div>
        )}
      </Modal>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex h-8 items-center rounded-lg border border-line-strong px-3.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Prev
          </button>

          {pageList.map((p, i) =>
            p === '…' ? (
              <span key={`ellipsis-${i}`} className="px-1.5 text-[12.5px] text-ink-faint">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-lg text-[12.5px] font-medium transition-colors',
                  p === currentPage ? 'bg-primary-900 text-white' : 'text-ink-soft hover:bg-hover',
                )}
              >
                {p}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="inline-flex h-8 items-center rounded-lg border border-line-strong px-3.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-3 text-[12.5px] text-ink-faint">
          <span>
            Showing {rows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, rows.length)} of{' '}
            {rows.length} entries
          </span>

          <Popover
            label="Rows per page"
            align="end"
            trigger={
              <>
                Show {pageSize}
                <ChevronRightIcon size={12} className="rotate-90 text-ink-faint" />
              </>
            }
            triggerClassName="inline-flex items-center gap-1 rounded-lg border border-line-strong px-3 py-1.5 text-[12.5px] font-medium text-ink-soft hover:bg-hover transition-colors"
          >
            {({ close }) => (
              <div className="p-1.5">
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setPageSize(size);
                      setPage(1);
                      close();
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition-colors',
                      pageSize === size ? 'bg-brand-tint font-medium text-brand-ink' : 'text-ink-soft hover:bg-hover',
                    )}
                  >
                    Show {size}
                    {pageSize === size && <CheckIcon size={13} />}
                  </button>
                ))}
              </div>
            )}
          </Popover>
        </div>
      </div>
    </Card>
  );
};

export default UpcomingPaymentsTable;
