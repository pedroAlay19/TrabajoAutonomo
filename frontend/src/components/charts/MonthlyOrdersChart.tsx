/**
 * MonthlyOrdersChart Component
 * Gráfico de línea para mostrar órdenes mensuales
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../ui';

interface MonthlyData {
  month: string;
  orders: number;
  completed: number;
}

interface MonthlyOrdersChartProps {
  data: MonthlyData[];
  title?: string;
}

export const MonthlyOrdersChart: React.FC<MonthlyOrdersChartProps> = ({ 
  data, 
  title = "Órdenes por Mes" 
}) => {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </Card.Header>
      <Card.Body>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
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
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Total Órdenes"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Completadas"
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
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
