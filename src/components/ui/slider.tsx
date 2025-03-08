import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, orientation, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex touch-none select-none items-center",
      orientation === "vertical" ? "h-full flex-col" : "w-full",
      className
    )}
    orientation={orientation}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative grow overflow-hidden rounded-full bg-neutral-50",
        orientation === "vertical"
          ? "flex h-full w-1.5 flex-col items-center"
          : "flex h-1.5 w-full flex-row"
      )}
    >
      <SliderPrimitive.Range
        className={cn("absolute bg-primary-700", orientation === "vertical" ? "w-full" : "h-full")}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={
        "block size-4 rounded-full border border-primary-700 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      }
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
