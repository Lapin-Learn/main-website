import { gamificationKeys } from "@hooks/react-query/useGamification.ts";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useMemo } from "react";
import { create } from "zustand";

import { FIREBASE_ANALYTICS_EVENTS } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { PagingSchema } from "@/lib/types";
import { calculateOverallBandScore, fromPageToOffset, parseInfiniteData } from "@/lib/utils";
import {
  evaluateSimulatedTest,
  getLatestInprogressSTSession,
  getQuestionTypeAccuracy,
  getSessionProgress,
  getSimulatedTestBySkill,
  getSimulatedTestCollectionDetail,
  getSimulatedTestCollections,
  getSimulatedTestDetail,
  getSimulatedTestSessionDetail,
  getSimulatedTestSessionHistory,
  getSTSessionHistoryByST,
  getUserBandScoreOverall,
  SimulatedSkillTestParams,
  startSimulatedTest,
  STSessionHistoryBySTParams,
  submitSimulatedTest,
} from "@/services/simulated-test";

import { useToast } from "../use-toast";

const simulatedTestKeys = {
  collectionKey: ["collection"] as const,
  collectionList: (params: Partial<PagingSchema>) =>
    [...simulatedTestKeys.collectionKey, params] as const,
  collectionDetail: (collectionId: number) =>
    [...simulatedTestKeys.collectionKey, collectionId] as const,
  skillTestKey: ["skill-test"] as const,
  skillTestDetail: (params: SimulatedSkillTestParams) =>
    [...simulatedTestKeys.skillTestKey, params] as const,
  session: ["session"] as const,
  sessionList: (filter: STSessionHistoryBySTParams) =>
    [...simulatedTestKeys.session, filter] as const,
  sessionListByST: (simulatedTestId: number, filter: STSessionHistoryBySTParams) =>
    [...simulatedTestKeys.session, simulatedTestId, filter] as const,
  sessionDetail: (sessionId: number) => [...simulatedTestKeys.session, sessionId] as const,
  simulatedTestKey: ["simulated-test"] as const,
  simulatedTestDetail: (simulatedTestId: number) =>
    [...simulatedTestKeys.simulatedTestKey, simulatedTestId] as const,
  overall: () => [...simulatedTestKeys.simulatedTestKey, "overall"] as const,
  questionTypeAccuracy: (skill: EnumSkill) => ["question-type-accuracy", skill] as const,
  sessionProgress: (skill: EnumSkill) => [...simulatedTestKeys.session, "progress", skill] as const,
  latestSession: ["latest"] as const,
  latestSessionByCollection: (collectionId: number) =>
    [...simulatedTestKeys.latestSession, collectionId] as const,
};

type State = {
  keyword: string;
};

type Action = {
  clearSearch: () => void;
  setSearch: (search: State) => void;
};

export const useSearch = create<Action & State>((set) => ({
  keyword: "",
  clearSearch: () => set({ keyword: "" }),
  setSearch: (search: State) => set(search),
}));

export const useGetListSimulatedTestCollection = () => {
  const { fetchNextPage, isFetchingNextPage, hasNextPage, data, refetch, isLoading, isRefetching } =
    useInfiniteQuery({
      queryKey: simulatedTestKeys.collectionList({}),
      queryFn: ({ pageParam }) => {
        const page = pageParam || 1;
        const { offset, limit } = fromPageToOffset({ page });
        return getSimulatedTestCollections({ page: offset, pageSize: limit });
      },
      getNextPageParam: (lastPage) => {
        const { total, offset, limit, page } = lastPage;
        return page * limit + offset <= total ? page + 1 : undefined;
      },
      initialPageParam: 0,
    });
  return {
    list: useMemo(() => parseInfiniteData(data), [data]),
    isLoading,
    isRefetching,
    refetch,
    loadMoreProps: {
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
    },
  };
};

export const useGetCollectionInfo = (collectionId: number) => {
  const { list, isLoading } = useGetListSimulatedTestCollection();
  return { isLoading, collection: list.find((item) => item.id === collectionId) };
};

export const useGetSkillTestData = (skillTestId: number, partNo: number) => {
  return useQuery({
    queryKey: simulatedTestKeys.skillTestDetail({ skillTestId, partNo }),
    queryFn: () => {
      if (partNo == 0) throw new Error("Test doesn't have part 0");
      if (skillTestId) {
        return getSimulatedTestBySkill({ skillTestId, partNo });
      }
    },
    retry: false,
  });
};

export const useGetCollectionDetail = (collectionId: number) => {
  const { fetchNextPage, isFetchingNextPage, hasNextPage, data, refetch, isLoading, isRefetching } =
    useInfiniteQuery({
      queryKey: simulatedTestKeys.collectionDetail(collectionId),
      queryFn: ({ pageParam }) => {
        const page = pageParam || 1;
        const { offset, limit } = fromPageToOffset({ page });
        return getSimulatedTestCollectionDetail(collectionId, { page: offset, pageSize: limit });
      },
      getNextPageParam: (lastPage) => {
        const { total, offset, limit, page } = lastPage;
        return page * limit + offset <= total ? page + 1 : undefined;
      },
      initialPageParam: 0,
    });
  return {
    list: useMemo(() => parseInfiniteData(data), [data]),
    isLoading,
    isRefetching,
    refetch,
    loadMoreProps: {
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
    },
  };
};

