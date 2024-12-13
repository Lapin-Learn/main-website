import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { QuestionGroupFillInBlanks } from "@/lib/types/simulated-test.type";

import CustomInput from "./input-node";

const extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc pl-4",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "mb-2",
      },
    },
  }),
  CustomInput,
];

export default function FillInBlanksQuestionGroup({
  questions,
  questionCard,
}: QuestionGroupFillInBlanks) {
  const editor = new Editor({
    extensions,
    content: questions,
    editable: false,
    injectCSS: false,
  });
  return (
    <div>
      <h6 className="font-bold">{questionCard}</h6>
      <EditorContent editor={editor} />
    </div>
  );
}
