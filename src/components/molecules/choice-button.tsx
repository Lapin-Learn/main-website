import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("w-96 min-h-12 rounded-md px-8 border animate-color duration-200 p-4", {
  variants: {
    variant: {
      default: "bg-white hover:bg-gray-50",
      selected: "bg-blue-50 border-blue-500 text-blue-900 hover:bg-blue-100/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ChoiceButtonProps = VariantProps<typeof buttonVariants> & {
  label: string;
  onClick: VoidFunction;
};

const ChoiceButton = ({ label, onClick, variant }: ChoiceButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant }))} onClick={onClick}>
      {label}
    </button>
  );
};
export default ChoiceButton;
