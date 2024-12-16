import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { create } from "zustand";

import { fromPageToOffset, parseInfiniteData } from "@/lib/utils";
import {
  CollectionParams,
  getSimulatedTestBySkill,
  getSimulatedTestCollectionDetail,
  getSimulatedTestCollections,
  SimulatedSkillTestParams,
  startSimulatedTest,
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
    onSuccess: (response) => {
      if (response.ok) {
        navigate({ to: "/simulated-test" });
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
