export default function EmptyState({ message, icon }: { message: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-12 text-center">
      {icon && <div className="mb-4 flex justify-center text-slate-600">{icon}</div>}
      <p className="text-slate-400">{message}</p>
    </div>
  );
}
