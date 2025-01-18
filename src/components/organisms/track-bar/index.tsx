import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";

import Carrots from "./carrots";
import Streak from "./streak";
import XpTrackBar from "./xp-track-bar";

type TrackBarProps = {
  data: ReturnType<typeof useGetGamificationProfile>["data"];
};

const TrackBar = ({ data }: TrackBarProps) => {
  if (!data) return null;

  return (
    <div className="flex flex-row items-center justify-center gap-6 rounded-2xl bg-white py-4">
      <button onClick={() => alert("Streak")}>
        <Streak streak={data.streak} />
      </button>
      <button onClick={() => alert("Carrots")}>
        <Carrots carrots={data.carrots} size="base" textStyle="text-orange-400" />
      </button>
      <XpTrackBar
        level={data.level.id}
        currentXp={data.xp}
        levelXp={data.level.xp}
        rank={data.rank}
      />
    </div>
  );
};

export default TrackBar;
