import StreakIcon from "@/assets/icons/streak";
import StreakLostIcon from "@/assets/icons/streak-lost";
import { IStreak } from "@/lib/interfaces";
import { cn, formatNumber } from "@/lib/utils";

type StreakProps = {
  streak: IStreak;
};

const Streak = ({ streak }: StreakProps) => {
  return (
    <div className="flex items-center gap-1">
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
