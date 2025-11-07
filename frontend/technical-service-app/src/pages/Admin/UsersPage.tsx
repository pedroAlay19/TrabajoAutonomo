import { useEffect, useState } from 'react';
import { userApi } from '../../services/api/endpoints';
import type { User } from '../../types';
import { Table, THead, TBody, TH, TD } from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';

function getRoleColor(role: string) {
  if (role === 'Admin') return 'red';
  if (role === 'Technician') return 'amber';
  return 'blue';
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi
      .getAll()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (users.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <EmptyState message="No hay usuarios registrados." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p className="text-sm text-slate-400">Gestiona usuarios del sistema</p>
        </div>
        <Button>Crear usuario</Button>
      </div>

      <Table>
        <THead>
          <tr>
            <TH>Nombre</TH>
            <TH>Email</TH>
            <TH>Teléfono</TH>
            <TH>Rol</TH>
            <TH>Registro</TH>
          </tr>
        </THead>
        <TBody>
          {users.map((user) => (
            <tr key={user.id}>
              <TD>
                <div>
                  <div className="font-medium">{user.name}</div>
                  {user.lastName && <div className="text-xs text-slate-500">{user.lastName}</div>}
                </div>
              </TD>
              <TD>{user.email}</TD>
              <TD>{user.phone || 'N/A'}</TD>
              <TD>
                <Badge color={getRoleColor(user.role)}>{user.role}</Badge>
              </TD>
              <TD>
                <span className="text-xs">{new Date(user.createdAt).toLocaleDateString()}</span>
              </TD>
            </tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
