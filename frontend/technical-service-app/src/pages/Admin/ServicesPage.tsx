import { useEffect, useState } from 'react';
import { serviceApi } from '../../services/api/endpoints';
import type { MaintenanceService } from '../../types';
import { Table, THead, TBody, TH, TD } from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';

export default function ServicesPage() {
  const [services, setServices] = useState<MaintenanceService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceApi
      .getAll()
      .then(setServices)
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (services.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <EmptyState message="No hay servicios configurados." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catálogo de servicios</h1>
          <p className="text-sm text-slate-400">Gestiona los servicios ofrecidos</p>
        </div>
        <Button>Crear servicio</Button>
      </div>

      <Table>
        <THead>
          <tr>
            <TH>Nombre</TH>
            <TH>Descripción</TH>
            <TH>Precio base</TH>
            <TH>Tiempo est.</TH>
            <TH>Estado</TH>
          </tr>
        </THead>
        <TBody>
          {services.map((service) => (
            <tr key={service.id}>
              <TD>
                <div className="font-medium">{service.serviceName}</div>
              </TD>
              <TD>
                <div className="max-w-md truncate">{service.description}</div>
              </TD>
              <TD>${service.basePrice}</TD>
              <TD>
                {service.estimatedTimeMinutes
                  ? `${Math.round(service.estimatedTimeMinutes / 60)}h`
                  : 'N/A'}
              </TD>
              <TD>
                <Badge color={service.active ? 'green' : 'slate'}>
                  {service.active ? 'Activo' : 'Inactivo'}
                </Badge>
              </TD>
            </tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
