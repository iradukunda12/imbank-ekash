import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ children, className = '', ...rest }: CardProps) => (
  <div className={`card-surface p-5 ${className}`} {...rest}>
    {children}
  </div>
);

export default Card;
