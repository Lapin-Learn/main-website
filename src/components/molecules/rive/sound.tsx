import Rive, { Fit, Layout } from "@rive-app/react-canvas";

export function RiveSound() {
  return (
    <Rive
      src="https://uilztdvkyvgjgeqd.public.blob.vercel-storage.com/Rive%20Editor%20File-ldcBVPPRhR9Fc5NG4XrY8wC0Y55DTR.riv"
      artboard="Artboard"
      layout={new Layout({ fit: Fit.Cover })}
    />
  );
}
