import Rive, { Fit, Layout } from "@rive-app/react-canvas";

export function RiveSound() {
  return (
    <Rive
      src="https://firebasestorage.googleapis.com/v0/b/lapin-learn.appspot.com/o/rive%2Fspeaker.riv?alt=media&token=9bf6095e-e794-4cd2-be47-5d541b0c3dee"
      artboard="sound"
      stateMachines="main"
      layout={new Layout({ fit: Fit.Cover })}
    />
  );
}
