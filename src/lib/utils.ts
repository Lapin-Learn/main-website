import { InfiniteData } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { PagedData, PagingSchema } from "@/lib/types/pagination.type";

import { EnumSkill } from "./enums";

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
        return Object.values(value).join("");
      }
      return value;
    })
    .join("");
};

export const searchSchema = z.object({
  skill: z.nativeEnum(EnumSkill).optional().catch(undefined),
});

export const isDevEnv = () => process.env.NODE_ENV === "development";
