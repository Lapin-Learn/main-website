import { useEffect, useRef, useState } from "react";

export default function useInView() {
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

  return { ref, isInView };
}
