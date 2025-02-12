import { format } from "date-fns";

import { EnumMode, EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { FetchingData, OffsetSchema, PagedData, PagingSchema } from "@/lib/types";
import {
  BandScoreSkill,
  LatestInprogressSession,
  QuestionTypeAccuracy,
  ReadingContent,
  SessionProgress,
  SimulatedTest,
  SimulatedTestAnswer,
  SimulatedTestCollection,
  SimulatedTestSession,
  SimulatedTestSessionsHistory,
  SpeakingContent,
} from "@/lib/types/simulated-test.type";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";

export const getSimulatedTestCollections = async (payload: PagingSchema) => {
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
        .json<FetchingData<ReadingContent | SpeakingContent>>()
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
      .post("simulated-tests/sessions", {
        json: payload,
      })
      .json<FetchingData<StartSimulatedTestResponse>>()
  ).data;
};

type SubmitSimulatedTestPayload = {
  elapsedTime: number;
  status: EnumSimulatedTestSessionStatus;
  response:
    | {
        skill: EnumSkill.listening | EnumSkill.reading | EnumSkill.writing;
        info: SimulatedTestAnswer[];
      }
    | SpeakingPayload;
  // For speaking test
  files?: File[];
};

type SpeakingPayload = {
  skill: EnumSkill.speaking;
  info: {
    partNo: number;
    questionNo: number;
  }[];
};
export const submitSimulatedTest = async (
  payload: SubmitSimulatedTestPayload & {
    sessionId: number;
  }
) => {
  const { sessionId, response, files, ...rest } = payload;

  const formData = new FormData();
  Object.entries(rest).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });
  formData.append("response", JSON.stringify(response));
  if (files) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  if (response.info.length === 0) {
    formData.set("status", EnumSimulatedTestSessionStatus.CANCELED);
  }

  return (
    await api
      .put(`simulated-tests/sessions/${sessionId}`, {
        body: formData,
      })
      .json<FetchingData<string>>()
  ).data;
};

export const getSimulatedTestSessionDetail = async (sessionId: number) => {
  return (
    await api
      .get(`simulated-tests/sessions/${sessionId}`)
      .json<FetchingData<SimulatedTestSession>>()
  ).data;
};

export const getSimulatedTestDetail = async (simulatedTestId: number) => {
  return (await api.get(`simulated-tests/${simulatedTestId}`).json<FetchingData<SimulatedTest>>())
    .data;
};

export const getUserBandScoreOverall = async () => {
  return (await api.get("simulated-tests/report").json<FetchingData<BandScoreSkill[]>>()).data;
};

export const getSimulatedTestSessionHistory = async (payload: OffsetSchema) => {
  const searchParams = generateSearchParams(payload);
  return (
    await api
      .get("simulated-tests/sessions", { searchParams })
      .json<FetchingData<PagedData<SimulatedTestSessionsHistory>>>()
  ).data;
};

export const getLatestInprogressSTSession = async (payload: { collectionId?: number }) => {
  const searchParams = generateSearchParams(payload || {});
  return (
    await api
      .get("simulated-tests/sessions/latest", { searchParams })
      .json<FetchingData<LatestInprogressSession>>()
  ).data;
};

export type STSessionHistoryBySTParams = {
  skill?: EnumSkill;
} & OffsetSchema;
export const getSTSessionHistoryByST = async (
  simulatedTestId: number,
  params: STSessionHistoryBySTParams
) => {
  const searchParams = generateSearchParams(params);
  return (
    await api
      .get(`simulated-tests/${simulatedTestId}/sessions`, { searchParams })
      .json<FetchingData<PagedData<SimulatedTestSessionsHistory>>>()
  ).data;
};

export const getQuestionTypeAccuracy = async (skill: EnumSkill) => {
  const searchParams = generateSearchParams({ skill });
  return (
    await api
      .get(`question-types/accuracy`, { searchParams })
      .json<FetchingData<QuestionTypeAccuracy[]>>()
  ).data;
};

export const getSessionProgress = async (skill: EnumSkill, from?: string, to?: string) => {
  const searchParams = generateSearchParams({ skill, from, to });
  const result = (
    await api.get(`sessions/progress`, { searchParams }).json<FetchingData<SessionProgress[]>>()
  ).data;

  return result.map((item) => ({
    ...item,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));
};

export const evaluateSimulatedTest = async (sessionId: number) => {
  return (
    await api.post(`simulated-tests/sessions/${sessionId}/evaluating`).json<FetchingData<string>>()
  ).data;
};
