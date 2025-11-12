export const RepairStepConnector = ({ active }: { active: boolean }) => (
  <div
    className={`absolute left-5 top-12 h-full w-0.5 ${
      active ? "bg-blue-500" : "bg-gray-300"
    }`}
  />
);
