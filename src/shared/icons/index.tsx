import type { SVGProps } from 'react';

/**
 * Minimal inline icon set (no external icon package required).
 * Every icon accepts standard SVG props so size/color can be
 * controlled with className, e.g. className="h-5 w-5 text-primary-600".
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const MenuIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const SearchIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const BellIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M6 8a6 6 0 1 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 12.5 6 8Z" />
    <path d="M10 21a2 2 0 0 0 4 0" />
  </svg>
);

export const ChevronDownIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const DashboardIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);

export const WalletIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3" />
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M16 13.5h3" />
  </svg>
);

export const TransactionsIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M7 7h11l-3-3M17 17H6l3 3" />
  </svg>
);

export const RebateIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

export const ReportsIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M4 19V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14" />
    <path d="M4 19h16M8 15v-4M12 15V8M16 15v-6" />
  </svg>
);

export const SupportIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" />
    <path d="M12 17h.01" />
  </svg>
);

export const SettingsIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
  </svg>
);

export const LogoutIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

export const CloseIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const PlusIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const TrendUpIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);

export const RefreshIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export const FilterIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M4 5h16l-6 8v5l-4 2v-7L4 5Z" />
  </svg>
);

export const SortIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M7 4v16M4 7l3-3 3 3M17 20V4M14 17l3 3 3-3" />
  </svg>
);

export const UserIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

export const LockIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
  </svg>
);

export const CardIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M7 15h4" />
  </svg>
);

export const PanelLeftIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16" />
  </svg>
);

export const MoreVerticalIcon = (props: IconProps) => (
  <svg {...base} {...props} fill="currentColor" stroke="none">
    <circle cx="12" cy="5" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="19" r="1.6" />
  </svg>
);

export const DownloadIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);

export const ColumnsIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16M15 4v16" />
  </svg>
);

export const ArchiveIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
    <path d="M10 13h4" />
  </svg>
);

export const CheckIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);

export const ClockIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const EyeIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const TrashIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m3 0-.8 12.2a2 2 0 0 1-2 1.8H8.8a2 2 0 0 1-2-1.8L6 7" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const GridIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
);

export const MoonIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);

export const SunIcon = ({ size, ...props }: IconProps) => (
  <svg {...base} width={size} height={size} {...props}>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
);

// Same glyph as LogoutIcon — some call sites use the "LogOut" spelling.
export const LogOutIcon = LogoutIcon;
