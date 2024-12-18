import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { FetchingData, PagedData, PagingSchema } from "@/lib/types";
import {
  ReadingContent,
  SimulatedTest,
  SimulatedTestCollection,
  SimulatedTestSession,
} from "@/lib/types/simulated-test.type";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";

export type CollectionParams = {
  keyword?: string;
} & PagingSchema;

export const getSimulatedTestCollections = async (payload: CollectionParams) => {
  const searchParams = generateSearchParams(payload);
  return (
    await api
      .get("collections", {
        searchParams,
      })
      .json<FetchingData<PagedData<SimulatedTestCollection>>>()
  ).data;
};

export type SimulatedSkillTestParams = {
  skillTestId: number;
  partNo: number;
};
export const getSimulatedTestBySkill = async ({
  skillTestId,
  partNo,
}: SimulatedSkillTestParams) => {
  const searchParams = generateSearchParams({ part: partNo });
  return (
    await api
      .get(`skill-tests/${skillTestId}`, {
        searchParams,
      })
      .json<FetchingData<ReadingContent>>()
  ).data;
};

export const getSimulatedTestCollectionDetail = async (
  collectionId: number,
  payload: PagingSchema
) => {
  const searchParams = generateSearchParams(payload);
  return (
    await api
      .get(`collections/${collectionId}/simulated-tests`, {
        searchParams,
      })
      .json<FetchingData<PagedData<SimulatedTest>>>()
  ).data;
};

export type SimulatedTestSessionPayload = {
  skillTestId: number;
  timeLimit: number;
  mode: EnumMode;
  parts: number[];
};

export const startSimulatedTest = async (payload: SimulatedTestSessionPayload) => {
  return (
    await api
      .post("simulated-tests/session", {
        json: payload,
      })
      .json<FetchingData<SimulatedTestSession>>()
  ).data;
};

type SubmitSimulatedTestPayload = {
  elapsedTime: number;
  status: EnumSimulatedTestSessionStatus;
  responses: {
    questionNo: number;
    answer: string | null;
  }[];
};

export const submitSimulatedTest = async (
  payload: SubmitSimulatedTestPayload & {
    sessionId: number;
  }
) => {
  const { sessionId, ...rest } = payload;
  return (
    await api
      .put(`simulated-tests/session/${sessionId}`, {
        json: rest,
      })
      .json<FetchingData<string>>()
  ).data;
};
