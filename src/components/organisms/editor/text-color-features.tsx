import { Editor } from "@tiptap/react";
import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type BubbleColorMenuItem = {
  name: string;
  color: string;
};

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "#000000",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Orange",
    color: "#EE5D28",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
  {
    name: "Yellow",
    color: "#FFC107",
  },
  {
    name: "Green",
    color: "#b5e9a9",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "",
  },
  {
    name: "Blue",
    color: "#C1E6FF",
  },
  {
    name: "Orange",
    color: "#fac47e",
  },
  {
    name: "Gray",
    color: "#EFEFEF",
  },
  {
    name: "Yellow",
    color: "#fff475",
  },
  {
    name: "Green",
    color: "#b5e9a9",
  },
];

type ColorSelectorProps = {
  editor: Editor;
};

const TextColorFeatures = ({ editor }: ColorSelectorProps) => {
  if (!editor) return null;
  const activeColorItem = TEXT_COLORS.find(({ color }) => editor.isActive("textStyle", { color }));

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <span
          className="size-4 rounded-sm py-1 text-center"
          style={{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }}
        >
          A
        </span>
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl"
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">Color</div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                if (name !== "Default") {
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                } else {
                  editor.chain().focus().unsetColor().run();
                }
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-sm border px-2 py-px font-medium" style={{ color }}>
                  A
                </div>
                <span>{name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <div>
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">Background</div>
          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                if (name !== "Default") {
                  editor.chain().focus().setHighlight({ color }).run();
                } else {
                  editor.chain().focus().unsetHighlight().run();
                }
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && <Check className="size-4" />}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextColorFeatures;
