import { useState } from 'react';
import { DropdownMenu, type MenuItem } from '../../../shared/components/ui/DropdownMenu';
import { BellIcon } from '../../../shared/icons';
import { cn } from '../../../shared/lib/cn';

interface NotificationRecord {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

const INITIAL: NotificationRecord[] = [
  { id: 'n1', title: 'Payment REB-2025-0148 was raised', time: '5m ago', read: false },
  { id: 'n2', title: 'SLA breach in 2 hours on claim #2319', time: '1h ago', read: false },
  { id: 'n3', title: 'Export ready — 482 rows', time: 'Yesterday', read: true },
];

export const NotificationsMenu = () => {
  const [notifications, setNotifications] = useState(INITIAL);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const items: MenuItem[] = [{ id: 'view-all', label: 'View all notifications' }];

  return (
    <DropdownMenu
      label="Notifications"
      items={items}
      menuClassName="min-w-72"
      triggerClassName="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-hover hover:text-ink"
      trigger={
        <>
          <BellIcon size={18} />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-canvas" />
          )}
        </>
      }
      header={
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-ink">Notifications</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-[11.5px] font-medium text-brand-ink hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="-mx-3.5 mt-2 max-h-56 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-2 px-3.5 py-2">
                <span
                  className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', n.read ? 'bg-transparent' : 'bg-brand-ink')}
                />
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] text-ink">{n.title}</p>
                  <p className="text-[11px] text-ink-faint">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default NotificationsMenu;
