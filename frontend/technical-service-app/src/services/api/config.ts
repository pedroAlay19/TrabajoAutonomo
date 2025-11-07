export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const ENDPOINTS = {
  // Auth
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    profile: '/auth/profile',
  },
  // Users
  users: '/users',
  usersTechnician: '/users/technician',
  usersProfile: '/users/profile',
  // Equipments
  equipments: '/equipments',
  // Repair Orders
  repairOrders: '/repair-orders',
  // Services
  services: '/services',
  // Spare Parts
  spareParts: '/spare-parts',
  // Reviews
  reviews: '/repair-order-reviews',
} as const;
