import { DocumentTextIcon } from "@heroicons/react/24/outline";

export const RepairOrderDiagnosis: React.FC<{ diagnosis: string }> = ({
  diagnosis,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <DocumentTextIcon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Diagnóstico Técnico</h3>
      </div>
      <div className="bg-gray-50 rounded-xl p-6">
        <p className="text-gray-900 whitespace-pre-wrap">{diagnosis}</p>
      </div>
    </div>
  );
};
