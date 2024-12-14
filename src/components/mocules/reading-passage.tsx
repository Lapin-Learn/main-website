import { Editor, JSONContent } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type ReadingPassageProps = {
  content: JSONContent;
};
export default function ReadingPassage({ content }: ReadingPassageProps) {
  const editor = new Editor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "indent-6 mb-6",
          },
        },
        heading: {
          levels: [2],
          HTMLAttributes: {
            class: "font-bold text-2xl mb-4 text-center",
          },
        },
      }),
      Image,
    ],
    content,
    editable: false,
    injectCSS: false,
  });
  return <EditorContent editor={editor} className="py-4" />;
}
