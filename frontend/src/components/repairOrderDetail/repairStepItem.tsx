import type{ RepairStep } from "../../types/repair-order.types";
import { formatDate } from "../../utils/formatDate";

export const RepairStepItem = ({ step }: { step: RepairStep }) => {
  const base =
    "relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200";
  const style =
    step.status === "completed"
      ? "border-blue-500 bg-blue-50 text-blue-600"
      : step.status === "current"
      ? "border-blue-600 bg-blue-100 text-blue-700 animate-pulse"
      : "border-gray-300 bg-gray-100 text-gray-400";

  return (
    <div className="flex items-start space-x-4 relative">
      <div className={`${base} ${style}`}>{step.icon}</div>
      <div>
        <p className="font-medium text-gray-800">{step.label}</p>
        <p className="text-sm text-gray-500">{step.description}</p>
        {step.date && <p className="text-xs text-gray-400">{formatDate(step.date)}</p>}
      </div>
    </div>
  );
};
