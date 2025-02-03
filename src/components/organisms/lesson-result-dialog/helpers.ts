import { EnumMileStone, EnumRank } from "@/lib/enums";
import { Level } from "@/lib/types";
import { LessonResult, MissionMilestone } from "@/lib/types/daily-lesson.type";
import { formatTime } from "@/lib/utils";
import { parseMission } from "@/services/gamification";

import { EnumResultStepper, StepperProps } from "./type";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
};

const getCurrentWeekBooleanObject = (doneRecords: string[], dayNames: string[]) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDay); // Set to the start of the week (Sunday)

  const weekBooleanObject: Record<string, boolean | undefined> = {};
  const doneRecordsSet = new Set(doneRecords.map((record) => formatDate(new Date(record))));

  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(startOfWeek);
    weekDate.setDate(startOfWeek.getDate() + i);
    const formattedDate = formatDate(weekDate);
    if (weekDate > currentDate) {
      weekBooleanObject[dayNames[i]] = undefined;
    } else {
      weekBooleanObject[dayNames[i]] = doneRecordsSet.has(formattedDate);
    }
  }

  return weekBooleanObject;
};

export const mockNewValue = [
  {
    id: "8e8c5466-d03c-4846-8904-06b81516d2ea",
    profileId: "2c5d34b7-de0a-45ab-974f-310b664c1a8f",
    missionId: "3eae3a99-3c53-4365-a3d5-54bcf2830dcb",
    status: "assigned",
    current: 2,
    createdAt: "2025-01-29T17:42:40.734Z",
    updatedAt: "2025-01-30T04:59:45.992Z",
    mission: {
      id: "3eae3a99-3c53-4365-a3d5-54bcf2830dcb",
      type: "daily",
      questId: "c386f523-bcde-44ce-a753-7d8df9461934",
      quantity: 3,
      createdAt: "2025-01-29T17:00:00.093Z",
      updatedAt: "2025-01-29T17:00:00.093Z",
      quest: {
        id: "c386f523-bcde-44ce-a753-7d8df9461934",
        name: "complete lesson with percentage score 80%",
        description: "Hoàn thành bài học với số điểm 80%",
        actionId: 2,
        requirements: 80,
        rewards: 6,
        type: "daily",
        category: "COMPLETE_LESSON_WITH_PERCENTAGE_SCORE",
        createdAt: "2024-10-19T03:34:10.837Z",
        updatedAt: "2024-10-19T03:34:10.837Z",
      },
    },
  },
];

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
          level: levelMilestone.newValue as number,
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
