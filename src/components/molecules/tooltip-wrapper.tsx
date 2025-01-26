import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";

interface TooltipWrapperProps {
  triggerNode: React.ReactNode;
  contentNode: React.ReactNode;
  sideOffset?: number;
  className?: string;
  asChild?: boolean;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  triggerNode,
  contentNode,
  sideOffset = 4,
  className = "bg-neutral-300",
  asChild = false,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{triggerNode}</TooltipTrigger>
        <TooltipContent className={className} sideOffset={sideOffset} {...props}>
          {contentNode}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
