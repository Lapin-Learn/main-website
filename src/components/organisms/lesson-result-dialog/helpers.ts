import { getFreezeDays } from "@components/organisms/streak/utils.ts";

import { EnumBandScore, EnumMileStone, EnumRank } from "@/lib/enums";
import { Level } from "@/lib/types";
import { LessonResult, MissionMilestone } from "@/lib/types/daily-lesson.type";
import { StreakHistory } from "@/lib/types/gamification.type.ts";
import { formatTime } from "@/lib/utils";
import { parseMission } from "@/services/gamification";

import { EnumResultStepper, StepperProps } from "./type";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
};

const getCurrentWeekBooleanObject = (dayNames: string[], doneRecords?: StreakHistory[]) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDay); // Set to the start of the week (Sunday)

  const weekBooleanObject: Record<string, boolean | "freeze" | undefined> = {};
  if (!doneRecords) return weekBooleanObject;
  const freezeDays = getFreezeDays(doneRecords);
  const doneRecordsSet = new Set(doneRecords.map((record) => formatDate(new Date(record.date))));

  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(startOfWeek);
    weekDate.setDate(startOfWeek.getDate() + i);
    const formattedDate = formatDate(weekDate);
    if (weekDate > currentDate) {
      weekBooleanObject[dayNames[i]] = undefined;
    } else {
      weekBooleanObject[dayNames[i]] = freezeDays.includes(weekDate.toDateString())
        ? "freeze"
        : doneRecordsSet.has(formattedDate);
    }
  }

  return weekBooleanObject;
};

/**
 * This function is used to transform the milestone data to the stepper data.
 * Advantage: Don't have to change the stepper component when the milestone data changes
 * */
const transformStepper = (result: LessonResult) => {
  const { milestones, correctAnswers, wrongAnswers } = result;
  const steps: Record<string, StepperProps> = {};
  steps[EnumResultStepper.RESULT] = {
    type: EnumResultStepper.RESULT,
    value: {
      carrot: result.bonusCarrot,
      exp: result.bonusXP,
      percent: Math.ceil((correctAnswers / (correctAnswers + wrongAnswers)) * 100),
      timer: formatTime(result.duration),
    },
  };
  const bandScoreMilestone = milestones.find(
    (milestone) => milestone.type === EnumMileStone.BAND_SCORE_UP
  );
  if (bandScoreMilestone) {
    steps[EnumResultStepper.BAND_SCORE_UP] = {
      type: EnumResultStepper.BAND_SCORE_UP,
      value: bandScoreMilestone.newValue as EnumBandScore,
    };
  }
  const levelMilestone = milestones.find((milestone) => milestone.type === EnumMileStone.LEVEL_UP);
  const rankMilestone = milestones.find((milestone) => milestone.type === EnumMileStone.RANK_UP);
  if (levelMilestone) {
    if (rankMilestone) {
      steps[EnumResultStepper.LEVEL_RANK] = {
        type: EnumResultStepper.LEVEL_RANK,
        value: {
          level: (levelMilestone.newValue as Level).id,
          rank: rankMilestone.newValue as EnumRank,
        },
      };
    } else {
      steps[EnumResultStepper.LEVEL_RANK] = {
        type: EnumResultStepper.LEVEL_RANK,
        value: {
          level: (levelMilestone.newValue as Level).id,
          rank: null,
        },
      };
    }
  }
  const missionMilestone = milestones.find(
    (milestone) => milestone.type === EnumMileStone.MISSION_COMPLETED
  );
  const streakMilestone = milestones.find(
    (milestone) => milestone.type === EnumMileStone.DAILY_STREAK
  );
  if (streakMilestone) {
    steps[EnumResultStepper.DAILY_STREAK] = {
      type: EnumResultStepper.DAILY_STREAK,
      value: streakMilestone.newValue as number,
    };
  }
  if (missionMilestone) {
    steps[EnumResultStepper.MISSION_COMPLETED] = {
      type: EnumResultStepper.MISSION_COMPLETED,
      value: (missionMilestone.newValue as MissionMilestone[]).map((d) => {
        const { rewards, requirements, category, quantity } = d.mission.quest;
        return parseMission({
          interval: d.mission.type,
          rewards,
          current: d.current,
          quantity: quantity,
          requirements,
          category,
          missionId: d.missionId,
          status: d.status,
          questId: d.mission.quest.id,
        });
      }),
    };
  }
  return steps;
};

export { formatDate, getCurrentWeekBooleanObject, transformStepper };
