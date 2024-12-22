import { Editor } from "@tiptap/react";
import { CornerDownLeft } from "lucide-react";

import { Button, Input } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="m-4 flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
      >
        Insert table
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Insert input</Button>
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
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        disabled={!editor.can().addColumnBefore()}
      >
        Add column before
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        disabled={!editor.can().addColumnAfter()}
      >
        Add column after
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().deleteColumn().run()}
        disabled={!editor.can().deleteColumn()}
      >
        Delete column
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().addRowBefore().run()}
        disabled={!editor.can().addRowBefore()}
      >
        Add row before
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        disabled={!editor.can().addRowAfter()}
      >
        Add row after
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().deleteRow().run()}
        disabled={!editor.can().deleteRow()}
      >
        Delete row
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().deleteTable().run()}
        disabled={!editor.can().deleteTable()}
      >
        Delete table
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().mergeCells().run()}
        disabled={!editor.can().mergeCells()}
      >
        Merge cells
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().splitCell().run()}
        disabled={!editor.can().splitCell()}
      >
        Split cell
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        disabled={!editor.can().toggleHeaderColumn()}
      >
        ToggleHeaderColumn
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        disabled={!editor.can().toggleHeaderRow()}
      >
        Toggle header row
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        disabled={!editor.can().toggleHeaderCell()}
      >
        Toggle header cell
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
        disabled={!editor.can().mergeOrSplit()}
      >
        Merge or split
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().setCellAttribute("backgroundColor", "#FAF594").run()}
        disabled={!editor.can().setCellAttribute("backgroundColor", "#FAF594")}
      >
        Set cell attribute
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().fixTables().run()}
        disabled={!editor.can().fixTables()}
      >
        Fix tables
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().goToNextCell().run()}
        disabled={!editor.can().goToNextCell()}
      >
        Go to next cell
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().goToPreviousCell().run()}
        disabled={!editor.can().goToPreviousCell()}
      >
        Go to previous cell
      </Button>
    </div>
  );
};

export default MenuBar;
