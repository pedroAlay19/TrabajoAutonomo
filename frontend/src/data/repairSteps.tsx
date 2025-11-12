import {
  BellIcon,
  MagnifyingGlassCircleIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  CubeTransparentIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import type { RepairOrder, RepairStep } from "../types/repair-order.types";

export const getRepairSteps = (order: RepairOrder): RepairStep[] => [
  {
    label: "Solicitado",
    icon: <BellIcon className="w-4 h-4" />,
    status: "completed",
    date: order.createdAt,
    description: "Orden creada y registrada en el sistema",
  },
  {
    label: "En Revisión",
    icon: <MagnifyingGlassCircleIcon className="w-6 h-6" />,
    status:
      order.status === "IN_REVIEW"
        ? "current"
        : ["WAITING_APPROVAL", "IN_REPAIR", "READY", "DELIVERED"].includes(
            order.status
          )
        ? "completed"
        : "pending",
    date: order.updatedAt,
    description: "Técnico revisando el equipo",
  },
  {
    label: "Esperando Aprobación",
    icon: <ClockIcon className="w-6 h-6" />,
    status:
      order.status === "WAITING_APPROVAL"
        ? "current"
        : ["IN_REPAIR", "READY", "DELIVERED"].includes(order.status)
        ? "completed"
        : "pending",
    description: "Esperando confirmación del cliente",
  },
  {
    label: "En Reparación",
    icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
    status: ["IN_REPAIR"].includes(order.status)
      ? "current"
      : ["READY", "DELIVERED"].includes(order.status)
      ? "completed"
      : "pending",
    description: "Técnico trabajando en la reparación",
  },
  {
    label: "Listo para Entrega",
    icon: <CubeTransparentIcon className="w-6 h-6" />,
    status:
      order.status === "READY"
        ? "current"
        : order.status === "DELIVERED"
        ? "completed"
        : "pending",
    description: "Reparación completada",
  },
  {
    label: "Entregado",
    icon: <CheckCircleIcon className="w-6 h-6" />,
    status: order.status === "DELIVERED" ? "completed" : "pending",
    description: "Equipo entregado al cliente",
  },
];
