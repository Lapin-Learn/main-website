import { DEFAULT_PAGE_SIZE } from "@/lib/consts";
import { fromPageToOffset, parseInfiniteData } from "@/lib/utils";
import { CollectionParams, getSimulatedTestCollections } from "@/services/simulated-test";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { create } from "zustand";

const simulatedTestKeys = {
  collectionKey: ["collection"] as const,
  collectionList: (params: Partial<CollectionParams>) =>
    [...simulatedTestKeys.collectionKey, params] as const,
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
  console.log(keyword);
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
