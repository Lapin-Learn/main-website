import "@/styles/styles.css";

import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

import { EditorWordCount } from "@/components/editor/components/editor-word-count";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type SimpleEditorProps = {
  defaultContent?: string;
  onChange: (content: string) => void;
};
export default function SimpleEditor({ defaultContent = "", onChange }: SimpleEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        includeChildren: true,
        showOnlyCurrent: false,
        placeholder: () => "",
      }),
      CharacterCount.configure({ limit: 50000 }),
    ],
    content: defaultContent,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="flex h-full flex-col overflow-hidden pb-4">
      <ScrollArea className="h-full flex-1 px-4 sm:px-8">
        <EditorContent editor={editor} className="mt-4" />
      </ScrollArea>
      <Separator />
      <EditorWordCount editor={editor} showWords className="px-4 sm:px-8" />
    </div>
  );
}
