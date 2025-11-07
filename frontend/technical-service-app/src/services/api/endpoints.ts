import { http } from './client';
import { ENDPOINTS } from './config';
import type {
  AuthResponse,
  Equipment,
  RepairOrder,
  MaintenanceService,
  SparePart,
  RepairOrderReview,
  User,
  RepairOrderNotification,
} from '../../types';

// Auth endpoints
export const authApi = {
  login: (email: string, password: string) =>
    http.post<AuthResponse>(ENDPOINTS.auth.login, { email, password }),
  
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    http.post<AuthResponse>(ENDPOINTS.auth.register, data),
  
  getProfile: () => http.get<User>(ENDPOINTS.auth.profile),
};

// Equipment endpoints
export const equipmentApi = {
  getAll: () => http.get<Equipment[]>(ENDPOINTS.equipments),
  
  getOne: (id: string) => http.get<Equipment>(`${ENDPOINTS.equipments}/${id}`),
  
  create: (data: {
    name: string;
    type: string;
    brand: string;
    model: string;
    serialNumber?: string;
    observations?: string;
  }) => http.post<Equipment>(ENDPOINTS.equipments, data),
  
  update: (id: string, data: Partial<Equipment>) =>
    http.patch<Equipment>(`${ENDPOINTS.equipments}/${id}`, data),
  
  delete: (id: string) => http.delete<void>(`${ENDPOINTS.equipments}/${id}`),
};

// Repair Order endpoints
export const repairOrderApi = {
  getAll: () => http.get<RepairOrder[]>(ENDPOINTS.repairOrders),
  
  getOne: (id: string) => http.get<RepairOrder>(`${ENDPOINTS.repairOrders}/${id}`),
  
  create: (data: {
    equipmentId: string;
    problemDescription: string;
    estimatedCost: number;
    diagnosis?: string;
  }) => http.post<RepairOrder>(ENDPOINTS.repairOrders, data),
  
  update: (id: string, data: Partial<RepairOrder>) =>
    http.patch<RepairOrder>(`${ENDPOINTS.repairOrders}/${id}`, data),
  
  delete: (id: string) => http.delete<void>(`${ENDPOINTS.repairOrders}/${id}`),
};

// Maintenance Service endpoints
export const serviceApi = {
  getAll: () => http.get<MaintenanceService[]>(ENDPOINTS.services),
  
  getOne: (id: string) => http.get<MaintenanceService>(`${ENDPOINTS.services}/${id}`),
  
  create: (data: {
    serviceName: string;
    description: string;
    basePrice: number;
    type: string;
    estimatedTimeMinutes?: number;
    requiresParts?: boolean;
  }) => http.post<MaintenanceService>(ENDPOINTS.services, data),
  
  update: (id: string, data: Partial<MaintenanceService>) =>
    http.patch<MaintenanceService>(`${ENDPOINTS.services}/${id}`, data),
  
  delete: (id: string) => http.delete<void>(`${ENDPOINTS.services}/${id}`),
};

// Spare Part endpoints
export const sparePartApi = {
  getAll: () => http.get<SparePart[]>(ENDPOINTS.spareParts),
  
  getOne: (id: string) => http.get<SparePart>(`${ENDPOINTS.spareParts}/${id}`),
  
  create: (data: {
    name: string;
    description: string;
    stock: number;
    unitPrice: number;
  }) => http.post<SparePart>(ENDPOINTS.spareParts, data),
  
  update: (id: string, data: Partial<SparePart>) =>
    http.patch<SparePart>(`${ENDPOINTS.spareParts}/${id}`, data),
  
  delete: (id: string) => http.delete<void>(`${ENDPOINTS.spareParts}/${id}`),
};

// Review endpoints
export const reviewApi = {
  getAll: () => http.get<RepairOrderReview[]>(ENDPOINTS.reviews),
  
  getOne: (id: string) => http.get<RepairOrderReview>(`${ENDPOINTS.reviews}/${id}`),
  
  create: (data: {
    repairOrderId: string;
    rating: number;
    comment?: string;
  }) => http.post<RepairOrderReview>(ENDPOINTS.reviews, data),
  
  update: (id: string, data: { rating?: number; comment?: string }) =>
    http.patch<RepairOrderReview>(`${ENDPOINTS.reviews}/${id}`, data),
  
  delete: (id: string) => http.delete<void>(`${ENDPOINTS.reviews}/${id}`),
};

// User endpoints
export const userApi = {
  getAll: () => http.get<User[]>(ENDPOINTS.users),
  
  getAllTechnicians: () => http.get<User[]>(ENDPOINTS.usersTechnician),
  
  getOne: (id: string) => http.get<User>(`${ENDPOINTS.users}/${id}`),
  
  createUser: (data: { name: string; email: string; password: string }) =>
    http.post<User>(ENDPOINTS.users, data),
  
  createTechnician: (data: { name: string; email: string; password: string; specialization?: string }) =>
    http.post<User>(ENDPOINTS.usersTechnician, data),
  
  update: (id: string, data: Partial<User>) =>
    http.patch<User>(`${ENDPOINTS.users}/${id}`, data),
  
  updateProfile: (data: Partial<User>) =>
    http.patch<User>(ENDPOINTS.usersProfile, data),
  
  delete: (id: string) => http.delete<void>(`${ENDPOINTS.users}/${id}`),
};

// Mock endpoint for notifications (usar polling)
export const notificationApi = {
  getAll: async (): Promise<RepairOrderNotification[]> => {
    // Por ahora simulado hasta que implementes WebSocket
    try {
      const orders = await repairOrderApi.getAll();
      const notifications: RepairOrderNotification[] = [];
      orders.forEach(order => {
        if (order.notifications) {
          notifications.push(...order.notifications);
        }
      });
      return notifications.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch {
      return [];
    }
  },
};
