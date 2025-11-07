import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const linkBase = 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white';
const linkActive = 'bg-slate-800 text-white font-medium';

export default function Sidebar() {
  const { user, role } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950/40 p-4">
      <nav className="space-y-1">
        <NavLink 
          to="/app/home" 
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Inicio
        </NavLink>

        {role === 'User' && (
          <>
            <div className="pt-4 pb-2">
              <div className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Cliente
              </div>
            </div>
            <NavLink 
              to="/app/client/equipments" 
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Mis dispositivos
            </NavLink>
            <NavLink 
              to="/app/client/orders" 
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Mis órdenes
            </NavLink>
          </>
        )}

        {role === 'Technician' && (
          <>
            <div className="pt-4 pb-2">
              <div className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Técnico
              </div>
            </div>
            <NavLink 
              to="/app/tech/equipments" 
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Dispositivos
            </NavLink>
            <NavLink 
              to="/app/tech/orders" 
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Órdenes asignadas
            </NavLink>
          </>
        )}

        {role === 'Admin' && (
          <>
            <div className="pt-4 pb-2">
              <div className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Administración
              </div>
            </div>
            <NavLink 
              to="/app/admin/users" 
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Usuarios
            </NavLink>
            <NavLink 
              to="/app/admin/services" 
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Servicios
            </NavLink>
            <NavLink 
              to="/app/admin/spare-parts" 
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Inventario (Piezas)
            </NavLink>
            <NavLink 
              to="/app/admin/orders" 
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Órdenes de reparación
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
