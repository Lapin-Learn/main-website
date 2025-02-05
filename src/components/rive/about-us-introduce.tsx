import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas-lite";
import { useEffect } from "react";

import { BaseRiveProps } from "./type";
import { usePlayInView } from "./use-play-in-view";

type RiveAboutUsIntroduceProps = BaseRiveProps & {
  variant: number;
};

const RiveAboutUsIntroduce = ({ variant, fallback, className }: RiveAboutUsIntroduceProps) => {
  const { rive, RiveComponent } = useRive({
    src: "https://firebasestorage.googleapis.com/v0/b/lapin-learn.appspot.com/o/rive%2Fwhat_abous_us.riv?alt=media&token=8da2e33c-28b8-4c9c-b1dc-46d0c6c3d021",
    stateMachines: "main",
    autoplay: false,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const { ref } = usePlayInView(rive);

  useEffect(() => {
    if (rive) {
      const variantInput = rive.stateMachineInputs("main").find((input) => input.name === "Step");
      if (variantInput) {
        variantInput.value = variant;
      }
    }
  }, [variant, rive]);

  return (
    <div className={className} ref={ref}>
      <RiveComponent />
      {rive == null ? fallback : null}
    </div>
  );
};

export { RiveAboutUsIntroduce };
