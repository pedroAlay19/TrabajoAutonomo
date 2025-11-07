import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({ 
  className = '', 
  variant = 'primary', 
  size = 'md',
  disabled,
  ...props 
}: Props) {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white disabled:bg-blue-800 disabled:text-slate-400',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white disabled:bg-slate-800 disabled:text-slate-500',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-200 disabled:text-slate-600',
    danger: 'bg-red-600 hover:bg-red-500 text-white disabled:bg-red-800 disabled:text-slate-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
