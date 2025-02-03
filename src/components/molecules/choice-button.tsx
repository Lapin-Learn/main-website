import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-96 min-h-12 rounded-xl px-8 border border-2 animate-color duration-200 p-4",
  {
    variants: {
      variant: {
        default: "bg-white hover:bg-gray-50",
        selected: "bg-blue-50 border-blue-500 text-blue-900 hover:bg-blue-100/50",
        correct: "bg-green-50 border-green-500 text-green-900 hover:bg-green-100/50",
        incorrect: "bg-red-50 border-red-500 text-red-900 hover:bg-red-100/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type ChoiceButtonProps = VariantProps<typeof buttonVariants> & {
  label: string;
  onClick: VoidFunction;
  disabled?: boolean;
};

const ChoiceButton = ({ label, onClick, variant, disabled = false }: ChoiceButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant }))} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
export default ChoiceButton;
