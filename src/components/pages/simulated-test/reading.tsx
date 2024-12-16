import { Loader2 } from "lucide-react";
import { useState } from "react";
import { CallBackProps, STATUS } from "react-joyride";

import ReadingPassage from "@/components/mocules/reading-passage";
import QuestionGroup from "@/components/organisms/question-groups";
import SimulatedTestTour from "@/components/organisms/simulated-test-tour";
import { Button } from "@/components/ui";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import useBreakPoint from "@/hooks/use-screen-size";
import useSimulatedTest from "@/hooks/use-simulated-test";
import { EnumQuestionGroup } from "@/lib/enums";

const ReadingPage = () => {
  const { testContent, isLoading } = useSimulatedTest();
  const breakpoint = useBreakPoint();
  const [run, setRun] = useState(false);

  const handleStartTour = () => {
    setRun(true);
  };

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  return (
    <ResizablePanelGroup
      direction={breakpoint == "xs" ? "vertical" : "horizontal"}
      className="shadow-[inset_0px_5px_8px_0_rgb(0_0_0_/_0.05),inset_0px_-5px_8px_0_rgb(0_0_0_/_0.05)]"
    >
      {/* Test button */}
      <Button onClick={handleStartTour}>Start</Button>
      <SimulatedTestTour run={run} handleTourCallback={handleTourCallback} />
      <ResizablePanel className="content" minSize={20}>
        {testContent && !isLoading ? (
          <ScrollArea className={"h-full px-4 sm:px-8"}>
            <ReadingPassage content={testContent.content} />
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
              {testContent.questionGroups.map((questionGroup) => {
                switch (questionGroup.questionType) {
                  case EnumQuestionGroup.fillInBlanks:
                    return (
                      <QuestionGroup.FillInBlanks
                        key={questionGroup.startQuestionNo}
                        {...questionGroup}
                      />
                    );
                  case EnumQuestionGroup.matchingHeadings:
                    return (
                      <QuestionGroup.MatchingHeadings
                        key={questionGroup.startQuestionNo}
                        {...questionGroup}
                      />
                    );
                  default:
                    return (
                      <QuestionGroup.MultipleChoice
                        key={questionGroup.startQuestionNo}
                        {...questionGroup}
                      />
                    );
                }
              })}
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
