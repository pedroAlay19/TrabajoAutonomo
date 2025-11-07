import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`rounded-lg border border-slate-800 bg-slate-900/60 p-4 ${hover ? 'hover:border-slate-700 transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
