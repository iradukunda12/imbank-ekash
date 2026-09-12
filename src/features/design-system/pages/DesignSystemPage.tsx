import { useState } from 'react';
import { createPortal } from 'react-dom';
import Card from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { IconButton } from '../../../shared/components/ui/IconButton';
import { Badge, PriorityBars } from '../../../shared/components/ui/Badge';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { Field, Select, TextInput } from '../../../shared/components/ui/Field';
import { SearchInput } from '../../../shared/components/ui/SearchInput';
import { MultiSelect } from '../../../shared/components/ui/MultiSelect';
import { SearchSelect } from '../../../shared/components/ui/SearchSelect';
import { Spinner } from '../../../shared/components/ui/Spinner';
import { Skeleton, SkeletonText } from '../../../shared/components/ui/Skeleton';
import { LoadingScreen } from '../../../shared/components/LoadingScreen';
import { DropdownMenu, type MenuItem } from '../../../shared/components/ui/DropdownMenu';
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableActionsMenu,
} from '../../../shared/components/ui/Table';
import { Modal } from '../../../shared/components/ui/Modal';
import { Popover } from '../../../shared/components/ui/Popover';
import { ToastCard } from '../../../shared/components/ui/toast/ToastViewport';
import { useToast } from '../../../shared/components/ui/toast/useToast';
import type { ToastTone } from '../../../shared/components/ui/toast/toast-context';
import {
  ArchiveIcon,
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  DownloadIcon,
  EyeIcon,
  MoreVerticalIcon,
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  WalletIcon,
} from '../../../shared/icons';
import { Row, Section } from '../components/Section';
import { CLAIM_TYPE_OPTIONS, DEALER_OPTIONS, MINISTRY_OPTIONS } from '../data/options';

const TOKENS = [
  { name: 'brand', className: 'bg-brand' },
  { name: 'secondary', className: 'bg-secondary' },
  { name: 'accent', className: 'bg-accent' },
  { name: 'brand-tint', className: 'bg-brand-tint' },
  { name: 'canvas', className: 'bg-canvas' },
  { name: 'surface', className: 'bg-surface' },
  { name: 'muted', className: 'bg-muted' },
  { name: 'line', className: 'bg-line' },
  { name: 'success', className: 'bg-success' },
  { name: 'warning', className: 'bg-warning' },
  { name: 'danger', className: 'bg-danger' },
  { name: 'info', className: 'bg-info' },
];

const LONG_MESSAGE =
  "The dealer's bank details failed validation with the payment provider: the IBAN checksum does not match the account holder on file, and the mandate reference expired on 12 August. Re-verify the account, then resubmit the payment batch — claims already approved will keep their original approval date.";

const TONES: { tone: ToastTone; title: string; description: string }[] = [
  { tone: 'success', title: 'Payment created', description: 'REB-2025-0148 was raised against Northwind Retail Group.' },
  { tone: 'error', title: "Couldn't submit claim", description: 'The dealer account is suspended. Contact compliance.' },
  { tone: 'warning', title: 'SLA breach in 2 hours', description: 'Claim #2319 still sits with an unassigned reviewer.' },
  { tone: 'info', title: 'Export ready', description: '482 rows exported for the current filter.' },
];

