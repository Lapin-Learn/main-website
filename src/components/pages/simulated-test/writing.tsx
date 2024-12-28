import { Loader2 } from "lucide-react";
import { useState } from "react";

import WritingQuestionCard from "@/components/molecules/writing-question-card";
import SimpleEditor from "@/components/organisms/editor/editor-writing-test";
import { Separator, Typography } from "@/components/ui";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import useBreakPoint from "@/hooks/use-screen-size";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { WRITING_INSTRUCTIONS } from "@/lib/consts";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

const WritingPage = () => {
  const { skillTestId } = Route.useSearch();
  const [_, setAnswer] = useState("");
  const {
    position: { part: currentPart },
  } = useSimulatedTestState();
  const breakpoint = useBreakPoint();
  const { data: testContent, isLoading } = useGetSkillTestData(skillTestId, currentPart);

  return (
    <ResizablePanelGroup
      direction={breakpoint == "xs" ? "vertical" : "horizontal"}
      className="shadow-[inset_0px_5px_8px_0_rgb(0_0_0_/_0.05),inset_0px_-5px_8px_0_rgb(0_0_0_/_0.05)]"
    >
      <ResizablePanel className="content" minSize={20}>
        {testContent && !isLoading ? (
          <ScrollArea className="h-full px-4 sm:px-8">
            <div className="my-4 flex flex-col">
              <Typography variant="h4">{WRITING_INSTRUCTIONS[currentPart - 1].title}</Typography>
              <Typography>{WRITING_INSTRUCTIONS[currentPart - 1].content}</Typography>
            </div>
            <Separator />
            <div className="mt-4 flex flex-col">
              <WritingQuestionCard content={testContent.content} />
            </div>
          </ScrollArea>
        ) : (
          <div className="grid size-full flex-1 place-items-center">
            <Loader2 className="animate-spin text-neutral-300" size={24} />
          </div>
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="answer-sheet" minSize={20}>
        <SimpleEditor onChange={setAnswer} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default WritingPage;
