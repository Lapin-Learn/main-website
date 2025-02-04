import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas-lite";

import { BaseRiveProps } from "./type";
import { usePlayInView } from "./use-play-in-view";

const RiveHeroBanner = ({ fallback, className }: BaseRiveProps) => {
  const { rive, RiveComponent } = useRive({
    src: "https://firebasestorage.googleapis.com/v0/b/lapin-learn.appspot.com/o/rive%2Fhero_banner.riv?alt=media&token=be7d21eb-ee98-4658-bb2f-c828e4faaf0c",
    stateMachines: "main",
    autoplay: false,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const { ref } = usePlayInView(rive);

  return (
    <div className={className} ref={ref}>
      <RiveComponent />
      {rive == null ? fallback : null}
    </div>
  );
};

export { RiveHeroBanner };
