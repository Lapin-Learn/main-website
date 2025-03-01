import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";

import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  status?: boolean;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, status, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer size-4 shrink-0 overflow-clip rounded-sm border shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed",
        status ? "border-green-600" : status === false ? "border-red-600" : "border-neutral-600",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "flex size-4 items-center justify-center",
          status ? "bg-green-200" : status === false ? "bg-red-200" : "bg-primary/40"
        )}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
