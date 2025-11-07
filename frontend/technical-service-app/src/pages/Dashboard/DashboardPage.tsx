import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function DashboardPage() {
  const { user, role } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
        <p className="text-sm text-slate-400">Panel de control • {role}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Tu rol</span>
              <Badge color="blue">{role}</Badge>
            </div>
            <div className="text-2xl font-bold">{user?.email}</div>
          </div>
        </Card>

        {role === 'User' && (
          <>
            <Card hover>
              <a href="/app/client/equipments" className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Mis dispositivos</span>
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Ver dispositivos</div>
              </a>
            </Card>

            <Card hover>
              <a href="/app/client/orders" className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Mis órdenes</span>
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Ver órdenes</div>
              </a>
            </Card>
          </>
        )}

        {role === 'Technician' && (
          <>
            <Card hover>
              <a href="/app/tech/equipments" className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Dispositivos</span>
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Gestionar dispositivos</div>
              </a>
            </Card>

            <Card hover>
              <a href="/app/tech/orders" className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Órdenes</span>
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Ver órdenes asignadas</div>
              </a>
            </Card>
          </>
        )}

        {role === 'Admin' && (
          <>
            <Card hover>
              <a href="/app/admin/users" className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Usuarios</span>
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Gestionar usuarios</div>
              </a>
            </Card>

            <Card hover>
              <a href="/app/admin/services" className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Servicios</span>
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Catálogo de servicios</div>
              </a>
            </Card>

            <Card hover>
              <a href="/app/admin/spare-parts" className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Inventario</span>
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Piezas de repuesto</div>
              </a>
            </Card>

            <Card hover>
              <a href="/app/admin/orders" className="block space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Órdenes</span>
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Todas las órdenes</div>
              </a>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
