import { useEffect } from "react";

import AudioPlayer from "@/components/molecules/audio-player";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { scrollToElementById } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

const ListeningPage = () => {
  const { skillTestId } = Route.useSearch();
  const {
    position: { part: currentPart, question },
  } = useSimulatedTestState();
  const { data: testContent, isLoading } = useGetSkillTestData(skillTestId, currentPart);

  useEffect(() => {
    if (!isLoading) {
      scrollToElementById(`Question-${question}`);
    }
  }, [isLoading, question]);

  return (
    <ScrollArea className="inner-shadow-section relative flex h-full w-screen flex-1 flex-col items-center bg-neutral-50">
      <div className="relative flex h-full w-screen flex-1 flex-col items-center px-4">
        <AudioPlayer
          className="sticky top-4 m-4 w-full rounded-md border p-4 md:w-1/2"
          src={typeof testContent?.content == "string" ? testContent.content : ""}
        />
        <div className="border-md h-[900px] w-full rounded-xl bg-white p-4 sm:w-3/4 sm:p-8">
          Content goes here
        </div>
      </div>
    </ScrollArea>
  );
};

export default ListeningPage;
