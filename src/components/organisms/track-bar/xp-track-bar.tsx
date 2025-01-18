import RankIcon from "@/components/molecules/rank-icon";
import { EnumRank } from "@/lib/enums";
import { formatNumber } from "@/lib/utils";

type XpTrackBarProps = {
  level?: number;
  currentXp?: number;
  levelXp?: number;
  rank?: EnumRank;
};

const XpTrackBar = ({
  level = 1,
  currentXp = 0,
  levelXp = 100,
  rank = EnumRank.bronze,
}: XpTrackBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <RankIcon name={rank} className="size-6" />
      <div className="w-40">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-blue-700">Lv. {level}</span>
          <span className="text-xs text-blue-700">
            {formatNumber(currentXp)}/{formatNumber(levelXp)}
          </span>
        </div>
        <div className="mt-0.5 h-1.5 w-full rounded-full bg-neutral-50">
          <div
            className="h-1.5 rounded-full bg-blue-400"
            style={{ width: `${currentXp > levelXp ? 100 : (currentXp / levelXp) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default XpTrackBar;
