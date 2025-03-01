import { InfiniteData } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import i18next from "i18next";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { TimerType } from "@/hooks/zustand/use-global-timer";
import { Mission } from "@/lib/types/mission.type";
import { PagedData, PagingSchema } from "@/lib/types/pagination.type";

import {
  DEFAULT_TIME_LIMIT,
  MAPPED_SPEAKING_CRITERIA_TITLES,
  MAPPED_WRITING_CRITERIA_TITLES,
} from "../consts";
import { EnumMissionCategory, EnumMode, EnumRole, EnumSkill } from "../enums";
import { ROUTE_PERMISSION } from "../route-permission";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSearchParams = (
  data: Record<string, string | string[] | number | boolean | undefined>
) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (val !== "") {
            params.append(key, val.toString());
          }
        });
      } else {
        params.append(key, value.toString());
      }
    }
  }

  return params.toString();
};

export const parseInfiniteData = <T>(data?: InfiniteData<PagedData<T>>) => {
  if (!data) return [];
  return data.pages.map((x) => x.items).flat() || [];
};

export const fromOffsetToPage = <T>(value: PagedData<T>) => {
  if (!value.offset || !value.limit) return { page: 1, pageSize: 10 };
  return {
    page: Math.ceil(value.offset / value.limit) + 1,
    pageSize: value.limit,
  };
};

export const fromPageToOffset = (value: PagingSchema) => {
  return {
    offset: !value.page || !value.pageSize ? 0 : (value.page - 1) * value.pageSize,
    limit: value.pageSize,
  };
};

export const splitTextSpace = (text: string) => {
  return text.split(/(\s+)/).filter((part) => part !== "");
};

export const generateKeyword = (
  filter: Record<string, string | number | Record<string, string | number>>
) => {
  return Object.values(filter)
    .map((value) => {
      if (typeof value === "number") {
        return value.toString();
      }
      if (typeof value === "object") {
        return Object.values(value).join(" ");
      }
      return value;
    })
    .join(" ")
    .trim();
};

export const searchSchema = z.object({
  skill: z.nativeEnum(EnumSkill).optional().catch(undefined),
});

export const isDevEnv = () => process.env.NODE_ENV === "development";

