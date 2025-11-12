import type React from "react";
import type { RepairOrder } from "../../types";
import { RepairOrderDiagnosis } from "./RepairOrderDiagnosis";
import { equipmentTypes } from "../../data/equipmentTypes";

export const SideBar: React.FC<{ order: RepairOrder }> = ({ order }) => {
    const equipmentType = equipmentTypes.find(
    (e) => e.value === order.equipment.type
  );

  return (
    <aside className="space-y-6">
      {/* Equipment Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <div>{equipmentType?.icon}</div>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Equipo</h3>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Nombre</p>
            <p className="font-semibold text-gray-900">
              {order.equipment.name}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Marca y Modelo</p>
            <p className="font-semibold text-gray-900">
              {order.equipment.brand} - {order.equipment.model}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Tipo</p>
            <p className="font-semibold text-gray-900">
              {order.equipment.type}
            </p>
          </div>
        </div>
      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Problema</h3>
        </div>
        <p className="text-gray-700 text-sm">{order.problemDescription}</p>
      </div>

      {/* Diagnosis */}
      {order.diagnosis && <RepairOrderDiagnosis diagnosis={order.diagnosis} />}

      {/* Cost */}
      {order.estimatedCost && order.estimatedCost > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Costo</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">Estimado</p>
              <p className="text-2xl font-bold text-gray-900">
                ${order.estimatedCost}
              </p>
            </div>
            {order.finalCost && order.finalCost > 0 && (
              <div>
                <p className="text-xs text-gray-500">Final</p>
                <p className="text-2xl font-bold text-green-600">
                  ${order.finalCost.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Warranty */}
      {order.warrantyStartDate && order.warrantyEndDate && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-green-900">Garantía</h3>
          </div>
          <p className="text-sm text-green-800 mb-3">
            Esta reparación incluye garantía
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-green-700">Inicio</p>
              <p className="font-semibold text-green-900">
                {new Date(order.warrantyStartDate).toLocaleDateString("es-ES")}
              </p>
            </div>
            <div>
              <p className="text-green-700">Fin</p>
              <p className="font-semibold text-green-900">
                {new Date(order.warrantyEndDate).toLocaleDateString("es-ES")}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
