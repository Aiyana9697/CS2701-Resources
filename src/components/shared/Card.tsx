import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'danger' | 'warning';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const borderClass = 
    variant === 'danger' ? 'border-red-500/50' :
    variant === 'warning' ? 'border-yellow-500/50' :
    'border-cyan-500/30';

  return (
    <div className={`bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-6 border ${borderClass} ${className}`}>
      {children}
    </div>
  );
}
