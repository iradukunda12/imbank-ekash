import { useState } from 'react';
import { DropdownMenu, type MenuItem } from '../../../shared/components/ui/DropdownMenu';
import { ChevronDownIcon } from '../../../shared/icons';

const ranges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'];

export const RangePicker = () => {
  const [selected, setSelected] = useState('Last 30 days');

  const items: MenuItem[] = ranges.map((range) => ({
    id: range,
    label: range,
    onSelect: () => setSelected(range),
  }));

  return (
    <DropdownMenu
      label="Select date range"
      items={items}
      triggerClassName="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft hover:bg-hover"
      trigger={
        <>
          {selected}
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </>
      }
    />
  );
};

export default RangePicker;
