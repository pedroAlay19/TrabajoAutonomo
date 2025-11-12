import { RepairStepItem } from "./repairStepItem";
import { RepairStepConnector } from "./repairStepConnector";
import { getRepairSteps } from "../../data/repairSteps";
import type { RepairOrder } from "../../types";
import type React from "react";

export const RepairTimeline: React.FC<{ order: RepairOrder }> = ({ order }) => {
  const steps = getRepairSteps(order);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Estado de la Reparación
      </h2>

      <div className="relative border-l border-gray-200 pl-8">
        {steps.map((step, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            {index < steps.length - 1 && (
              <RepairStepConnector active={step.status === "completed"} />
            )}
            <RepairStepItem step={step} />
          </div>
        ))}
      </div>
    </div>
  );
};
