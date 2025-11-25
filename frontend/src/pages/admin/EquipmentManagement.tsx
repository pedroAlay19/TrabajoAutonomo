import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  TrashIcon,
  ComputerDesktopIcon,
  Bars3Icon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { getEquipment, getEquipments } from "../../api";
import type { Equipment } from "../../types";
import { equipmentTypes } from "../../data/equipmentTypes";
import { generateEquipmentReport } from "../../api/reports";
import { downloadPdfFromBase64 } from "../../utils/pdfDownload";

export default function EquipmentManagement() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [generatingReportId, setGeneratingReportId] = useState<string | null>(null);

  useEffect(() => {
    const loadEquipments = async () => {
      try {
        setLoading(true);
        const data = await getEquipments();
        setEquipments(data);
      } catch (error) {
        console.error("Error loading equipments:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEquipments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de eliminar este equipo?")) return;

    try {
      await getEquipment(id);
      setEquipments(equipments.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting equipment:", error);
      alert("Error al eliminar el equipo");
    }
  };

  const handleGenerateReport = async (equipmentId: string, equipmentName: string) => {
    try {
      console.log('Iniciando generación de reporte para equipo:', equipmentId);
      setGeneratingReportId(equipmentId);

      // Call GraphQL to generate PDF
      console.log('Llamando a generateEquipmentReport...');
      const base64Pdf = await generateEquipmentReport(equipmentId);
      console.log('Reporte generado exitosamente, descargando PDF...');

      // Download PDF
      const sanitizedName = equipmentName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      downloadPdfFromBase64(base64Pdf, `reporte-equipo-${sanitizedName}.pdf`);
      console.log('PDF descargado exitosamente');

    } catch (error: any) {
      console.error("Error completo al generar reporte:", error);
      console.error("Mensaje de error:", error?.message);
      console.error("Stack trace:", error?.stack);
      
      const errorMessage = error?.message || "Error desconocido al generar el reporte";
      alert(`Error al generar el reporte:\n${errorMessage}`);
    } finally {
      setGeneratingReportId(null);
    }
  };

  const filteredEquipments = equipments.filter(
    (equipment) =>
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Equipos</h1>
          <p className="text-gray-400 mt-1">Gestión de equipos registrados en el sistema</p>
        </div>
        <button
          onClick={() => {
            setSidebarCollapsed(!sidebarCollapsed);
            const sidebar = document.querySelector('.lg\\:fixed.lg\\:inset-y-0') as HTMLElement;
            const mainContent = document.querySelector('.lg\\:pl-64') as HTMLElement;
            if (sidebar && mainContent) {
              if (!sidebarCollapsed) {
                sidebar.style.display = 'none';
                mainContent.style.paddingLeft = '0';
              } else {
                sidebar.style.display = 'flex';
                mainContent.style.paddingLeft = '16rem';
              }
            }
          }}
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
        >
          <Bars3Icon className="w-5 h-5" />
          {sidebarCollapsed ? 'Mostrar' : 'Ocultar'} Menú
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {equipmentTypes.map((item) => (
          <div
            key={item.value}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {equipments.filter((e) => e.type === item.value).length}
                </p>
              </div>
              <div className="text-blue-400 opacity-80">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, marca, modelo o serial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Equipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Especificaciones
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Propietario
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredEquipments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      No se encontraron equipos
                    </td>
                  </tr>
                ) : (
                  filteredEquipments.map((equipment) => (
                    <tr
                      key={equipment.id}
                      className="hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                            <ComputerDesktopIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {equipment.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              SN: {equipment.serialNumber || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          <div className="font-medium">{equipment.brand} {equipment.model}</div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            Registrado: {new Date(equipment.createdAt).toLocaleDateString('es-ES')}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {equipment.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {equipment.user.name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleGenerateReport(equipment.id, equipment.name)}
                            disabled={generatingReportId === equipment.id}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Generar reporte PDF"
                          >
                            {generatingReportId === equipment.id ? (
                              <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                            ) : (
                              <DocumentArrowDownIcon className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(equipment.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all"
                            title="Eliminar equipo"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
