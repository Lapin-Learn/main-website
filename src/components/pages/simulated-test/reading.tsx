import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import ReadingPassage from "@/components/molecules/reading-passage";
import QuestionGroupFactory from "@/components/organisms/question-groups";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSkillTestData, useGetSTSessionDetail } from "@/hooks/react-query/use-simulated-test";
import useBreakPoint from "@/hooks/use-screen-size";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { STSkillPageProps } from "@/lib/types/simulated-test.type";
import { scrollToElementById } from "@/lib/utils";

const ReadingPage = ({ skillTestId, sessionId }: STSkillPageProps) => {
  const {
    position: { part: currentPart, question },
  } = useSimulatedTestState();
  const { data: testContent, isLoading } = useGetSkillTestData(skillTestId, currentPart);
  const { data: session } = useGetSTSessionDetail(sessionId);
  const breakpoint = useBreakPoint();

  useEffect(() => {
    if (!isLoading) {
      scrollToElementById(`Question-${question}`);
    }
  }, [isLoading, question]);

  if (!session) {
    return null;
  }

  return (
    <ResizablePanelGroup
      direction={breakpoint == "xs" ? "vertical" : "horizontal"}
      className="shadow-[inset_0px_5px_8px_0_rgb(0_0_0_/_0.05),inset_0px_-5px_8px_0_rgb(0_0_0_/_0.05)]"
    >
      <ResizablePanel className="content" minSize={20}>
        {testContent && !isLoading ? (
          <ScrollArea className="h-full px-4 sm:px-8">
            {typeof testContent.content === "string" ? null : (
              <ReadingPassage content={testContent.content} />
            )}
          </ScrollArea>
        ) : (
          <div className="grid size-full flex-1 place-items-center">
            <Loader2 className="animate-spin text-neutral-300" size={24} />
          </div>
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="answer-sheet" minSize={20}>
        {testContent && !isLoading ? (
          <ScrollArea className="h-full px-4 sm:px-8">
            <div className="flex flex-col gap-16 py-4">
              {testContent.questionGroups.map((questionGroup) => (
                <QuestionGroupFactory
                  key={questionGroup.startQuestionNo}
                  questionGroup={questionGroup}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid size-full flex-1 place-items-center">
            <Loader2 className="animate-spin text-neutral-300" size={24} />
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ReadingPage;
