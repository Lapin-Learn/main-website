import { InfiniteQueryObserverBaseResult } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export interface LoadMoreProps {
  hasNextPage: InfiniteQueryObserverBaseResult["hasNextPage"];
  fetchNextPage: InfiniteQueryObserverBaseResult["fetchNextPage"];
  isFetchingNextPage: InfiniteQueryObserverBaseResult["isFetchingNextPage"];
  // TODO: inject React.ReactNode
  label?: string;
}

export const LoadMore = (props: LoadMoreProps) => {
  const { hasNextPage, isFetchingNextPage, fetchNextPage, label = "Loading more..." } = props;

  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.1,
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

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