export const DesignSystemPage = () => {
  const { toast, dismiss } = useToast();

  const [dealers, setDealers] = useState<string[]>(['northwind', 'veritas']);
  const [claimTypes, setClaimTypes] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [ministry, setMinistry] = useState<string | null>('psc');
  const [currency, setCurrency] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const sampleMenu: MenuItem[] = [
    { kind: 'label', id: 'l', label: 'Actions' },
    { id: 'view', label: 'View claim', icon: EyeIcon, hint: 'V' },
    { id: 'pay', label: 'Raise payment', icon: WalletIcon },
    { id: 'export', label: 'Export as CSV', icon: DownloadIcon },
    { kind: 'separator', id: 's' },
    { id: 'archive', label: 'Archive', icon: ArchiveIcon, disabled: true },
    { id: 'delete', label: 'Delete claim', icon: TrashIcon, tone: 'danger' },
  ];

  return (
    <div className="w-full space-y-6 p-4 sm:p-6">
      <header>
        <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-ink sm:text-[25px]">Design system</h1>
        <p className="mt-1 text-[13px] text-ink-soft">
          Every reusable piece of the eKash portal, live and interactive. Copy the import path, drop it into a feature.
        </p>
      </header>

      <Section
        id="tokens"
        title="Colour tokens"
        description="Defined once in src/index.css. Both themes share these names."
        source="bg-brand · text-ink-soft · border-line"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {TOKENS.map((token) => (
            <div key={token.name} className="space-y-1.5">
              <div className={`h-12 rounded-lg border border-line ${token.className}`} />
              <p className="text-[11.5px] text-ink-soft">{token.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="buttons" title="Buttons" description="Four variants, all 36px tall, all keyboard focusable." source="shared/components/ui/Button">
        <Row label="Variants">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Row>

        <Row label="With icon">
          <Button icon={<PlusIcon size={15} />}>New claim</Button>
          <Button variant="secondary" icon={<DownloadIcon size={15} />}>
            Export
          </Button>
        </Row>

        <Row label="States">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </Row>

        <Row label="Icon only">
          <IconButton label="Settings">
            <SettingsIcon size={18} />
          </IconButton>
          <IconButton label="More">
            <MoreVerticalIcon size={18} />
          </IconButton>
        </Row>

        <Row label="Full width">
          <div className="w-full sm:w-64">
            <Button block icon={<WalletIcon size={15} />}>
              Raise payment
            </Button>
          </div>
        </Row>
      </Section>

      <Section
        id="multiselect"
        title="Multi-select field"
        description="Chips for what's chosen, type to filter, grouped options, disabled entries, clear-all. Backspace on an empty filter removes the last chip."
        source="shared/components/ui/MultiSelect"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Dealer accounts" htmlFor="ds-dealers" hint={`${dealers.length} selected · grouped by region`}>
            <MultiSelect id="ds-dealers" options={DEALER_OPTIONS} value={dealers} onChange={setDealers} placeholder="Select dealers…" />
          </Field>

          <Field label="Claim types" htmlFor="ds-types" hint="No search box — short lists don't need one.">
            <MultiSelect
              id="ds-types"
              options={CLAIM_TYPE_OPTIONS}
              value={claimTypes}
              onChange={setClaimTypes}
              searchable={false}
              placeholder="Any type"
            />
          </Field>
        </div>
      </Section>

      <Section
        id="search-select"
        title="Single-select with search"
        description="A combobox for lists too long for a native select. Type to filter on the label or the hint line, ↑/↓ to move, Enter to choose. Groups, two-line options, disabled entries and an optional clear button."
        source="shared/components/ui/SearchSelect"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Ministry or Commission" htmlFor="ds-ministry" hint="Searchable, grouped, with a code on the second line.">
            <SearchSelect id="ds-ministry" options={MINISTRY_OPTIONS} value={ministry} onChange={setMinistry} placeholder="Search ministries…" clearable />
          </Field>

          <Field label="Currency" htmlFor="ds-currency" hint="searchable={false} — short lists don't need a filter box.">
            <SearchSelect
              id="ds-currency"
              options={[
                { value: 'usd', label: 'USD · US Dollar' },
                { value: 'rwf', label: 'RWF · Rwandan Franc' },
                { value: 'zar', label: 'ZAR · South African Rand' },
              ]}
              value={currency}
              onChange={setCurrency}
              searchable={false}
              placeholder="Select a currency"
            />
          </Field>
        </div>
      </Section>

      <Section
        id="inputs"
        title="Inputs & search"
        description="Search clears itself, shows a shortcut hint, and comes in two heights."
        source="shared/components/ui/SearchInput · Field · TextInput · Select"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Search (medium)" hint="Type to reveal the clear button.">
            <SearchInput value={search} onValueChange={setSearch} placeholder="Search claims" shortcut="&#8984; K" />
          </Field>

          <Field label="Search (small)">
            <SearchInput value={search} onValueChange={setSearch} placeholder="Filter" size="sm" />
          </Field>

          <Field label="Text input" htmlFor="ds-text">
            <TextInput id="ds-text" placeholder="REB-2025-0148" />
          </Field>

          <Field label="Select" htmlFor="ds-select">
            <Select id="ds-select" defaultValue="RWF">
              <option>RWF</option>
              <option>USD</option>
              <option>EUR</option>
            </Select>
          </Field>

          <Field label="Disabled" htmlFor="ds-disabled" hint="Read-only value.">
            <TextInput id="ds-disabled" value="alex.johnson@imbank.rw" disabled readOnly />
          </Field>
        </div>
      </Section>

      <Section
        id="dropdowns"
        title="Dropdown menus"
        description="Click-outside, Escape, arrow-key navigation. Supports labels, separators, hints, checks, disabled and danger items."
        source="shared/components/ui/DropdownMenu"
      >
        <Row label="Button trigger">
          <DropdownMenu
            label="Sample actions"
            items={sampleMenu}
            align="start"
            triggerClassName="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-primary text-on-brand text-[13px] font-medium hover:bg-primary-soft transition-colors"
            trigger={
              <>
                <PlusIcon size={14} />
                Add
                <ChevronDownIcon size={13} className="opacity-70" />
              </>
            }
          />

          <DropdownMenu
            label="Sample actions outline"
            items={sampleMenu}
            align="start"
            triggerClassName="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-line-strong text-[13px] text-ink hover:bg-hover transition-colors"
            trigger={
              <>
                Options
                <ChevronDownIcon size={13} className="text-ink-faint" />
              </>
            }
          />
        </Row>

        <Row label="Icon trigger">
          <DropdownMenu
            label="Row actions"
            items={sampleMenu}
            align="start"
            triggerClassName="inline-flex items-center justify-center h-9 w-9 rounded-lg text-ink-soft hover:bg-hover hover:text-ink transition-colors"
            trigger={<MoreVerticalIcon size={16} />}
          />
        </Row>
      </Section>

      <Section
        id="toasts"
        title="Toasts"
        description="Stack top-centre, auto-dismiss after 4.5s, max three on screen. Anything longer than two lines collapses behind Show more."
        source="shared/components/ui/toast/useToast"
      >
        <Row label="Fire one">
          {TONES.map((t) => (
            <Button key={t.tone} variant="secondary" onClick={() => toast({ tone: t.tone, title: t.title, description: t.description })}>
              {t.tone}
            </Button>
          ))}
        </Row>

        <Row label="With action">
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                tone: 'success',
                title: 'Claim #2319 archived',
                description: 'It will drop out of the SLA table.',
                action: { label: 'Undo', onClick: () => undefined },
              })
            }
          >
            Undo toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast({ tone: 'warning', title: 'Sticky notification', description: 'duration: 0 — stays until dismissed.', duration: 0 })}
          >
            Persistent
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast({ tone: 'error', title: 'Payment batch rejected', description: LONG_MESSAGE, duration: 0 })}
          >
            Long message
          </Button>
        </Row>

        <div className="space-y-2.5 pt-4">
          <p className="text-[12px] font-medium text-ink-faint">Static preview</p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {TONES.map((t) => (
              <ToastCard key={t.tone} standalone onDismiss={dismiss} toast={{ id: `preview-${t.tone}`, tone: t.tone, title: t.title, description: t.description }} />
            ))}
            <ToastCard standalone onDismiss={dismiss} toast={{ id: 'preview-long', tone: 'error', title: 'Payment batch rejected', description: LONG_MESSAGE }} />
          </div>
        </div>
      </Section>

      <Section
        id="popover"
        title="Popover & filter panel"
        description="A floating panel with free-form content — forms, pickers, anything that isn't a menu. Nested panels layer correctly, which is how the multi-select below works inside it."
        source="shared/components/ui/Popover"
      >
        <Row label="Panel">
          <Popover
            label="Example filters"
            align="start"
            triggerClassName="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-line-strong text-[13px] text-ink hover:bg-hover transition-colors"
            trigger={
              <>
                Filters
                <ChevronDownIcon size={13} className="text-ink-faint" />
              </>
            }
          >
            {({ close }) => (
              <>
                <header className="flex h-12 items-center border-b border-line px-4">
                  <h3 className="text-[13px] font-semibold text-ink">Filter dealers</h3>
                </header>

                <div className="space-y-3.5 p-4">
                  <Field label="Dealer accounts">
                    <MultiSelect options={DEALER_OPTIONS} value={dealers} onChange={setDealers} placeholder="Any dealer" maxChips={2} usePortal />
                  </Field>

                  <Field label="Reference">
                    <TextInput placeholder="REB-2025-…" />
                  </Field>
                </div>

                <footer className="flex items-center justify-end gap-2 border-t border-line bg-muted px-4 py-3">
                  <Button variant="ghost" onClick={close}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      close();
                      toast({ tone: 'success', title: 'Filters applied' });
                    }}
                  >
                    Apply
                  </Button>
                </footer>
              </>
            )}
          </Popover>
        </Row>
      </Section>

      <Section id="badges" title="Status & identity" description="Badges take their colour from status tokens." source="shared/components/ui/Badge · Avatar">
        <Row label="Badges">
          <Badge tone="success" icon={<CheckIcon size={14} />}>
            Delivered
          </Badge>
          <Badge tone="info" icon={<EyeIcon size={14} />}>
            In Review
          </Badge>
          <Badge tone="warning" icon={<ClockIcon size={14} />}>
            In Progress
          </Badge>
          <Badge tone="danger" icon={<ClockIcon size={14} />}>
            Blocked
          </Badge>
          <Badge tone="brand">Brand</Badge>
        </Row>

        <Row label="Priority">
          <Badge tone="neutral" icon={<PriorityBars level={1} />}>
            Low
          </Badge>
          <Badge tone="warning" icon={<PriorityBars level={2} />}>
            Medium
          </Badge>
          <Badge tone="danger" icon={<PriorityBars level={3} />}>
            High
          </Badge>
        </Row>

        <Row label="Avatars">
          <Avatar name="Alex Johnson" size={24} />
          <Avatar name="John Doe" size={32} />
          <Avatar name="Michael Wong" size={40} />
          <Avatar name="Sarah Lee" size={52} />
        </Row>
      </Section>

      <Section
        id="data-table"
        title="Data table"
        description="A shared Table primitive (not hand-rolled markup per feature): sortable columns use a chevrons-up-down icon, and each row's Actions menu is a bordered button (not a bare icon) that renders through a portal, so it always escapes a horizontally-scrolling table. This exact component is what the real Upcoming Payments table is built from."
        source="shared/components/ui/Table"
      >
        <div className="overflow-hidden rounded-lg border border-line">
          <Table>
            <TableHead>
              <TableHeaderCell className="w-[104px]">Actions</TableHeaderCell>
              <TableHeaderCell sortable active>
                Task
              </TableHeaderCell>
              <TableHeaderCell sortable>Status</TableHeaderCell>
              <TableHeaderCell sortable>Priority</TableHeaderCell>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TableActionsMenu
                    label="Row actions example"
                    items={[
                      { id: 'view', label: 'View details', icon: EyeIcon },
                      { id: 'remind', label: 'Send reminder', icon: BellIcon },
                    ]}
                  />
                </TableCell>
                <TableCell className="font-medium text-ink">Business Loan Installment</TableCell>
                <TableCell>
                  <Badge tone="warning" icon={<ClockIcon size={14} />}>
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge tone="danger" icon={<PriorityBars level={3} />}>
                    High
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TableActionsMenu
                    label="Row actions example"
                    items={[
                      { id: 'view', label: 'View details', icon: EyeIcon },
                      { id: 'remind', label: 'Send reminder', icon: BellIcon },
                    ]}
                  />
                </TableCell>
                <TableCell className="font-medium text-ink">Rebate Claim REB-0148</TableCell>
                <TableCell>
                  <Badge tone="info" icon={<EyeIcon size={14} />}>
                    In Progress
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge tone="neutral" icon={<PriorityBars level={1} />}>
                    Low
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section id="modal" title="Modal" description="Escape to close, scroll locked behind it, footer actions pinned." source="shared/components/ui/Modal">
        <Row label="Open">
          <Button onClick={() => setModalOpen(true)}>Show modal</Button>
        </Row>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example modal"
          description="Every feature modal composes this one."
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false);
                  toast({ tone: 'success', title: 'Saved' });
                }}
              >
                Save changes
              </Button>
            </>
          }
        >
          <Field label="Reference" htmlFor="ds-modal-ref">
            <TextInput id="ds-modal-ref" placeholder="REB-2025-0149" />
          </Field>
        </Modal>
      </Section>

      <Section
        id="loading"
        title="Loading states"
        description="Match the wait to the surface: a spinner inside a control, skeletons where content will land, the full boot screen only while the session is restoring."
        source="shared/components/ui/Spinner · Skeleton · LoadingScreen"
      >
        <Row label="Spinner">
          <Spinner size={16} className="text-ink-faint" />
          <Spinner size={20} className="text-brand-ink" />
          <Spinner size={28} thickness={3} className="text-brand-ink" />
          <Button disabled>
            <Spinner size={14} className="mr-1.5 text-on-brand" />
            Saving…
          </Button>
        </Row>

        <Row label="Boot screen">
          <Button variant="secondary" onClick={() => setShowLoader(true)}>
            Preview full-page loader
          </Button>
        </Row>

        <div className="pt-4">
          <p className="mb-2.5 text-[12px] font-medium text-ink-faint">Skeletons</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton circle className="h-10 w-10" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
              <SkeletonText lines={3} className="mt-4" />
            </Card>

            <Card className="space-y-3 p-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-32" />
              <div className="flex h-11 items-end gap-1.5 pt-1">
                {[40, 65, 50, 80, 60, 95, 70, 100].map((h, i) => (
                  <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {showLoader &&
          createPortal(
            <div className="fixed inset-0 z-[200]">
              <LoadingScreen message="This is the boot screen — click to dismiss" />
              <button
                type="button"
                aria-label="Dismiss the loader preview"
                onClick={() => setShowLoader(false)}
                className="absolute inset-0 cursor-pointer"
              />
            </div>,
            document.body,
          )}
      </Section>

      <Section id="cards" title="Cards" description="The panel every dashboard block sits on." source="shared/components/ui/Card">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-[13px] font-medium text-ink-soft">Plain card</p>
            <p className="mt-2 text-[24px] font-semibold text-ink">1,204</p>
          </Card>
          <Card className="border-brand/30 bg-brand-tint p-4">
            <p className="text-[13px] font-medium text-brand-ink">Brand tinted</p>
            <p className="mt-2 text-[24px] font-semibold text-ink">92%</p>
          </Card>
          <Card className="flex items-center justify-center border-dashed p-4">
            <Button variant="ghost" icon={<PlusIcon size={15} />}>
              Add widget
            </Button>
          </Card>
        </div>
      </Section>
    </div>
  );
};

export default DesignSystemPage;
