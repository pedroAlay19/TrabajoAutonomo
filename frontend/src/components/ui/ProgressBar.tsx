/**
 * ProgressBar Component
 * Barra de progreso animada y configurable
 */

import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'blue' | 'green' | 'yellow' | 'red';
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const colorStyles = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  yellow: 'bg-yellow-500',
  red: 'bg-red-600',
};

const heightStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'blue',
  showLabel = false,
  height = 'md',
  animated = true,
  className = '',
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Progreso</span>
          <span className="text-sm font-medium text-gray-700">{normalizedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightStyles[height]}`}>
        <div
          className={`
            ${colorStyles[color]} 
            ${heightStyles[height]} 
            rounded-full transition-all duration-500 ease-out
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};
