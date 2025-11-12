/**
 * OrderStatsChart Component
 * Gráfico de dona para mostrar estadísticas de órdenes
 */

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '../ui';

interface OrderStats {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface OrderStatsChartProps {
  data: OrderStats[];
  title?: string;
}

export const OrderStatsChart: React.FC<OrderStatsChartProps> = ({ data, title = "Distribución de Órdenes" }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </Card.Header>
      <Card.Body>
        {total > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Leyenda personalizada */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">
                    {item.name}: <span className="font-semibold">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No hay datos disponibles</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
