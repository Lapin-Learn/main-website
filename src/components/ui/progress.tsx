import * as ProgressPrimitive from "@radix-ui/react-progress";
import React from "react";

import { cn } from "@/lib/utils";

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  label?: string;
  value?: number | null;
  indicatorStyle?: React.CSSProperties;
  indicatorClassName?: string;
};

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, label, indicatorClassName, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-neutral-50", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "absolute size-full flex-1 bg-primary transition-all",
          value && value >= 50 ? "bg-primary" : "bg-primary-300",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
      <div className="absolute-center">
        <p
          className={cn(
            "text-[10px] font-medium",
            value && value >= 50 ? "text-white" : "text-neutral-300"
          )}
        >
          {label}
        </p>
      </div>
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
