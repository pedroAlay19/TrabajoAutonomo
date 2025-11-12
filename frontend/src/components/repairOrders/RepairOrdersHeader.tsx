import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const RepairOrdersHeader = () => {
  return (
    <div className="bg-slate-900 border-b border-gray-800 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-200">
              Mis Ordenes de Reparación
            </h1>
          </div>
          <p className="text-gray-300 mt-1">Seguimiento de tus reparaciones</p>
        </div>
        <Link
          to="/user/repair-orders/new"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Reparación
        </Link>
      </div>
    </div>
  );
};
