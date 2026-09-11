type ClassValue = string | number | null | undefined | false | Record<string, boolean | undefined>;

/**
 * Minimal classnames combiner (no external dependency needed).
 * cn('a', condition && 'b', { c: true, d: false }) -> 'a b c'
 */
export function cn(...values: ClassValue[]): string {
  const classes: string[] = [];

  for (const value of values) {
    if (!value) continue;

    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value));
      continue;
    }

    for (const key in value) {
      if (value[key]) classes.push(key);
    }
  }

  return classes.join(' ');
}
