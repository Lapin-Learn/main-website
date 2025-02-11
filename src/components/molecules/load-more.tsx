import { InfiniteQueryObserverBaseResult } from "@tanstack/react-query";
import { useEffect } from "react";

import useInView from "@/hooks/use-in-view";

export interface LoadMoreProps {
  hasNextPage: InfiniteQueryObserverBaseResult["hasNextPage"];
  fetchNextPage: InfiniteQueryObserverBaseResult["fetchNextPage"];
  isFetchingNextPage: InfiniteQueryObserverBaseResult["isFetchingNextPage"];
  label?: string;
}

export const LoadMore = (props: LoadMoreProps) => {
  const { hasNextPage, isFetchingNextPage, fetchNextPage, label = "Loading more..." } = props;

  const { ref, isInView } = useInView();

  useEffect(() => {
    if (!isFetchingNextPage && isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, isFetchingNextPage, hasNextPage]);

  if (!hasNextPage) return null;

  return (
    <>
      <div ref={ref} className="h-10"></div>
      {isFetchingNextPage && (
        <div className="px-2 py-3">
          <span>{label}</span>
        </div>
      )}
    </>
  );
};
