import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({ label, error, helperText, className = '', ...props }: InputProps) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
      <input
        className={`w-full rounded-md border ${error ? 'border-red-600' : 'border-slate-700'} bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
      {helperText && !error && <span className="text-xs text-slate-500">{helperText}</span>}
    </label>
  );
}
