import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { InputField, InputFieldDisabled } from "@/components/editor/local-custom-extensions";
import { QuestionGroupFillInBlanks } from "@/lib/types/simulated-test.type";

const extensions = [StarterKit, InputField];
const extensionsDisabled = [StarterKit, InputFieldDisabled];

export default function FillInBlanksQuestionGroup({
  questions,
  questionCard,
  disabled,
}: QuestionGroupFillInBlanks) {
  const editor = new Editor({
    extensions: disabled ? extensionsDisabled : extensions,
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
