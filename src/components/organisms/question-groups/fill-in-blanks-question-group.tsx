import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { InputField } from "@/components/editor/local-custom-extensions";
import { QuestionGroupFillInBlanks } from "@/lib/types/simulated-test.type";

const extensions = [StarterKit, InputField];

export default function FillInBlanksQuestionGroup({
  questions,
  questionCard,
}: QuestionGroupFillInBlanks) {
  const editor = new Editor({
    extensions: extensions,
    content: questions,
    editable: false,
    injectCSS: false,
  });

  return (
    <div>
      <h6 className="font-bold">{questionCard}</h6>
      <EditorContent editor={editor} autoComplete="off" />
    </div>
  );
}
