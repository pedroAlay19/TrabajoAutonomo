// Types basados en las entidades del backend NestJS
export type UserRole = 'User' | 'Technician' | 'Admin';

export interface User {
  id: string;
  name: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  serialNumber?: string;
  observations?: string;
  currentStatus: string;
  createdAt: string;
  user?: User;
  repairOrders?: RepairOrder[];
}

export interface RepairOrder {
  id: string;
  problemDescription: string;
  diagnosis?: string;
  estimatedCost: number;
  finalCost?: number;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  equipment?: Equipment;
  repairOrderDetails?: RepairOrderDetail[];
  repairOrderParts?: RepairOrderPart[];
  notifications?: RepairOrderNotification[];
  reviews?: RepairOrderReview[];
}

export interface RepairOrderDetail {
  id: string;
  description: string;
  cost: number;
  service?: MaintenanceService;
}

export interface RepairOrderPart {
  id: string;
  quantity: number;
  unitPrice: number;
  part?: SparePart;
}

export interface RepairOrderNotification {
  id: string;
  title: string;
  message: string;
  sentAt?: string;
  status?: string;
  createdAt: string;
}

export interface RepairOrderReview {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: User;
  repairOrder?: RepairOrder;
}

export interface MaintenanceService {
  id: string;
  serviceName: string;
  description: string;
  basePrice: number;
  estimatedTimeMinutes?: number;
  requiresParts?: boolean;
  type: string;
  imageUrls?: string[];
  active?: boolean;
  notes?: string;
}

export interface SparePart {
  id: string;
  name: string;
  description: string;
  stock: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}
