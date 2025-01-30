import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";

import { cn } from "@/lib/utils";

interface TooltipWrapperProps {
  triggerNode: React.ReactNode;
  contentNode: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
  asChild?: boolean;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  triggerNode,
  contentNode,
  side = "bottom",
  sideOffset = 4,
  className,
  asChild = false,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild={asChild}>{triggerNode}</TooltipTrigger>
        <TooltipContent
          className={cn("bg-neutral-400/60 shadow-xl backdrop-blur-md", className)}
          sideOffset={sideOffset}
          side={side}
          {...props}
        >
          {contentNode}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
