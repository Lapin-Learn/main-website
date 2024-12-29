import { Editor, JSONContent } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent } from "@tiptap/react";

type WritingQuestionCardProps = {
  content: JSONContent | string;
};
export default function WritingQuestionCard({ content }: WritingQuestionCardProps) {
  const editor = new Editor({
    extensions: [
      Paragraph,
      Text,
      Heading,
      Image.configure({
        HTMLAttributes: {
          class: "!w-3/4 !self-center",
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