export const useStartSimulatedTest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const analytics = getAnalytics();
  return useMutation({
    mutationFn: startSimulatedTest,
    onSuccess: (returnData) => {
      if (returnData) {
        navigate({
          to: "/practice/simulated-test",
          search: {
            skillTestId: returnData.skillTestId,
            sessionId: returnData.id,
          },
        });
      }
      logEvent(analytics, FIREBASE_ANALYTICS_EVENTS.startSimulatedTest, {
        skillTestId: returnData.skillTestId,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useSubmitSimulatedTest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitSimulatedTest,
    onSuccess: (_, variables) => {
      if (variables.status == EnumSimulatedTestSessionStatus.FINISHED) {
        navigate({
          to: "/practice/simulated-test/result",
          search: {
            sessionId: variables.sessionId,
          },
        });
        toast({
          title: "Success",
          description: "Submit test successfully",
        });
      } else {
        if (variables.status == EnumSimulatedTestSessionStatus.IN_PROGRESS) {
          queryClient.invalidateQueries({ queryKey: simulatedTestKeys.latestSession });
        }
        navigate({ to: "/practice" });
      }
      queryClient.removeQueries({
        queryKey: simulatedTestKeys.session,
      });
      queryClient.invalidateQueries({
        queryKey: simulatedTestKeys.collectionKey,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useGetSTSessionDetail = (sessionId: number) => {
  const result = useQuery({
    queryKey: simulatedTestKeys.sessionDetail(sessionId),
    queryFn: () => getSimulatedTestSessionDetail(sessionId),
    retry: false,
  });
  const session = result.data;

  if (
    !session ||
    session.skillTest.skill === EnumSkill.writing ||
    session.skillTest.skill === EnumSkill.speaking
  )
    return {
      ...result,
      userAnswers: [],
      answerStatus: [],
    };

  const userAnswers = new Array(session.responses?.length || 0).fill(null);
  const answerStatus = new Array(session.skillTest.answers?.length || 0).fill(null);
  session.responses?.forEach((answer, index) => {
    if ("answer" in answer) {
      userAnswers[answer.questionNo - 1] = answer.answer;
    }
    answerStatus[answer.questionNo - 1] = session.results[index];
  });

  return {
    ...result,
    userAnswers,
    answerStatus,
  };
};

export const useGetSimulatedTestDetail = (simulatedTestId: number, enabled = false) => {
  return useQuery({
    queryKey: simulatedTestKeys.simulatedTestDetail(simulatedTestId),
    queryFn: () => getSimulatedTestDetail(simulatedTestId),
    enabled,
  });
};

export const useGetUserBandScoreOverall = () => {
  return useQuery({
    queryKey: simulatedTestKeys.overall(),
    queryFn: async () => {
      const bandScores = await getUserBandScoreOverall();
      // All skills available
      if (Object.keys(bandScores).length == 4) {
        const overall = calculateOverallBandScore(
          bandScores.map((item) => item.estimatedBandScore)
        );
        return {
          bandScores,
          overallBandScore: overall ?? 0,
        };
      }
      return {
        bandScores,
        overallBandScore: null,
      };
    },
  });
};

export const useGetSTSessionsHistory = (offset: number, limit: number) => {
  return useQuery({
    queryKey: simulatedTestKeys.sessionList({ offset, limit }),
    queryFn: async () => getSimulatedTestSessionHistory({ offset, limit }),
    placeholderData: keepPreviousData,
  });
};

export const useGetLatestInprogressSTSession = (collectionId?: number) => {
  return useQuery({
    queryKey: collectionId
      ? simulatedTestKeys.latestSessionByCollection(collectionId)
      : simulatedTestKeys.latestSession,
    queryFn: async () => getLatestInprogressSTSession({ collectionId }),
    placeholderData: keepPreviousData,
  });
};

export const useGetSTSessionsHistoryByST = (
  simulatedTestId: number,
  params: STSessionHistoryBySTParams
) => {
  return useQuery({
    queryKey: simulatedTestKeys.sessionListByST(simulatedTestId, params),
    queryFn: async () => getSTSessionHistoryByST(simulatedTestId, params),
    placeholderData: keepPreviousData,
    enabled: !!simulatedTestId,
  });
};

export const useGetQuestionTypeAccuracy = (skill: EnumSkill) => {
  return useQuery({
    queryKey: simulatedTestKeys.questionTypeAccuracy(skill),
    queryFn: async () => getQuestionTypeAccuracy(skill),
  });
};

export const useGetSessionProgress = (skill: EnumSkill, from?: string, to?: string) => {
  return useQuery({
    queryKey: simulatedTestKeys.sessionProgress(skill),
    queryFn: async () => getSessionProgress(skill, from, to),
  });
};

export const useEvaluateSimulatedTest = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: evaluateSimulatedTest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: simulatedTestKeys.session,
      });
      queryClient.invalidateQueries({
        queryKey: simulatedTestKeys.collectionKey,
      });
      queryClient.invalidateQueries({
        queryKey: gamificationKeys.gamificationProfile,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
