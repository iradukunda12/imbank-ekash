import { useMemo, useState } from 'react';
import Card from '../../../shared/components/ui/Card';
import Badge from '../../../shared/components/ui/Badge';
import { Popover } from '../../../shared/components/ui/Popover';
import { SearchInput } from '../../../shared/components/ui/SearchInput';
import {
  SearchIcon,
  SortIcon,
  FilterIcon,
  TransactionsIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckIcon,
} from '../../../shared/icons';
import { cn } from '../../../shared/lib/cn';
import { upcomingPayments } from '../data/mockDashboardData';
import type { PaymentStatus, PaymentPriority, UpcomingPayment } from '../types/dashboard.types';

const statusTone: Record<PaymentStatus, 'warning' | 'primary' | 'success' | 'neutral'> = {
  Pending: 'warning',
  'Not Started': 'primary',
  'In Progress': 'success',
  Completed: 'neutral',
};

const priorityDot = (priority: PaymentPriority) => {
  switch (priority) {
    case 'High':
      return 'bg-rose-500';
    case 'Medium':
      return 'bg-amber-500';
    default:
      return 'bg-emerald-500';
  }
};

const STATUS_OPTIONS: PaymentStatus[] = ['Pending', 'Not Started', 'In Progress', 'Completed'];
const PRIORITY_OPTIONS: PaymentPriority[] = ['High', 'Medium', 'Low'];
const PRIORITY_RANK: Record<PaymentPriority, number> = { High: 3, Medium: 2, Low: 1 };
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

const toggleInSet = <T,>(set: Set<T>, value: T) => {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
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

const UpcomingPaymentsTable = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<Set<PaymentStatus>>(new Set());
  const [priorityFilter, setPriorityFilter] = useState<Set<PaymentPriority>>(new Set());
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
      if (statusFilter.size > 0 && !statusFilter.has(item.status)) return false;
      if (priorityFilter.size > 0 && !priorityFilter.has(item.priority)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      const result = compareValues(a, b, sortColumn);
      return sortDirection === 'asc' ? result : -result;
    });
  }, [query, statusFilter, priorityFilter, sortColumn, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageList = buildPageList(currentPage, pageCount);

  const activeFilterCount = statusFilter.size + priorityFilter.size;

  const updateFilter = (updater: () => void) => {
    updater();
    setPage(1);
  };

  return (
    <Card className="lg:col-span-2 p-0!">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-0">
        <h3 className="flex items-center gap-2 text-base font-bold text-ink">
          <TransactionsIcon className="h-[18px] w-[18px] text-primary-600" />
          Upcoming Payments
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search payments"
            aria-pressed={searchOpen}
            className={cn(
              'rounded-lg border p-2 transition-colors',
              searchOpen ? 'border-primary-200 bg-brand-tint text-brand-ink' : 'border-line-strong text-ink-faint hover:bg-hover',
            )}
          >
            <SearchIcon className="h-4 w-4" />
          </button>

          <Popover
            label="Sort payments"
            align="end"
            trigger={
              <>
                <SortIcon className="h-3.5 w-3.5" />
                Sort
              </>
            }
            triggerClassName="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3.5 py-2 text-xs font-medium text-ink-soft hover:bg-hover transition-colors"
          >
            {() => (
              <div className="p-1.5">
                {COLUMNS.map((col) => (
                  <button
                    key={col.key}
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition-colors',
                      sortColumn === col.key ? 'bg-brand-tint font-medium text-brand-ink' : 'text-ink-soft hover:bg-hover',
                    )}
                  >
                    {col.label}
                    {sortColumn === col.key && (
                      <ChevronDownIcon
                        className={cn('h-3.5 w-3.5 transition-transform', sortDirection === 'asc' && 'rotate-180')}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </Popover>

          <Popover
            label="Filter payments"
            align="end"
            trigger={
              <>
                <FilterIcon className="h-3.5 w-3.5" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-lg bg-primary-900 px-1 text-[10px] font-semibold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </>
            }
            triggerClassName={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors',
              activeFilterCount > 0
                ? 'border-primary-200 bg-brand-tint text-brand-ink'
                : 'border-line-strong text-ink-soft hover:bg-hover',
            )}
          >
            {({ close }) => (
              <div>
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <p className="text-[13px] font-semibold text-ink">Filter</p>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        updateFilter(() => {
                          setStatusFilter(new Set());
                          setPriorityFilter(new Set());
                        })
                      }
                      className="text-[12px] font-medium text-brand-ink hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-4 p-4">
                  <div>
                    <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-faint">Status</p>
                    <div className="space-y-1">
                      {STATUS_OPTIONS.map((status) => (
                        <label
                          key={status}
                          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-[13px] text-ink hover:bg-hover"
                        >
                          <span
                            className={cn(
                              'flex h-4 w-4 items-center justify-center rounded-lg border',
                              statusFilter.has(status) ? 'border-primary-900 bg-primary-900 text-white' : 'border-line-strong',
                            )}
                          >
                            {statusFilter.has(status) && <CheckIcon size={11} />}
                          </span>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={statusFilter.has(status)}
                            onChange={() => updateFilter(() => setStatusFilter((prev) => toggleInSet(prev, status)))}
                          />
                          {status}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-faint">Priority</p>
                    <div className="space-y-1">
                      {PRIORITY_OPTIONS.map((priority) => (
                        <label
                          key={priority}
                          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-[13px] text-ink hover:bg-hover"
                        >
                          <span
                            className={cn(
                              'flex h-4 w-4 items-center justify-center rounded-lg border',
                              priorityFilter.has(priority) ? 'border-primary-900 bg-primary-900 text-white' : 'border-line-strong',
                            )}
                          >
                            {priorityFilter.has(priority) && <CheckIcon size={11} />}
                          </span>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={priorityFilter.has(priority)}
                            onChange={() => updateFilter(() => setPriorityFilter((prev) => toggleInSet(prev, priority)))}
                          />
                          {priority}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-line bg-muted px-4 py-3">
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex h-8 items-center rounded-lg bg-primary-900 px-3.5 text-[12.5px] font-medium text-white transition-colors hover:bg-primary-950"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </Popover>
        </div>
      </div>

      {searchOpen && (
        <div className="px-5 pt-3">
          <SearchInput value={query} onValueChange={setQuery} placeholder="Search account, task or type…" size="sm" />
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-y border-line text-left text-xs font-medium text-ink-faint">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-5 py-3 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className={cn(
                      'inline-flex items-center gap-1 transition-colors hover:text-ink',
                      sortColumn === col.key && 'text-brand-ink',
                    )}
                  >
                    {col.label}
                    <ChevronDownIcon
                      className={cn(
                        'h-3 w-3 shrink-0 transition-transform',
                        sortColumn === col.key ? 'opacity-100' : 'opacity-30',
                        sortColumn === col.key && sortDirection === 'asc' && 'rotate-180',
                      )}
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedRows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-5 py-10 text-center text-[13px] text-ink-faint">
                  No payments match your filters.
                </td>
              </tr>
            ) : (
              pagedRows.map((item) => (
                <tr key={item.id} className="border-b border-line last:border-0 hover:bg-hover">
                  <td className="px-5 py-3.5 font-medium text-ink">{item.name}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{item.dueDate}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{item.type}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusTone[item.status]}>{item.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-ink-soft">
                      <span className={`h-1.5 w-1.5 rounded-full ${priorityDot(item.priority)}`} />
                      {item.priority}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
