import { useRive } from "@rive-app/react-canvas";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";
import { EnumRank } from "@/lib/enums";

import { useResultStepperContext } from "./result-stepper-provider";
import { LevelRankProps } from "./type";

const mappedRiveAssests = {
  [EnumRank.bronze]: 1,
  [EnumRank.silver]: 2,
  [EnumRank.gold]: 3,
  [EnumRank.platinum]: 4,
  [EnumRank.diamond]: 5,
  [EnumRank.master]: 6,
};

const LevelRankStep = ({ value: { level, rank } }: LevelRankProps) => {
  const { t } = useTranslation("milestone");
  const { data: learner, isFetching } = useGetGamificationProfile();

  const { nextMilestone } = useResultStepperContext();
  const { rive, RiveComponent } = useRive({
    src: "/level_up.riv",
    artboard: "Level",
    stateMachines: "main",
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressChanging = setInterval(() => {
      setProgress((prev) => {
        if (prev < 300) {
          return prev + 1;
        }
        return prev;
      });
    }, 2);
    return () => {
      clearInterval(progressChanging);
    };
  }, []);

  useEffect(() => {
    if (rive) {
      const progressWidth = rive
        .stateMachineInputs("main")
        .find((input) => input.name === "progress");
      if (progressWidth) {
        progressWidth.value = (progress / 500) * 300; // Set the progress value as needed
      }
    }
  }, [progress, rive]);

  const textValues = useMemo(
    () => [
      { key: "levelUpText", value: t("gain-new-level") },
      { key: "level1", value: `${t("level.label", { ns: "gamification" })} ${level}` },
      { key: "level2", value: `${t("level.label", { ns: "gamification" })} ${level}` },
      { key: "levelNumber", value: level.toString() },
      { key: "rank", value: `${t(`rank.${rank}`, { ns: "gamification" })}` },
      {
        key: "exp1",
        value: `${learner?.xp ?? 0}/${learner?.level.xp ?? 0} ${t("level.exp", { ns: "gamification" })}`,
      },
      {
        key: "exp2",
        value: `${learner?.xp ?? 0}/${learner?.level.xp ?? 0} ${t("level.exp", { ns: "gamification" })}`,
      },
      { key: "textBtn", value: t("button.next"), path: "main button" },
      { key: "textBtn", value: t("button.share"), path: "share button" },
    ],
    [learner, isFetching]
  );

  const stateMachineInputs = [
    { name: "withRank", value: rank !== null ? 1 : 0 },
    { name: "badgeVariant", value: rank ? mappedRiveAssests[rank] : 0 },
  ];

  useEffect(() => {
    if (rive && !isFetching && learner) {
      const textValues = [
        { key: "levelUpText", value: t("gain-new-level") },
        { key: "level", value: `${t("level.label", { ns: "gamification" })} ${level}` },
        { key: "levelNumber", value: level.toString() },
        { key: "rank", value: `${t(`rank.${rank}`, { ns: "gamification" })}` },
        {
          key: "exp",
          value: `${learner.xp ?? 0}/${learner.level.xp} ${t("level.exp", { ns: "gamification" })}`,
        },
        { key: "textBtn", value: t("button.next"), path: "main button" },
        { key: "textBtn", value: t("button.share"), path: "share button" },
      ];
      textValues.forEach(({ key, value, path }) => {
        if (path) {
          rive.setTextRunValueAtPath(key, value, path);
        } else {
          rive.setTextRunValue(key, value);
        }
      });
      stateMachineInputs.forEach(({ name, value }) => {
        const input = rive.stateMachineInputs("main")?.find((input) => input.name === name);
        if (input) {
          input.value = value;
        }
      });
    }
  }, [learner, isFetching, rive, learner]);

  useEffect(() => {
    if (rive && !isFetching) {
      rive.play();
      textValues.forEach(({ key, value, path }) => {
        if (path) {
          rive.setTextRunValueAtPath(key, value, path);
        } else {
          rive.setTextRunValue(key, value);
        }
      });
    }
  }, [rive, isFetching]);

  return (
    <div className="relative">
      <RiveComponent />
      <div className="absolute bottom-0 w-full p-8">
        <Button size="3xl" className=" w-full" onClick={nextMilestone}>
          {t("button.next")}
        </Button>
      </div>
    </div>
  );
};

export default LevelRankStep;
