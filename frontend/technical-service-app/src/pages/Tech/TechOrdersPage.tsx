import { useEffect, useState } from 'react';
import { repairOrderApi } from '../../services/api/endpoints';
import type { RepairOrder } from '../../types';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Select from '../../components/form/Select';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import Alert from '../../components/common/Alert';

function getStatusColor(status: string): 'blue' | 'amber' | 'green' | 'slate' {
  if (status === 'COMPLETED') return 'green';
  if (status === 'IN_PROGRESS') return 'amber';
  if (status === 'OPEN') return 'blue';
  return 'slate';
}

export default function TechOrdersPage() {
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<RepairOrder | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await repairOrderApi.getAll();
      setOrders(data);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus() {
    if (!selectedOrder || !newStatus) return;

    try {
      await repairOrderApi.update(selectedOrder.id, { status: newStatus });
      setSuccess('Estado actualizado correctamente');
      setSelectedOrder(null);
      await loadOrders();
    } catch (err: any) {
      alert('Error al actualizar el estado');
    }
  }

  if (loading) return <Spinner />;

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Órdenes asignadas</h1>
        <Card className="p-12">
          <EmptyState 
            message="No hay órdenes de reparación asignadas."
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
        <h1 className="text-3xl font-bold">Órdenes de reparación</h1>
        <p className="mt-1 text-slate-400">Gestiona y actualiza las órdenes asignadas</p>
      </div>

      {success && <Alert intent="success" onClose={() => setSuccess(null)}>{success}</Alert>}

      <div className="grid gap-6 lg:grid-cols-2">
        {orders.map((order) => (
          <Card key={order.id} hover className="transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-900/30">
                    <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
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
                  <p className="font-medium text-slate-200">
                    {order.equipment.brand} {order.equipment.model}
                  </p>
                  {order.equipment.name && (
                    <p className="text-sm text-slate-400">{order.equipment.name}</p>
                  )}
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

              <Button
                className="w-full"
                variant="primary"
                onClick={() => {
                  setSelectedOrder(order);
                  setNewStatus(order.status);
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar estado
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={!!selectedOrder}
        title="Actualizar estado de orden"
        onClose={() => setSelectedOrder(null)}
      >
        <div className="space-y-4">
          {selectedOrder && (
            <div className="rounded-lg bg-slate-900/50 p-3">
              <p className="mb-1 text-xs text-slate-500">Orden</p>
              <p className="font-mono text-sm">{selectedOrder.id.slice(0, 8)}</p>
            </div>
          )}
          
          <Select
            label="Nuevo estado"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            options={[
              { value: 'OPEN', label: 'Abierta' },
              { value: 'IN_PROGRESS', label: 'En progreso' },
              { value: 'COMPLETED', label: 'Completada' },
            ]}
          />

          <div className="flex gap-3">
            <Button onClick={handleUpdateStatus} className="flex-1">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Guardar
            </Button>
            <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
