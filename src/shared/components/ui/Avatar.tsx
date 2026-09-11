import { cn } from '../../lib/cn';

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}

const PALETTE = ['#0199a6', '#017e89', '#024a51', '#2eb3bd', '#5cc9d1'];

const initialsOf = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const colorFor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
};

export const Avatar = ({ name, src, size = 32, className }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('shrink-0 rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white', className)}
      style={{ width: size, height: size, backgroundColor: colorFor(name), fontSize: Math.max(10, size * 0.38) }}
    >
      {initialsOf(name)}
    </span>
  );
};

export default Avatar;
