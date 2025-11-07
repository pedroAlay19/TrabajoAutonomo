import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to={user ? "/app/home" : "/"} className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-blue-500">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <span className="text-lg">TechService</span>
        </Link>

        <nav className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors">
                Iniciar sesión
              </Link>
              <Link to="/register">
                <Button size="sm">Registrarse</Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm">
                <div className="hidden sm:block text-right">
                  <div className="font-medium text-slate-200">{user.name}</div>
                  <div className="text-xs text-slate-400">{user.role}</div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Salir
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
