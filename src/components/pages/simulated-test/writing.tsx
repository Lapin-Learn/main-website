import SimpleEditor from "@/components/organisms/editor/simple-editor";
import { Typography } from "@/components/ui";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import useBreakPoint from "@/hooks/use-screen-size";

const WritingPage = () => {
  const breakpoint = useBreakPoint();
  return (
    <ResizablePanelGroup
      direction={breakpoint == "xs" ? "vertical" : "horizontal"}
      className="shadow-[inset_0px_5px_8px_0_rgb(0_0_0_/_0.05),inset_0px_-5px_8px_0_rgb(0_0_0_/_0.05)]"
    >
      <ResizablePanel className="content" minSize={20}>
        <ScrollArea className="h-full px-4 sm:px-8">
          <div className="my-4 flex flex-col">
            <Typography variant="h4">Part 1</Typography>
            <Typography>
              You should spend about 20 minutes on this task. Write at least 150 words.
            </Typography>
          </div>
          <div className="flex flex-col">
            <p>
              The graph below shows the number of visitors to three London Museums between 2007 and
              2012.
            </p>
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="answer-sheet" minSize={20}>
        <ScrollArea className="h-full px-4 sm:px-8">
          <SimpleEditor
            defaultContent={`
      <p>
        This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
      </p>
      <p>
        The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
      </p>
    `}
            onChange={(content) => console.log(content)}
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default WritingPage;
