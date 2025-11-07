import { useEffect, useState } from 'react';
import { equipmentApi } from '../../services/api/endpoints';
import type { Equipment } from '../../types';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';

export default function TechEquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    equipmentApi
      .getAll()
      .then(setEquipments)
      .catch(() => setEquipments([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (equipments.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dispositivos en reparación</h1>
        <Card className="p-12">
          <EmptyState 
            message="No hay dispositivos registrados en el sistema."
            icon={
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
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
        <h1 className="text-3xl font-bold">Dispositivos en reparación</h1>
        <p className="mt-1 text-slate-400">Todos los dispositivos registrados en el sistema</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {equipments.map((eq) => (
          <Card key={eq.id} hover className="transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900/30">
                    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">{eq.name}</h3>
                    <p className="text-xs text-slate-500">{eq.type}</p>
                  </div>
                </div>
                <Badge color="blue">{eq.currentStatus}</Badge>
              </div>

              <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Marca:</span>
                  <span className="font-medium text-slate-300">{eq.brand}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Modelo:</span>
                  <span className="font-medium text-slate-300">{eq.model}</span>
                </div>
                {eq.serialNumber && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">S/N:</span>
                    <span className="font-mono text-xs text-slate-400">{eq.serialNumber}</span>
                  </div>
                )}
              </div>

              {eq.user && (
                <div className="flex items-center gap-2 rounded-lg border border-blue-800/30 bg-blue-900/20 p-3">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500">Cliente</p>
                    <p className="text-sm font-medium text-blue-300">{eq.user.name}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
