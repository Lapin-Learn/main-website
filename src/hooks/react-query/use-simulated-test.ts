import { DEFAULT_PAGE_SIZE } from "@/lib/consts";
import { fromPageToOffset, parseInfiniteData } from "@/lib/utils";
import { CollectionParams, getSimulatedTestCollections } from "@/services/simulated-test";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const simulatedTestKeys = {
  collectionKey: ["collection"] as const,
  collectionList: (params: CollectionParams) =>
    [...simulatedTestKeys.collectionKey, params] as const,
};
export const useGetListSimulatedTestCollection = (params: Pick<CollectionParams, "keyword">) => {
  const { fetchNextPage, isFetchingNextPage, hasNextPage, data, refetch, isLoading, isRefetching } =
    useInfiniteQuery({
      queryKey: simulatedTestKeys.collectionKey,
      queryFn: ({ pageParam }) => {
        const page = pageParam || 1;
        return getSimulatedTestCollections({ ...params, ...fromPageToOffset({ page }) });
      },
      getNextPageParam: (lastPage) => {
        // TODO: replace DEFAULT_PAGE_SIZE with actual data return from BE
        const { total, offset, page } = lastPage;
        return (page + 1) * DEFAULT_PAGE_SIZE + offset <= total ? page + 2 : undefined;
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
