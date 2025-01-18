import { Editor, JSONContent } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent } from "@tiptap/react";

import { cn } from "@/lib/utils";

type WritingQuestionCardProps = {
  content: JSONContent | string;
  imageClassName?: string;
};
export default function WritingQuestionCard({ content, imageClassName }: WritingQuestionCardProps) {
  const editor = new Editor({
    extensions: [
      Paragraph,
      Text,
      Heading,
      Image.configure({
        HTMLAttributes: {
          class: cn("!w-3/4 !self-center", imageClassName),
        },
      }),
      Document,
      TextStyle,
    ],
    content,
    editable: false,
    injectCSS: false,
  });
  return <EditorContent editor={editor} />;
}
