export interface SelectOption {
  value: string;
  label: string;
  /** Second line of detail — a code, an email, a region. */
  hint?: string;
  group?: string;
  disabled?: boolean;
}

export const groupOptions = (options: SelectOption[]): [string | undefined, SelectOption[]][] => {
  const order: (string | undefined)[] = [];
  const buckets = new Map<string | undefined, SelectOption[]>();

  for (const option of options) {
    if (!buckets.has(option.group)) {
      buckets.set(option.group, []);
      order.push(option.group);
    }
    buckets.get(option.group)!.push(option);
  }

  return order.map((group) => [group, buckets.get(group)!]);
};
