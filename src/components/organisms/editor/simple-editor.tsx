import "@/styles/styles.css";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

type SimpleEditorProps = {
  defaultContent: string;
  onChange: (content: string) => void;
};
export default function SimpleEditor({ defaultContent, onChange }: SimpleEditorProps) {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: defaultContent,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} className="py-4 [&>[role='textbox']]:outline-none" />;
}
