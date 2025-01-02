import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { FetchingData, PagedData, PagingSchema } from "@/lib/types";
import {
  BandScoreSkill,
  ReadingContent,
  SimulatedTest,
  SimulatedTestAnswer,
  SimulatedTestCollection,
  SimulatedTestSession,
  SimulatedTestSessionsHistory,
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
  try {
    const searchParams = generateSearchParams({ part: partNo });
    return (
      await api
        .get(`skill-tests/${skillTestId}`, {
          searchParams,
        })
        .json<FetchingData<ReadingContent>>()
    ).data;
  } catch (error) {
    console.error(error);
    return null;
  }
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

type StartSimulatedTestResponse = {
  id: number;
  skillTestId: number;
};

export const startSimulatedTest = async (payload: SimulatedTestSessionPayload) => {
  return (
    await api
      .post("simulated-tests/session", {
        json: payload,
      })
      .json<FetchingData<StartSimulatedTestResponse>>()
  ).data;
};

type SubmitSimulatedTestPayload = {
  elapsedTime: number;
  status: EnumSimulatedTestSessionStatus;
  responses: SimulatedTestAnswer[];
};

export const submitSimulatedTest = async (
  payload: SubmitSimulatedTestPayload & {
    sessionId: number;
  }
) => {
  const { sessionId, ...rest } = payload;
  if (payload.responses.length === 0) {
    return null;
  }
  return (
    await api
      .put(`simulated-tests/session/${sessionId}`, {
        json: rest,
      })
      .json<FetchingData<string>>()
  ).data;
};

export const getSimulatedTestSessionDetail = async (sessionId: number) => {
  return (
    await api.get(`simulated-tests/session/${sessionId}`).json<FetchingData<SimulatedTestSession>>()
  ).data;
};

export const getSimulatedTestDetail = async (simulatedTestId: number) => {
  return (await api.get(`simulated-tests/${simulatedTestId}`).json<FetchingData<SimulatedTest>>())
    .data;
};

export const getUserBandScoreOverall = async () => {
  return (await api.get("simulated-tests/report").json<FetchingData<BandScoreSkill[]>>()).data;
};

export const getSimulatedTestSessionHistory = async (payload: {
  offset: number;
  limit: number;
}) => {
  const searchParams = generateSearchParams(payload);
  return (
    await api
      .get("simulated-tests/sessions", { searchParams })
      .json<FetchingData<PagedData<SimulatedTestSessionsHistory>>>()
  ).data;
};
