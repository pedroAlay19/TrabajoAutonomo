export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 p-4">
      <div className="text-center">
        <div className="text-6xl font-bold text-blue-500">404</div>
        <div className="mt-4 text-xl font-semibold text-slate-100">Página no encontrada</div>
        <p className="mt-2 text-slate-400">La página que buscas no existe.</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
