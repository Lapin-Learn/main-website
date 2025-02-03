import StreakIcon from "@/assets/icons/streak";
import StreakLostIcon from "@/assets/icons/streak-lost";
import type { Streak } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";

type StreakProps = {
  streak: Streak;
  className?: string;
};

const Streak = ({ streak, className }: StreakProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {streak.extended ? (
        <StreakIcon className="size-5 md:size-6" />
      ) : (
        <StreakLostIcon className="size-5 md:size-6" fill="blue" />
      )}
      <span
        className={cn("font-semibold", streak.extended ? "text-orange-500" : "text-neutral-300")}
      >
        {formatNumber(streak.current)}
      </span>
    </div>
  );
};

export default Streak;
