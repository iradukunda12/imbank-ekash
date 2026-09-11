import { useNavigation } from '../../../app/routing/useNavigation';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useTheme } from '../../../features/theme/useTheme';
import { NotificationsMenu } from '../../../features/notifications/components/NotificationsMenu';
import { cn } from '../../lib/cn';
import { Avatar } from '../../components/ui/Avatar';
import { IconButton } from '../../components/ui/IconButton';
import { DropdownMenu, type MenuItem } from '../../components/ui/DropdownMenu';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  GridIcon,
  LockIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from '../../icons';
import { NAVIGATION, findActiveItem, isActivePath } from './navigation';

interface DashboardHeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onOpenProfile: () => void;
  onOpenChangePassword: () => void;
}

const titleCase = (segment: string) =>
  segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const DashboardHeader = ({
  isCollapsed,
  setIsCollapsed,
  onOpenProfile,
  onOpenChangePassword,
}: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const { path, navigate } = useNavigation();

  const crumbs = path.split('/').filter(Boolean).map(titleCase);
  const activeItem = findActiveItem(path);

  const navMenu: MenuItem[] = (() => {
    const items: MenuItem[] = [];

    if (activeItem) {
      items.push(
        { kind: 'label', id: 'current', label: 'Current page' },
        {
          id: `active-${activeItem.path}`,
          label: activeItem.label,
          icon: activeItem.icon,
          selected: true,
          onSelect: () => navigate(activeItem.path),
        },
        { kind: 'separator', id: 'active-sep' },
      );
    }

    NAVIGATION.forEach((section, sectionIndex) => {
      if (sectionIndex > 0) {
        items.push({ kind: 'separator', id: `sep-${sectionIndex}` });
      }
      if (section.title) {
        items.push({ kind: 'label', id: `label-${sectionIndex}`, label: section.title });
      }

      section.items.forEach((item) => {
        items.push({
          id: item.path,
          label: item.label,
          icon: item.icon,
          selected: isActivePath(item.path, path),
          onSelect: () => navigate(item.path),
        });

        item.children?.forEach((child) => {
          items.push({
            id: child.path,
            label: `— ${child.label}`,
            selected: isActivePath(child.path, path),
            onSelect: () => navigate(child.path),
          });
        });
      });
    });

    return items;
  })();

  const accountMenu: MenuItem[] = [
    { id: 'profile', label: 'My profile', icon: UserIcon, onSelect: onOpenProfile },
    { id: 'password', label: 'Change password', icon: LockIcon, onSelect: onOpenChangePassword },
    { id: 'settings', label: 'Account settings', icon: SettingsIcon },
    { kind: 'separator', id: 'sep' },
    { id: 'logout', label: 'Log out', icon: LogOutIcon, tone: 'danger', onSelect: () => logout() },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-20 h-[73px] bg-canvas/85 backdrop-blur-md border-b border-line',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'left-0' : 'left-0 lg:left-72',
      )}
    >
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <IconButton
            label={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <MenuIcon size={18} />
          </IconButton>

          {isCollapsed && (
            <DropdownMenu
              label="Jump to a section"
              align="start"
              items={navMenu}
              menuClassName="min-w-64 max-h-[70vh] overflow-y-auto scrollbar-thin"
              triggerClassName="inline-flex h-9 max-w-[60vw] items-center gap-2 rounded-lg border border-line px-3 text-[13px] text-ink transition-colors hover:bg-hover"
              trigger={
                <>
                  {activeItem?.icon ? (
                    <activeItem.icon size={15} className="shrink-0 text-brand-ink" />
                  ) : (
                    <GridIcon size={15} className="shrink-0 text-ink-faint" />
                  )}
                  <span className="truncate font-medium">{activeItem?.label ?? 'Menu'}</span>
                  <ChevronDownIcon size={13} className="shrink-0 text-ink-faint" />
                </>
              }
            />
          )}

          {!isCollapsed && (
            <nav aria-label="Breadcrumb" className="min-w-0">
              <ol className="flex min-w-0 items-center gap-1.5 text-[13px]">
                <li className="flex shrink-0 items-center gap-1.5 text-ink-soft">
                  <GridIcon size={15} className="text-ink-faint" />
                  <span className="hidden sm:inline">{crumbs[0] ?? 'Overview'}</span>
                </li>
                {crumbs.slice(1).map((crumb, i) => (
                  <li key={crumb} className="flex min-w-0 items-center gap-1.5">
                    <ChevronRightIcon size={13} className="shrink-0 text-ink-faint" />
                    <span className={cn('truncate', i === crumbs.length - 2 ? 'font-medium text-ink' : 'text-ink-soft')}>
                      {crumb}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-0.5">
          <IconButton
            label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggle}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </IconButton>

          <NotificationsMenu />

          <DropdownMenu
            label="Account menu"
            items={accountMenu}
            menuClassName="min-w-60"
            triggerClassName="ml-1 flex items-center gap-1 rounded-lg border border-transparent py-0.5 pl-0.5 pr-1.5 transition-colors hover:border-line hover:bg-hover"
            trigger={
              <>
                <Avatar name={user.name} src={user.avatarUrl} size={30} />
                <ChevronDownIcon size={13} className="text-ink-faint" />
              </>
            }
            header={
              <div className="flex items-center gap-2.5">
                <Avatar name={user.name} src={user.avatarUrl} size={34} />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-ink">{user.name}</p>
                  <p className="truncate text-[11.5px] text-ink-faint">{user.email}</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
