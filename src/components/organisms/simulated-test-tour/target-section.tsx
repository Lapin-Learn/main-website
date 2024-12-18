import { PropsWithChildren } from "react";

type TargetSectionProps = {
  title: string;
  currentStep: number;
  steps: number;
};
const TargetSection = ({
  children,
  title,
  currentStep,
  steps,
}: PropsWithChildren<TargetSectionProps>) => {
  return (
    <div className="max-w-96 text-left text-sm">
      <div className="flex justify-between">
        <h3 className="mb-2 text-heading-6 font-semibold">{title}</h3>
        <p className="text-small font-semibold text-neutral-300">
          {currentStep}/{steps}
        </p>
      </div>
      {children}
    </div>
  );
};
export default TargetSection;
