import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

interface RoleGuardProps {
  allow: UserRole[];
}

export default function RoleGuard({ allow }: RoleGuardProps) {
  const { role } = useAuth();

  if (!role || !allow.includes(role)) {
    return <Navigate to="/app/home" replace />;
  }

  return <Outlet />;
}
