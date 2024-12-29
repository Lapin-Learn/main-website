import { createFileRoute } from "@tanstack/react-router";

import SpeakingPage from "@/components/pages/simulated-test/speaking";

export const Route = createFileRoute("/_authenticated/speaking/")({
  component: SpeakingTestPage,
});

function SpeakingTestPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col justify-between">
      {/* TODO: Get session */}
      {/* <Header currentPart={position.part} session={session} /> */}
      <SpeakingPage />
    </div>
  );
}
