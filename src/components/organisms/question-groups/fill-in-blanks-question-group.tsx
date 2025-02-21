import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
} from "@/components/editor/extensions";
import { InputField } from "@/components/editor/local-custom-extensions";
import { QuestionGroupFillInBlanks } from "@/lib/types/simulated-test.type";

const extensions = [
  StarterKit,
  InputField,
  TextStyle,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Table,
  TableCell,
  TableHeader,
  TableRow,
];

export default function FillInBlanksQuestionGroup({ questions }: QuestionGroupFillInBlanks) {
  const editor = new Editor({
    extensions,
    content: questions,
    editable: false,
    injectCSS: false,
  });

  return (
    <div>
      <EditorContent editor={editor} autoComplete="off" />
    </div>
  );
}
