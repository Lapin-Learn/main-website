import { Editor, JSONContent } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { cn } from "@/lib/utils";

type WritingQuestionCardProps = {
  content: JSONContent | string;
  imageClassName?: string;
};
export default function WritingQuestionCard({ content, imageClassName }: WritingQuestionCardProps) {
  const editor = new Editor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: cn("!w-3/4 !self-center", imageClassName),
        },
      }),
    ],
    content,
    editable: false,
    injectCSS: false,
  });
  return <EditorContent editor={editor} />;
}
