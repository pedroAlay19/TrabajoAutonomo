import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'slate' | 'blue' | 'green' | 'amber' | 'red' | 'purple';
  size?: 'sm' | 'md';
}

export default function Badge({ children, color = 'slate', size = 'sm' }: BadgeProps) {
  const colorClasses = {
    slate: 'bg-slate-800 text-slate-200',
    blue: 'bg-blue-900/40 text-blue-300',
    green: 'bg-green-900/30 text-green-300',
    amber: 'bg-amber-900/30 text-amber-300',
    red: 'bg-red-900/30 text-red-300',
    purple: 'bg-purple-900/30 text-purple-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colorClasses[color]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}
