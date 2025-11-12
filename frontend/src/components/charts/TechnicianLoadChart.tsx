/**
 * TechnicianLoadChart Component
 * Gráfico de barras para mostrar carga de trabajo de técnicos
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../ui';

interface TechnicianLoad {
  name: string;
  completed: number;
  inProgress: number;
  pending: number;
}

interface TechnicianLoadChartProps {
  data: TechnicianLoad[];
  title?: string;
}

export const TechnicianLoadChart: React.FC<TechnicianLoadChartProps> = ({ 
  data, 
  title = "Carga de Trabajo por Técnico" 
}) => {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </Card.Header>
      <Card.Body>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="Completadas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="inProgress" fill="#3b82f6" name="En Progreso" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" name="Pendientes" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No hay datos disponibles</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
