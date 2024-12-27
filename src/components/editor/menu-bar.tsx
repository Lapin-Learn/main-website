import { Editor } from "@tiptap/react";
import { CornerDownLeft, MessageCircleQuestion } from "lucide-react";

import TableFeatures from "@/components/editor/components/table-features";
import { Button, Input } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <MessageCircleQuestion className="mr-1" size={16} />
            Insert input
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const questionNo = formData.get("questionNo");
              editor
                .chain()
                .focus()
                .insertContent(
                  {
                    type: "custom-input",
                    attrs: {
                      questionNo: questionNo,
                    },
                  },
                  {
                    parseOptions: {
                      preserveWhitespace: false,
                    },
                  }
                )
                .run();
            }}
          >
            <Input placeholder="Enter question number" name="questionNo" />
            <button type="submit">
              <CornerDownLeft />
            </button>
          </form>
        </PopoverContent>
      </Popover>
      <TableFeatures editor={editor} />
    </div>
  );
};

export default MenuBar;
