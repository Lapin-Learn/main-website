import ReadingPassage from "@/components/mocules/reading-passage";
import QuestionGroup from "@/components/organisms/question-groups";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSimulatedTest from "@/hooks/use-simulated-test";
import { EnumQuestionGroup } from "@/lib/enums";

const ReadingPage = () => {
  const { testContent } = useSimulatedTest();
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="shadow-[inset_0px_5px_8px_0_rgb(0_0_0_/_0.05),inset_0px_-5px_8px_0_rgb(0_0_0_/_0.05)]"
    >
      <ResizablePanel minSize={20}>
        <ScrollArea className="h-full px-8">
          {testContent && <ReadingPassage content={testContent.content} />}
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={20}>
        <ScrollArea className="h-full px-8">
          <div className="flex flex-col gap-6 py-4">
            {testContent &&
              testContent.questionGroups.map((questionGroup) => {
                if (questionGroup.questionType == EnumQuestionGroup.fillInBlanks)
                  return (
                    <QuestionGroup.FillInBlanks
                      key={questionGroup.startQuestionNo}
                      {...questionGroup}
                    />
                  );
                else
                  return (
                    <QuestionGroup.MultipleChoice
                      key={questionGroup.startQuestionNo}
                      {...questionGroup}
                    />
                  );
              })}
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ReadingPage;
