import { http } from './http';
import type { RepairOrder } from '../types';
import { OrderRepairStatus, TicketServiceStatus } from '../types';

export interface CreateRepairOrderDto {
  equipmentId: string;
  problemDescription: string;
  imageUrls?: string[];
  diagnosis?: string;
  estimatedCost?: number;
}

export interface UpdateRepairOrderDto {
  problemDescription?: string;
  diagnosis?: string;
  estimatedCost?: number;
  finalCost?: number;
  status?: OrderRepairStatus;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
}

export interface UpdateRepairOrderDetailStatusDto {
  status: TicketServiceStatus;
}

export const repairOrders = {
  // Obtener todas las órdenes (filtradas por usuario en backend)
  getAll: () => http.get<RepairOrder[]>('/repair-orders', true),
  
  // Obtener una orden por ID
  getById: (id: string) =>
    http.get<RepairOrder>(`/repair-orders/${id}`, true),
  
  // Crear una nueva orden
  create: (data: CreateRepairOrderDto) =>
    http.post<RepairOrder>('/repair-orders', data, true),
  
  // Actualizar una orden (diagnóstico, costo, estado, etc.)
  update: (id: string, data: UpdateRepairOrderDto) =>
    http.patch<RepairOrder>(`/repair-orders/${id}`, data, true),
  
  // Eliminar orden (solo admin)
  delete: (id: string) =>
    http.delete<void>(`/repair-orders/${id}`, true),
};
