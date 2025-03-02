import { Loader2 } from "lucide-react";

import { MorphingText } from "../magicui/morphing-text";

const LoadingPage = () => {
  return (
    <main className="absolute top-0 z-50 grid h-screen w-screen place-items-center content-center gap-8 bg-white">
      <MorphingText texts={["LAPINLEARN", "IELTS"]} className="text-primary md:text-[3rem]" />
      <Loader2 className="size-12 animate-spin text-supporting-text" />
    </main>
  );
};

export default LoadingPage;
