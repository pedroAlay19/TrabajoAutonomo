import { useEffect, useState } from 'react';
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    repairOrderApi
      .getAll()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mis órdenes de reparación</h1>
        <Card className="p-12">
          <EmptyState 
            message="Aún no tienes órdenes de reparación."
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
        <h1 className="text-3xl font-bold">Mis órdenes de reparación</h1>
        <p className="mt-1 text-slate-400">Seguimiento del historial y estado de tus reparaciones</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {orders.map((order) => (
          <Card key={order.id} hover className="transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900/30">
                    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">Orden #{order.id.slice(0, 8)}</h3>
                    <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge color={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>

              {order.equipment && (
                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                  <p className="mb-1 text-xs font-medium text-slate-500">DISPOSITIVO</p>
                  <p className="font-medium text-slate-200">{order.equipment.name}</p>
                  <p className="text-sm text-slate-400">{order.equipment.brand} {order.equipment.model}</p>
                </div>
              )}

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                <p className="mb-1 text-xs font-medium text-slate-500">PROBLEMA REPORTADO</p>
                <p className="text-sm text-slate-300">{order.problemDescription}</p>
              </div>



              <div className="flex items-center justify-between rounded-lg bg-slate-900/50 p-3">
                <span className="text-sm text-slate-400">Costo estimado</span>
                <span className="text-xl font-bold text-green-400">${order.estimatedCost}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
