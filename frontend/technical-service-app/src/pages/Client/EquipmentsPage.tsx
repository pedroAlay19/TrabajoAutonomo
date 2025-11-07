import { useEffect, useState } from 'react';
import { equipmentApi } from '../../services/api/endpoints';
import type { Equipment } from '../../types';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/form/Input';
import TextArea from '../../components/form/TextArea';
import Select from '../../components/form/Select';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import Alert from '../../components/common/Alert';

export default function EquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'SMARTPHONE',
    brand: '',
    model: '',
    serialNumber: '',
    observations: '',
  });

  useEffect(() => {
    loadEquipments();
  }, []);

  async function loadEquipments() {
    try {
      const data = await equipmentApi.getAll();
      setEquipments(data);
    } catch (err: any) {
      setError('Error al cargar los dispositivos');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    try {
      await equipmentApi.create(formData);
      setSuccess('Dispositivo registrado correctamente');
      setShowModal(false);
      setFormData({
        name: '',
        type: 'SMARTPHONE',
        brand: '',
        model: '',
        serialNumber: '',
        observations: '',
      });
      await loadEquipments();
    } catch (err: any) {
      setError(err.message || 'Error al registrar el dispositivo');
    }
  }

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mis dispositivos</h1>
          <p className="mt-1 text-slate-400">Dispositivos registrados en el sistema</p>
        </div>
        <Button onClick={() => setShowModal(true)} size="lg">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Registrar dispositivo
        </Button>
      </div>

      {success && <Alert intent="success" onClose={() => setSuccess(null)}>{success}</Alert>}
      {error && <Alert intent="error" onClose={() => setError(null)}>{error}</Alert>}

      {equipments.length === 0 ? (
        <Card className="p-12">
          <EmptyState 
            message="No tienes dispositivos registrados. ¡Registra tu primer dispositivo!"
            icon={
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
          />
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {equipments.map((equipment) => (
            <Card key={equipment.id} hover className="transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900/30">
                      <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-100">{equipment.name}</h3>
                      <p className="text-xs text-slate-500">{equipment.type}</p>
                    </div>
                  </div>
                  <Badge color={equipment.currentStatus === 'RECEIVED' ? 'blue' : equipment.currentStatus === 'IN_REPAIR' ? 'amber' : 'green'}>
                    {equipment.currentStatus}
                  </Badge>
                </div>
                
                <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Marca:</span>
                    <span className="font-medium text-slate-300">{equipment.brand}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Modelo:</span>
                    <span className="font-medium text-slate-300">{equipment.model}</span>
                  </div>
                  {equipment.serialNumber && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">S/N:</span>
                      <span className="font-mono text-xs text-slate-400">{equipment.serialNumber}</span>
                    </div>
                  )}
                </div>
                
                {equipment.observations && (
                  <p className="rounded border border-slate-800 bg-slate-900/30 p-2 text-xs text-slate-400">
                    {equipment.observations}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        title="Registrar nuevo dispositivo"
        onClose={() => setShowModal(false)}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre del dispositivo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: iPhone de Juan"
            required
          />

          <Select
            label="Tipo"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={[
              { value: 'SMARTPHONE', label: 'Smartphone' },
              { value: 'LAPTOP', label: 'Laptop' },
              { value: 'TABLET', label: 'Tablet' },
              { value: 'DESKTOP', label: 'PC de escritorio' },
              { value: 'OTHER', label: 'Otro' },
            ]}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Marca"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="Ej: Apple, Samsung"
              required
            />

            <Input
              label="Modelo"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              placeholder="Ej: iPhone 13"
              required
            />
          </div>

          <Input
            label="Número de serie (opcional)"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            placeholder="Ej: ABC123456"
          />

          <TextArea
            label="Observaciones (opcional)"
            value={formData.observations}
            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
            placeholder="Cualquier detalle adicional..."
            rows={3}
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">Registrar</Button>
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
