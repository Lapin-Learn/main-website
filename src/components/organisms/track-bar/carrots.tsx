import CarrotIcon from "@/assets/icons/carrot";
import { formatNumber } from "@/lib/utils";

type CarrotsProps = {
  carrots: number;
  size?: "sm" | "base" | "md" | "lg";
  textStyle?: string;
};

const sizeClasses = {
  sm: "w-4 h-4",
  base: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

const Carrots = ({ carrots, size = "md", textStyle }: CarrotsProps) => {
  return (
    <div className="flex items-center gap-1">
      <CarrotIcon className={sizeClasses[size]} />
      <span className={`font-semibold ${textStyle}`}>{formatNumber(carrots)}</span>
    </div>
  );
};

export default Carrots;
