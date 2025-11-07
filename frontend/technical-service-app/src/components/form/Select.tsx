import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export default function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
      <select
        className={`w-full rounded-md border ${error ? 'border-red-600' : 'border-slate-700'} bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
