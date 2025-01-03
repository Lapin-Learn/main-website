import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { create } from "zustand";

import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { fromPageToOffset, parseInfiniteData } from "@/lib/utils";
import {
  CollectionParams,
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
  collectionList: (params: Partial<CollectionParams>) =>
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
};

type State = {
  keyword: string;
};

type Action = {
  clearFilter: () => void;
  setFilter: (filter: State) => void;
};

export const useFilter = create<Action & State>((set) => ({
  keyword: "",
  clearFilter: () => set({ keyword: "" }),
  setFilter: (filter: State) => set(filter),
}));

export const useGetListSimulatedTestCollection = () => {
  const { keyword } = useFilter();
  const { fetchNextPage, isFetchingNextPage, hasNextPage, data, refetch, isLoading, isRefetching } =
    useInfiniteQuery({
      queryKey: simulatedTestKeys.collectionList({ keyword }),
      queryFn: ({ pageParam }) => {
        const page = pageParam || 1;
        return getSimulatedTestCollections({ keyword, ...fromPageToOffset({ page }) });
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
      } else {
        // TODO: should we navigate back to collection/${collectionId}?
        navigate({ to: "/practice" });
      }
      queryClient.invalidateQueries({
        queryKey: simulatedTestKeys.sessionDetail(variables.sessionId),
      });
      toast({
        title: "Success",
        description: "Submit test successfully",
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
  const answerStatus = new Array(session.results?.length || 0).fill(null);
  session.responses?.forEach((answer, index) => {
    userAnswers[answer.questionNo - 1] = answer.answer;
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
        const overall =
          Object.values(bandScores).reduce((acc, cur) => acc + Number(cur.bandScore), 0) / 4;
        return {
          bandScores,
          overallBandScore: Math.round(overall * 2) / 2,
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
