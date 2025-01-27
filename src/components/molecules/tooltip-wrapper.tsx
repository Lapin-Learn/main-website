import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";

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
  className = "bg-neutral-300",
  asChild = false,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={400}>
        <TooltipTrigger asChild={asChild}>{triggerNode}</TooltipTrigger>
        <TooltipContent className={className} sideOffset={sideOffset} side={side} {...props}>
          {contentNode}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
