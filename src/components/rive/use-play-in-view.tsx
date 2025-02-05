import { Rive } from "@rive-app/react-canvas-lite";
import { useEffect, useRef } from "react";

const usePlayInView = (rive: Rive | null) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (rive) {
          if (entry.isIntersecting) {
            rive.play();
          } else {
            rive.reset({
              stateMachines: "main",
            });
          }
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rive]);
  return { ref };
};

export { usePlayInView };
