import { SVGProps } from "react";

import StreakFreeze from "@/assets/icons/streak-item/streak_freeze.tsx";

import StreakDefault from "./streak-item/streak_default";
import StreakDone from "./streak-item/streak_done";
import StreakMiss from "./streak-item/streak_miss";

type StreakIconProps = {
  variant: "done" | "miss" | "neutral" | "freeze";
} & SVGProps<SVGSVGElement>;

const StreakIcon = ({ variant, ...props }: StreakIconProps) => {
  switch (variant) {
    case "done":
      return <StreakDone {...props} />;
    case "miss":
      return <StreakMiss {...props} />;
    case "neutral":
      return <StreakDefault {...props} />;
    case "freeze":
      return <StreakFreeze {...props} />;
  }
};

export default StreakIcon;
