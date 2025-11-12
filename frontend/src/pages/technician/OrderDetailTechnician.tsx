import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Card, ProgressBar, Modal } from '../../components/ui';
import { 
  formatDate,
  formatCurrency 
} from '../../utils';
import type { RepairOrder } from '../../types';
import { OrderRepairStatus, TicketServiceStatus } from '../../types';

export default function OrderDetailTechnician() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<RepairOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'services' | 'parts' | 'comments'>('services');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (id) loadOrder();
    
    // Auto-refresh cuando la pestaña vuelve a ser visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && id) {
        loadOrder(true);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Auto-refresh cada 10 segundos (frecuente para técnicos)
    const interval = setInterval(() => {
      if (id) loadOrder(true);
    }, 10000);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadOrder = async (silent = false) => {
    if (!id) return;
    if (!silent) {
      setLoading(true);
    }
    
    try {
      const { repairOrders } = await import('../../api');
      const data = await repairOrders.getById(id);
      setOrder(data);
    } catch (error) {
      console.error('Error cargando orden:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateServiceStatus = async (detailId: string, newStatus: TicketServiceStatus) => {
    try {
      // TODO: Implementar endpoint para actualizar estado de servicio individual
      console.log('Updating', detailId, 'to', newStatus);
      setShowUpdateModal(false);
      await loadOrder();
    } catch (error) {
      console.error('Error actualizando estado:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-900 text-xl font-medium">Cargando orden...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Orden no encontrada</h2>
        <p className="text-gray-600 mb-6">La orden que buscas no existe o no tienes acceso</p>
        <Link
          to="/technician/orders"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Volver a Órdenes
        </Link>
      </div>
    );
  }

  const progress = order.repairOrderDetails 
    ? Math.round((order.repairOrderDetails.filter(d => d.status === TicketServiceStatus.COMPLETED).length / order.repairOrderDetails.length) * 100)
    : 0;

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/technician/orders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Volver a Órdenes
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Orden #{order.id.substring(0, 8).toUpperCase()}
                </h1>
              </div>
              <p className="text-gray-600">
                Creada el {formatDate(order.createdAt)}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Progreso General</p>
              <p className="text-3xl font-bold text-gray-900">{progress}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Progress Bar */}
          <Card>
            <Card.Body>
              <ProgressBar
                progress={progress}
                color={progress === 100 ? 'green' : 'blue'}
                showLabel
                height="lg"
                animated={progress < 100}
              />
            </Card.Body>
          </Card>

          {/* Info Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cliente */}
            <Card>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Cliente</h3>
                </div>
              </Card.Header>
              <Card.Body>
                <p className="font-medium text-gray-900">{order.equipment.user?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600 mt-1">{order.equipment.user?.email || ''}</p>
                {order.equipment.user?.phone && (
                  <p className="text-sm text-gray-600">{order.equipment.user.phone}</p>
                )}
              </Card.Body>
            </Card>

            {/* Equipo */}
            <Card>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Equipo</h3>
                </div>
              </Card.Header>
              <Card.Body>
                <p className="font-medium text-gray-900">{order.equipment.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.equipment.brand} {order.equipment.model}
                </p>
                {order.equipment.serialNumber && (
                  <p className="text-xs text-gray-500 mt-2 font-mono">
                    S/N: {order.equipment.serialNumber}
                  </p>
                )}
              </Card.Body>
            </Card>

            {/* Costo */}
            <Card>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Costos</h3>
                </div>
              </Card.Header>
              <Card.Body>
                {order.estimatedCost && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500">Estimado</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(order.estimatedCost)}</p>
                  </div>
                )}
                {order.finalCost && (
                  <div>
                    <p className="text-xs text-gray-500">Final</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(order.finalCost)}</p>
                  </div>
                )}
                {!order.estimatedCost && !order.finalCost && (
                  <p className="text-gray-500">Por determinar</p>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Problema Reportado */}
          <Card>
            <Card.Header>
              <h3 className="font-semibold text-gray-900">Problema Reportado</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-700">{order.problemDescription}</p>
              {order.imageUrls && order.imageUrls.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Imágenes adjuntas:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {order.imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Tabs */}
          <Card>
            <div className="border-b border-gray-200">
              <nav className="flex gap-4 px-6">
                {(order.status === OrderRepairStatus.IN_REVIEW || order.status === OrderRepairStatus.WAITING_APPROVAL) && (
                  <button
                    onClick={() => setActiveTab('diagnosis')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'diagnosis'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Diagnóstico y Costo
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('services')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'services'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Servicios Asignados
                </button>
                <button
                  onClick={() => setActiveTab('parts')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'parts'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Piezas Utilizadas
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'comments'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Comentarios del Cliente
                </button>
              </nav>
            </div>

            <Card.Body>
              {/* Tab: Diagnosis */}
              {activeTab === 'diagnosis' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diagnóstico
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Escribe el diagnóstico del equipo..."
                      value={order.diagnosis || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Costo Estimado
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      value={order.estimatedCost || ''}
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Guardar y Enviar a Aprobación
                  </button>
                </div>
              )}

              {/* Tab: Services */}
              {activeTab === 'services' && (
                <div className="space-y-4">
                  {order.repairOrderDetails && order.repairOrderDetails.length > 0 ? (
                    order.repairOrderDetails.map((detail) => (
                      <div
                        key={detail.id}
                        className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                          <WrenchScrewdriverIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{detail.service.serviceName}</h4>
                              <p className="text-sm text-gray-600">{detail.service.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Técnico: {detail.technician.name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="text-sm">
                              <span className="text-gray-600">Costo: </span>
                              <span className="font-semibold text-gray-900">{formatCurrency(detail.subTotal)}</span>
                            </div>
                            
                            {detail.status !== TicketServiceStatus.COMPLETED && (
                              <div className="flex gap-2">
                                {detail.status === TicketServiceStatus.PENDING && (
                                  <button
                                    onClick={() => handleUpdateServiceStatus(detail.id, TicketServiceStatus.IN_PROGRESS)}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                  >
                                    <ClockIcon className="w-4 h-4" />
                                    Iniciar
                                  </button>
                                )}
                                {detail.status === TicketServiceStatus.IN_PROGRESS && (
                                  <button
                                    onClick={() => handleUpdateServiceStatus(detail.id, TicketServiceStatus.COMPLETED)}
                                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                  >
                                    <CheckCircleIcon className="w-4 h-4" />
                                    Completar
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">No hay servicios asignados</p>
                  )}
                </div>
              )}

              {/* Tab: Parts */}
              {activeTab === 'parts' && (
                <div className="space-y-4">
                  {order.repairOrderParts && order.repairOrderParts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pieza</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Precio Unit.</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {order.repairOrderParts.map((part) => (
                            <tr key={part.id}>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{part.part.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{part.part.description}</td>
                              <td className="px-4 py-3 text-sm text-center text-gray-900">{part.quantity}</td>
                              <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(part.part.unitPrice)}</td>
                              <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">{formatCurrency(part.subTotal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No se han utilizado piezas aún</p>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Agregar Piezas
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Comments */}
              {activeTab === 'comments' && (
                <div>
                  {order.reviews && order.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {order.reviews.map((review) => (
                        <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No hay comentarios del cliente aún</p>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <Modal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title="Actualizar Estado del Servicio"
        >
          <div className="space-y-4">
            <p>¿Estás seguro de que deseas actualizar el estado de este servicio?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {/* Handle update */}}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
