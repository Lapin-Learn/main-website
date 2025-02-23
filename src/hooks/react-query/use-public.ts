import { useQuery } from "@tanstack/react-query";

import { getBlog, getBlogs, getCollectionIntroduction, searchCollections } from "@/services";

import { useSearch } from "./use-simulated-test";

const publicKeys = {
  searchCollectionKey: ["searchCollection"] as const,
  searchCollection: (params: Partial<{ keyword?: string }>) =>
    [...publicKeys.searchCollectionKey, params] as const,
  collectionIntroductionKey: ["collectionIntroduction"] as const,
  blogs: ["blogs"] as const,
  blog: (id: string) => [...publicKeys.blogs, id] as const,
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

export const useGetBlogs = () => {
  return useQuery({
    queryKey: publicKeys.blogs,
    queryFn: async () => getBlogs(),
  });
};

export const useGetBlog = (id: string) => {
  return useQuery({
    queryKey: publicKeys.blog(id),
    queryFn: async () => getBlog(id),
  });
};
