import { useEffect, useState, useMemo } from 'react';
import { repairOrderApi } from '../../services/api/endpoints';
import type { RepairOrder } from '../../types';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';

function getStatusColor(status: string): 'blue' | 'amber' | 'green' | 'slate' {
  if (status === 'COMPLETED') return 'green';
  if (status === 'IN_PROGRESS') return 'amber';
  if (status === 'OPEN') return 'blue';
  return 'slate';
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    repairOrderApi
      .getAll()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const total = orders.length;
    const open = orders.filter(o => o.status === 'OPEN').length;
    const inProgress = orders.filter(o => o.status === 'IN_PROGRESS').length;
    const completed = orders.filter(o => o.status === 'COMPLETED').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.estimatedCost, 0);
    
    return { total, open, inProgress, completed, totalRevenue };
  }, [orders]);

  if (loading) return <Spinner />;

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Panel de administración</h1>
        <Card className="p-12">
          <EmptyState 
            message="No hay órdenes de reparación en el sistema."
            icon={
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de administración</h1>
        <p className="mt-1 text-slate-400">Vista general del sistema de órdenes</p>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-blue-900/20 border-blue-800/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm font-medium text-blue-300">Total</p>
            </div>
            <p className="text-3xl font-bold text-blue-100">{stats.total}</p>
          </div>
        </Card>

        <Card className="bg-slate-900/20 border-slate-800/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-slate-300">Abiertas</p>
            </div>
            <p className="text-3xl font-bold text-slate-100">{stats.open}</p>
          </div>
        </Card>

        <Card className="bg-amber-900/20 border-amber-800/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-sm font-medium text-amber-300">En progreso</p>
            </div>
            <p className="text-3xl font-bold text-amber-100">{stats.inProgress}</p>
          </div>
        </Card>

        <Card className="bg-green-900/20 border-green-800/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-medium text-green-300">Completadas</p>
            </div>
            <p className="text-3xl font-bold text-green-100">{stats.completed}</p>
          </div>
        </Card>

        <Card className="bg-emerald-900/20 border-emerald-800/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-emerald-300">Ingresos</p>
            </div>
            <p className="text-3xl font-bold text-emerald-100">${stats.totalRevenue}</p>
          </div>
        </Card>
      </div>

      {/* Lista de órdenes */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Todas las órdenes</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {orders.map((order) => (
            <Card key={order.id} hover className="transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-100">Orden #{order.id.slice(0, 8)}</h3>
                    <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge color={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                <div className="grid gap-2 text-sm">
                  {order.equipment && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Dispositivo:</span>
                      <span className="text-slate-300">{order.equipment.brand} {order.equipment.model}</span>
                    </div>
                  )}
                  {order.equipment?.user && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cliente:</span>
                      <span className="text-slate-300">{order.equipment.user.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Costo:</span>
                    <span className="font-bold text-green-400">${order.estimatedCost}</span>
                  </div>
                </div>

                <div className="rounded border border-slate-800 bg-slate-900/50 p-2">
                  <p className="text-xs text-slate-400">{order.problemDescription}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
