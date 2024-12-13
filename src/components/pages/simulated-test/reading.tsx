import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

import QuestionGroup from "@/components/organisms/question-groups";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EnumQuestionGroup } from "@/lib/enums";
import { mockParagraph, mockQuestionGroups } from "@/lib/mock/mock-reading-content";

const ReadingPage = () => {
  const editor = new Editor({
    editorProps: {
      attributes: {
        class: "bg-red-500",
      },
    },
    extensions: [StarterKit, Image],
    content: mockParagraph,
  });
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="shadow-[inset_0px_5px_8px_0_rgb(0_0_0_/_0.05),inset_0px_-5px_8px_0_rgb(0_0_0_/_0.05)]"
    >
      <ResizablePanel minSize={20}>
        <ScrollArea className="h-full px-8">
          <div className="py-4">
            {/* TODO: extract component and css file */}
            <div
              dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
              className="[&_h2]:mb-2 [&_h2]:text-center [&_h2]:text-2xl [&_h2]:font-bold [&_p]:mb-4 [&_p]:indent-6"
            />
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={20}>
        <ScrollArea className="h-full px-8">
          <div className="flex flex-col gap-6 py-4">
            {mockQuestionGroups.map((questionGroup) => {
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
