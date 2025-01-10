import { InfiniteData } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { TimerType } from "@/hooks/zustand/use-global-timer";
import { PagedData, PagingSchema } from "@/lib/types/pagination.type";

import { DEFAULT_TIME_LIMIT } from "../consts";
import { EnumMode, EnumRole, EnumSkill } from "../enums";
import { ROUTE_PERMISSION } from "../route-permission";

export * from "./getTimeStamps";

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

export const scrollToElementById = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
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
