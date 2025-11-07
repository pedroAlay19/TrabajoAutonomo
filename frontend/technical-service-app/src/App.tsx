import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleGuard from './routes/RoleGuard';
import DashboardPage from './pages/Dashboard/DashboardPage';

// Client pages
import EquipmentsPage from './pages/Client/EquipmentsPage';
import OrdersPage from './pages/Client/OrdersPage';

// Technician pages
import TechEquipmentsPage from './pages/Tech/TechEquipmentsPage';
import TechOrdersPage from './pages/Tech/TechOrdersPage';

// Admin pages
import UsersPage from './pages/Admin/UsersPage';
import ServicesPage from './pages/Admin/ServicesPage';
import SparePartsPage from './pages/Admin/SparePartsPage';
import AdminOrdersPage from './pages/Admin/AdminOrdersPage';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected app routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Common routes */}
          <Route path="/app" element={<Navigate to="/app/home" replace />} />
          <Route path="/app/home" element={<DashboardPage />} />

          {/* Client routes - Only for User role */}
          <Route element={<RoleGuard allow={['User']} />}>
            <Route path="/app/client/equipments" element={<EquipmentsPage />} />
            <Route path="/app/client/orders" element={<OrdersPage />} />
          </Route>

          {/* Technician routes - Only for Technician role */}
          <Route element={<RoleGuard allow={['Technician']} />}>
            <Route path="/app/tech/equipments" element={<TechEquipmentsPage />} />
            <Route path="/app/tech/orders" element={<TechOrdersPage />} />
          </Route>

          {/* Admin routes - Only for Admin role */}
          <Route element={<RoleGuard allow={['Admin']} />}>
            <Route path="/app/admin/users" element={<UsersPage />} />
            <Route path="/app/admin/services" element={<ServicesPage />} />
            <Route path="/app/admin/spare-parts" element={<SparePartsPage />} />
            <Route path="/app/admin/orders" element={<AdminOrdersPage />} />
          </Route>
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
