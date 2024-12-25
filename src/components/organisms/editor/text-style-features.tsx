import { Editor } from "@tiptap/react";
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
enum TextStyle {
  bold = "bold",
  italic = "italic",
  strikethrough = "strikethrough",
  underline = "underline",
}

const TextStyleFeatures = ({ editor }: { editor: Editor }) => {
  const [textStyle, setTextStyle] = useState<Set<TextStyle>>(new Set<TextStyle>());
  const activeItalic = editor?.isActive(TextStyle.italic);
  const activeBold = editor?.isActive(TextStyle.bold);
  const activeStrikeThrough = editor?.isActive(TextStyle.strikethrough);

  useEffect(() => {
    if (!editor) return;
    setTextStyle((prev: Set<TextStyle>) => {
      if (activeItalic) {
        prev.add(TextStyle.italic);
      } else {
        prev.delete(TextStyle.italic);
      }
      if (activeBold) {
        prev.add(TextStyle.bold);
      } else {
        prev.delete(TextStyle.bold);
      }
      if (activeStrikeThrough) {
        prev.add(TextStyle.strikethrough);
      } else {
        prev.delete(TextStyle.strikethrough);
      }
      return new Set(prev);
    });
  }, [editor, activeItalic, activeBold, activeStrikeThrough]);

  if (!editor) {
    return null;
  }

  const actions: {
    [key: string]: {
      checkActive: () => boolean;
      label: string;
      action: () => void;
    };
  } = {
    h1: {
      checkActive: () => editor.isActive("heading", { level: 1 }),
      label: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    h2: {
      checkActive: () => editor.isActive("heading", { level: 2 }),
      label: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    h3: {
      checkActive: () => editor.isActive("heading", { level: 3 }),
      label: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    h4: {
      checkActive: () => editor.isActive("heading", { level: 4 }),
      label: "Heading 4",
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    h5: {
      checkActive: () => editor.isActive("heading", { level: 5 }),
      label: "Heading 5",
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    },
    h6: {
      checkActive: () => editor.isActive("heading", { level: 6 }),
      label: "Heading 6",
      action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    },
    paragraph: {
      checkActive: () => editor.isActive("paragraph"),
      label: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
    },
  };

  return (
    <>
      <Select
        value={
          Object.entries(actions).find(([_, value]) => value.checkActive())?.[0] ?? "paragraph"
        }
        onValueChange={(value: keyof typeof actions) => actions[value].action()}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(actions).map(([key, value]) => (
            <SelectItem value={key} key={key}>
              {value.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ToggleGroup
        type="multiple"
        className="gap-0"
        value={Array.from(textStyle.values())}
        onValueChange={(value: TextStyle[]) => setTextStyle(new Set(value))}
      >
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <BoldIcon className="size-4" />
        </ToggleGroupItem>
        <Separator orientation="vertical" className="h-6" />
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="size-4" />
        </ToggleGroupItem>
        <Separator orientation="vertical" className="h-6" />
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon className="size-4" />
        </ToggleGroupItem>
        <Separator orientation="vertical" className="h-6" />
      </ToggleGroup>
      <Button
        variant={editor.isActive("code") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        title="Toggle code style"
      >
        <CodeIcon size={16} />
      </Button>
    </>
  );
};
export default TextStyleFeatures;
