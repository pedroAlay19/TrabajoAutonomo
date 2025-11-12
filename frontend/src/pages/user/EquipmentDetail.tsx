import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  PrinterIcon,
  DeviceTabletIcon,
} from "@heroicons/react/24/outline";
import { getEquipment, deleteEquipment } from "../../api/api";
import type { Equipment } from "../../types/equipment.types";
import { EquipmentStatus } from "../../types";

const getEquipmentIcon = (type: string) => {
  const iconClass = "w-12 h-12";
  switch (type.toUpperCase()) {
    case "LAPTOP":
    case "PC":
      return <ComputerDesktopIcon className={iconClass} />;
    case "CELLPHONE":
      return <DevicePhoneMobileIcon className={iconClass} />;
    case "PRINTER":
      return <PrinterIcon className={iconClass} />;
    case "TABLET":
      return <DeviceTabletIcon className={iconClass} />;
    default:
      return <DevicePhoneMobileIcon className={iconClass} />;
  }
};

const getStatusBadge = (status: EquipmentStatus) => {
  switch (status) {
    case EquipmentStatus.AVAILABLE:
      return (
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium inline-flex items-center gap-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          Disponible
        </span>
      );
    case EquipmentStatus.IN_REPAIR:
      return (
        <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium inline-flex items-center gap-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          En Reparación
        </span>
      );
    case EquipmentStatus.RETIRED:
      return (
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium inline-flex items-center gap-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          Retirado
        </span>
      );
  }
};

export default function EquipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);

  const loadEquipment = useCallback(async () => {
    if (!id) return;
    
    try {
      const data = await getEquipment(id);
      setEquipment(data);
    } catch (error) {
      console.error("Error cargando equipo:", error);
      setEquipment(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadEquipment();
  }, [loadEquipment]);

  const handleDelete = async () => {
    if (!equipment) return;
    if (!confirm(`¿Eliminar ${equipment.name}?`)) return;

    try {
      await deleteEquipment(equipment.id);
      navigate("/user/equipments");
    } catch {
      alert("Error al eliminar");
    }
  };

  const handleRequestRepair = () => {
    if (!equipment) return;
    navigate("/user/repair-orders/new", { state: { equipmentId: equipment.id } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-900 text-xl font-medium">Cargando...</div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Equipo no encontrado
          </h2>
          <Link
            to="/user/equipments"
            className="text-blue-600 hover:text-blue-700"
          >
            Volver a equipos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-slate-800 px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/user/equipments"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Volver a equipos
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center text-white">
                {getEquipmentIcon(equipment.type)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {equipment.name}
                </h1>
                <p className="text-slate-300 mt-1">{equipment.type}</p>
              </div>
            </div>
            <div>{getStatusBadge(equipment.currentStatus)}</div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información Principal */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Información del Equipo
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Marca</p>
                    <p className="text-base font-medium text-gray-900">
                      {equipment.brand}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Modelo</p>
                    <p className="text-base font-medium text-gray-900">
                      {equipment.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tipo</p>
                    <p className="text-base font-medium text-gray-900">
                      {equipment.type}
                    </p>
                  </div>
                  {equipment.serialNumber && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Número de Serie
                      </p>
                      <p className="text-base font-mono text-gray-900">
                        {equipment.serialNumber}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Registrado</p>
                    <p className="text-base text-gray-900">
                      {new Date(equipment.createdAt).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Estado Actual</p>
                    <div className="mt-1">{getStatusBadge(equipment.currentStatus)}</div>
                  </div>
                </div>

                {equipment.observations && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Observaciones</p>
                    <p className="text-base text-gray-700">
                      {equipment.observations}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Acciones
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleRequestRepair}
                    className="w-full bg-slate-800 text-white py-3 rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    Nueva Orden de Reparación
                  </button>
                  <button
                    onClick={() => navigate(`/user/equipments/${equipment.id}/edit`)}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    Editar Equipo
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full bg-white border border-red-300 text-red-600 py-3 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <TrashIcon className="w-5 h-5" />
                    Eliminar Equipo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
