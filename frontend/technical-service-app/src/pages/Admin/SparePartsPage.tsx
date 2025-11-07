import { useEffect, useState } from 'react';
import { sparePartApi } from '../../services/api/endpoints';
import type { SparePart } from '../../types';
import { Table, THead, TBody, TH, TD } from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';

export default function SparePartsPage() {
  const [parts, setParts] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sparePartApi
      .getAll()
      .then(setParts)
      .catch(() => setParts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (parts.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Inventario de piezas</h1>
        <EmptyState message="No hay piezas de repuesto registradas." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventario de piezas de repuesto</h1>
          <p className="text-sm text-slate-400">Gestiona el stock de piezas</p>
        </div>
        <Button>Agregar pieza</Button>
      </div>

      <Table>
        <THead>
          <tr>
            <TH>Nombre</TH>
            <TH>Descripción</TH>
            <TH>Stock</TH>
            <TH>Precio unitario</TH>
            <TH>Actualización</TH>
          </tr>
        </THead>
        <TBody>
          {parts.map((part) => (
            <tr key={part.id}>
              <TD>
                <div className="font-medium">{part.name}</div>
              </TD>
              <TD>
                <div className="max-w-md truncate">{part.description}</div>
              </TD>
              <TD>
                <Badge color={part.stock > 10 ? 'green' : part.stock > 0 ? 'amber' : 'red'}>
                  {part.stock} unidades
                </Badge>
              </TD>
              <TD>${part.unitPrice}</TD>
              <TD>
                <span className="text-xs">{new Date(part.updatedAt).toLocaleDateString()}</span>
              </TD>
            </tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
