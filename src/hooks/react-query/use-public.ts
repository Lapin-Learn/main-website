import { useQuery } from "@tanstack/react-query";

import { Blog, BlogResponse } from "@/lib/types";
import { getBlog, getBlogs, getCollectionIntroduction, searchCollections } from "@/services";

import { useSearch } from "./use-simulated-test";

export const publicKeys = {
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

export const useGetBlogs = (initialData?: BlogResponse) => {
  return useQuery({
    queryKey: publicKeys.blogs,
    queryFn: getBlogs,
    initialData,
  });
};

export const useGetBlog = (id: string, initialData?: Blog) => {
  return useQuery({
    queryKey: publicKeys.blog(id),
    queryFn: () => getBlog(id),
    initialData,
  });
};