export const scrollToElementById = (id: string, offset = 80) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const container = element.closest("[data-radix-scroll-area-viewport]");
    if (container) {
      container.scrollBy({ top: elementPosition - offset, behavior: "smooth" });
    }
  }
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toFixed(0).toString().padStart(2, "0")}`;
};

export const formatAnswerSheetToResponses = (answerSheet: Record<string, string | null>) => {
  return Object.entries(answerSheet).map(([questionNo, answer]) => ({
    questionNo: parseInt(questionNo),
    answer,
  }));
};

export const getTimerMode = (mode: EnumMode, timeLimit: number): TimerType => {
  if (mode === EnumMode.PRACTICE) {
    if (timeLimit === 0) {
      return "stopwatch";
    } else {
      return "countdown";
    }
  } else {
    return "countdown";
  }
};

/**
 * Return initial time for countdown timer
 * @param mode
 * @param timeLimit
 * @param skill
 * @returns initial time in milliseconds
 */
export const getInitialTime = (mode: EnumMode, timeLimit: number, skill: EnumSkill): number => {
  if (mode === EnumMode.PRACTICE) {
    return timeLimit * 60 * 1000;
  } else {
    return DEFAULT_TIME_LIMIT[skill] * 60 * 1000;
  }
};

export const getPartName = (skill: EnumSkill) => {
  if (skill === EnumSkill.reading) {
    return "Passage";
  } else if (skill === EnumSkill.writing) {
    return "Task";
  }
  return "Part";
};

export const getElapsedTime = (type: TimerType, initialTime: number, currentTime: number) => {
  if (type === "stopwatch") {
    return currentTime / 1000;
  } else {
    return (initialTime - currentTime) / 1000;
  }
};

export const checkRoutePermission = (pathname: string, userRole: EnumRole) => {
  if (ROUTE_PERMISSION[pathname]) {
    return ROUTE_PERMISSION[pathname].includes(userRole);
  }
  return true;
};

export const genQuestionId = (questionNo: number | string) => {
  return `Question-${questionNo}`;
};

export const formatBandScore = (bandScore: number): number => {
  return Math.round(bandScore * 2) / 2;
};

export function formatUnit(value: number, unit: string) {
  const { t, language: currentLanguage } = i18next;
  return `${value} ${t(`time_units.${unit}`, {
    ns: "common",
  })}${currentLanguage === "en" && value > 1 ? "s" : ""}`;
}

export const formatLearningDuration = (duration: number) => {
  const hour = (duration / 3600).toFixed(1);
  const min = (duration / 60).toFixed(0);
  return duration > 3600
    ? formatUnit(parseFloat(hour), "hour")
    : formatUnit(parseFloat(min), "minute");
};

export const formatNumber = (num: number) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (Math.floor(num / 100) / 10).toFixed(1) + "K";
  } else if (num < 1000000000) {
    return (Math.floor(num / 100000) / 10).toFixed(1) + "M";
  } else {
    return (Math.floor(num / 100000000) / 10).toFixed(1) + "B";
  }
};

export function formatRemainingToDateTime(targetTime: number) {
  const currentTime = Date.now();
  const remainingTime = targetTime - currentTime;

  if (remainingTime <= 0) return "0 seconds";

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  if (days > 0) return formatUnit(days, "day");
  if (hours > 0) return formatUnit(hours, "hour");
  if (minutes > 0) return formatUnit(minutes, "minute");
  return formatUnit(seconds, "second");
}

export function convertMissionNameCategory(item: Mission) {
  const { t } = i18next;
  switch (item.category) {
    case EnumMissionCategory.COMPLETE_LESSON_WITH_PERCENTAGE_SCORE:
      return t(`mission.description.${item.requirements ? item.category : "COMPLETE_LESSON"}`, {
        context: item.requirements === 100 ? "PERFECT" : "",
        quantity: item.quantity,
        requirements: item.requirements,
        ns: "practice",
      });
    case EnumMissionCategory.TOTAL_DURATION_OF_LEARN_DAILY_LESSON:
      return t(`mission.description.${item.category}`, {
        requirements: formatUnit(item.quantity, "minute"),
        ns: "practice",
      });
    default:
      return t(`mission.description.${item.category}`, {
        quantity: item.quantity,
        requirements: item.requirements,
        ns: "practice",
      });
  }
}

export function formatVNDCurrency(value: number) {
  return "đ " + value.toLocaleString();
}

export function assertFallback<T>(value: T | undefined, fallback: T): T {
  return value ?? fallback;
}

export const calculateOverallBandScore = (scores: (number | null)[]) => {
  const validScores = scores.filter((score): score is number => score !== null);
  if (validScores.length !== 4) return undefined;
  const overall = validScores.reduce((acc, score) => acc + score, 0) / validScores.length;
  return Math.round(overall * 2) / 2;
};

export const getDuration = (startTime: number): number => {
  const endTime = new Date().getTime();
  return Math.round(Math.abs(endTime - startTime) / 1000);
};

export const getYesterday = (date: Date) => new Date(date.setDate(date.getDate() - 1));

export const getCriterias = (skill: EnumSkill, isBrief: boolean = false) => {
  const criterias =
    skill === EnumSkill.writing ? MAPPED_WRITING_CRITERIA_TITLES : MAPPED_SPEAKING_CRITERIA_TITLES;

  if (isBrief) return criterias;
  return Object.entries(criterias).reduce(
    (acc, [key, value]) => {
      acc[key] = `${value} (${key})`;
      return acc;
    },
    {} as Record<string, string>
  );
};
