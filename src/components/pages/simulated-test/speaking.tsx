import { Loader2 } from "lucide-react";

import PartInstruction from "@/components/molecules/speaking-part-instruction";
import SpeakingMicTest from "@/components/organisms/speaking-mic-test";
import SpeakingQuestion from "@/components/organisms/speaking-question";
import { useSpeakingStore } from "@/hooks/zustand/use-recording-store";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { PART_TITLES } from "@/lib/consts";
// import { Route } from "@/routes/_authenticated/practice/simulated-test";
// import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";

const SpeakingPage = () => {
  //TODO: Handle get test data
  // const { skillTestId } = Route.useSearch();
  const { testState } = useSpeakingStore();
  const {
    position: { part: currentPart },
  } = useSimulatedTestState();
  // const { data: testContent, isLoading } = useGetSkillTestData(skillTestId, currentPart);
  const testContent = { content: "test content" };
  const isLoading = false;

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#F0FCFF] to-[#C7E1EF]">
      {testContent && !isLoading ? (
        <>
          {testState === "not-started" ? (
            <SpeakingMicTest />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              <h4 className="text-heading-4 font-semibold">{PART_TITLES[currentPart]}</h4>
              <PartInstruction partNo={currentPart} />
              <SpeakingQuestion />
            </div>
          )}
        </>
      ) : (
        <div className="grid size-full flex-1 place-items-center">
          <Loader2 className="animate-spin text-neutral-300" size={24} />
        </div>
      )}
    </div>
  );
};

export default SpeakingPage;
