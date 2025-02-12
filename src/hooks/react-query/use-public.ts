import { useQuery } from "@tanstack/react-query";

import { getCollectionIntroduction, searchCollections } from "@/services";

import { useSearch } from "./use-simulated-test";

const publicKeys = {
  searchCollectionKey: ["searchCollection"] as const,
  searchCollection: (params: Partial<{ keyword?: string }>) =>
    [...publicKeys.searchCollectionKey, params] as const,
  collectionIntroductionKey: ["collectionIntroduction"] as const,
};

export const useSearchCollection = () => {
  const { keyword } = useSearch();
  return useQuery({
    queryKey: publicKeys.searchCollection({ keyword }),
    queryFn: async () => searchCollections(keyword),
  });
};

export const useGetCollectionIntroduction = () => {
  return useQuery({
    queryKey: publicKeys.collectionIntroductionKey,
    queryFn: async () => getCollectionIntroduction(),
  });
};
