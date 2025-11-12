import { Link } from "react-router-dom";
import { PlusIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { FilterType, useRepairOrders } from "../../hooks/useRepairOrders";
import { RepairOrderCard } from "../../components/repairOrders/RepairOrderCard";
import { RepairOrdersHeader } from "../../components/repairOrders/RepairOrdersHeader";
import { RepairOrderFilters } from "../../components/repairOrders/RepairOrderFilters";

export default function MyRepairOrders() {
  const { orders, filteredOrders, loading, filter, setFilter } =
    useRepairOrders();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-900 text-xl font-medium">
          Cargando órdenes...
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <RepairOrdersHeader />

      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <RepairOrderFilters
            filter={filter}
            setFilter={setFilter}
            orders={orders}
          />

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm text-center py-16">
              <div className="p-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <WrenchIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {filter === FilterType.ALL
                    ? "No tienes órdenes de reparación"
                    : filter === FilterType.ACTIVE
                    ? "No tienes órdenes activas"
                    : "No tienes órdenes completadas"}
                </h3>
                <p className="text-gray-600 mb-6">
                  Solicita tu primera reparación para comenzar
                </p>
                <Link
                  to="/user/repair-orders/new"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  Solicitar Reparación
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <Link
                  key={order.id}
                  to={`/user/repair-orders/${order.id}`}
                  className="block"
                >
                  <RepairOrderCard order={order} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
