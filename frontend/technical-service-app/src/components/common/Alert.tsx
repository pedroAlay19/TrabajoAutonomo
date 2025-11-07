import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  intent?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
}

export default function Alert({ children, intent = 'info', onClose }: AlertProps) {
  const intentClasses = {
    info: 'bg-blue-950/60 text-blue-200 border-blue-900',
    success: 'bg-green-950/60 text-green-200 border-green-900',
    warning: 'bg-amber-950/60 text-amber-200 border-amber-900',
    error: 'bg-red-950/60 text-red-200 border-red-900',
  };

  return (
    <div className={`rounded-md border p-4 text-sm ${intentClasses[intent]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">{children}</div>
        {onClose && (
          <button 
            onClick={onClose}
            className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
            aria-label="Cerrar"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
