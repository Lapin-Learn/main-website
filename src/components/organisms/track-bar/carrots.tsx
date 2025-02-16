import CarrotIcon from "@/assets/icons/carrot";
import { cn, formatNumber } from "@/lib/utils";

type CarrotsProps = {
  carrots: number;
  size?: "sm" | "base" | "md" | "lg";
  textStyle?: string;
  className?: string;
};

const sizeClasses = {
  sm: "w-4 h-4 shrink-0",
  base: "md:size-6 size-5 shrink-0",
  md: "w-8 h-8 shrink-0",
  lg: "w-10 h-10 shrink-0",
};

const Carrots = ({ carrots, size = "md", textStyle, className }: CarrotsProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <CarrotIcon className={sizeClasses[size]} />
      <span className={`font-semibold ${textStyle}`}>{formatNumber(carrots)}</span>
    </div>
  );
};

export default Carrots;
