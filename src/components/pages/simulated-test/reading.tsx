import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Editor } from "@tiptap/core";
import { mockParagraph } from "./mock-paragraph";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

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
      <ResizablePanel minSize={20}>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ReadingPage;
