export default function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="grid place-items-center py-12">
      <div className={`animate-spin rounded-full border-2 border-slate-600 border-t-blue-500 ${sizeClasses[size]}`} />
    </div>
  );
}
