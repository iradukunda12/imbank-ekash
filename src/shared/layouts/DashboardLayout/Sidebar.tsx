import { useState } from 'react';
import Brand from './Brand';
import { useNavigation } from '../../../app/routing/useNavigation';
import { cn } from '../../lib/cn';
import { SearchInput } from '../../components/ui/SearchInput';
import { ChevronDownIcon, PanelLeftIcon } from '../../icons';
import { NAVIGATION, isActivePath, type NavItem, type NavSection } from './navigation';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  className?: string;
}

const SectionTitle = ({ children }: { children: string }) => (
  <p className="px-3 pb-2 pt-5 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-primary-400/85">{children}</p>
);

const NavLink = ({ item, depth, onNavigate }: { item: NavItem; depth: number; onNavigate: () => void }) => {
  const { path, navigate } = useNavigation();
  const active = isActivePath(item.path, path);
  const hasChildren = Boolean(item.children?.length);
  const [open, setOpen] = useState(active);

  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) setOpen((prev) => !prev);
    navigate(item.path);
    onNavigate();
  };

  return (
    <li className={cn(depth > 0 && 'relative pl-6')}>
      {depth > 0 && (
        <>
          <span
            aria-hidden
            className="absolute left-0 top-0 h-[calc(50%+1px)] w-3.5 rounded-bl-[7px] border-b border-l border-line-strong"
          />
          <span
            aria-hidden
            className="absolute left-[0.75rem] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-line-strong"
          />
        </>
      )}

      <button
        type="button"
        onClick={handleClick}
        aria-current={active && !hasChildren ? 'page' : undefined}
        aria-expanded={hasChildren ? open : undefined}
        className={cn(
          'group flex h-10 w-full items-center gap-2.5 rounded-lg px-2.5',
          'text-[13px] transition-colors duration-150',
          depth > 0 && 'h-8 px-2.5 text-[12.5px]',
          active ? 'bg-brand-tint font-medium text-brand-ink' : 'text-ink-soft hover:bg-hover hover:text-ink',
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              'shrink-0 transition-colors',
              depth === 0 ? 'h-[18px] w-[18px]' : 'h-[15px] w-[15px]',
              active ? 'text-brand-ink' : 'text-ink-faint group-hover:text-ink-soft',
            )}
          />
        )}
        <span className="flex-1 truncate text-left">{item.label}</span>
        {hasChildren && (
          <ChevronDownIcon
            className={cn(
              'h-3.5 w-3.5 shrink-0 transition-transform duration-200',
              active ? 'text-brand-ink' : 'text-ink-faint',
              !open && '-rotate-90',
            )}
          />
        )}
      </button>

      {hasChildren && open && (
        <ul className="ml-[1.1rem] mt-0.5 space-y-0.5">
          {item.children!.map((child) => (
            <NavLink key={child.path} item={child} depth={depth + 1} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  );
};

const NavGroup = ({ section, onNavigate }: { section: NavSection; onNavigate: () => void }) => (
  <div>
    {section.title && <SectionTitle>{section.title}</SectionTitle>}
    <ul className="space-y-0.5">
      {section.items.map((item) => (
        <NavLink key={item.path} item={item} depth={0} onNavigate={onNavigate} />
      ))}
    </ul>
  </div>
);

export const Sidebar = ({ isCollapsed, setIsCollapsed, className }: SidebarProps) => {
  const [query, setQuery] = useState('');

  const handleNavigate = () => {
    if (window.innerWidth < 1024) setIsCollapsed(true);
  };

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'flex w-72 flex-col bg-gradient-to-t from-brand-tint/50 via-canvas to-canvas border-r border-line shadow-[6px_0_24px_-18px_rgba(15,23,42,0.18)]',
        'transition-transform duration-300 ease-in-out',
        isCollapsed ? '-translate-x-full' : 'translate-x-0',
        className,
      )}
    >
      <div className="flex h-[73px] shrink-0 items-center justify-between gap-2 px-4">
        <Brand />
        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-hover hover:text-ink"
        >
          <PanelLeftIcon className="h-[17px] w-[17px]" />
        </button>
      </div>

      <div className="shrink-0 px-3 pb-4">
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search anything"
          shortcut="&#8984; K"
          borderClassName="border-primary-200"
        />
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-4">
        {NAVIGATION.map((section) => (
          <NavGroup key={section.title ?? section.items[0].path} section={section} onNavigate={handleNavigate} />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
