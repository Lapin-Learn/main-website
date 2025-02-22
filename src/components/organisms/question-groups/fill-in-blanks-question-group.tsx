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
import { InputField, SelectNode } from "@/components/editor/local-custom-extensions";
import { QuestionGroupFillInBlanks } from "@/lib/types/simulated-test.type";

import { useQuestionGroupContext } from ".";

export default function FillInBlanksQuestionGroup({ questions }: QuestionGroupFillInBlanks) {
  useQuestionGroupContext();

  const editor = new Editor({
    extensions: [
      StarterKit,
      InputField,
      SelectNode,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table,
      TableCell,
      TableHeader,
      TableRow,
    ],
    content: questions,
    // content: {
    //   type: "doc",
    //   content: [
    //     { type: "paragraph", attrs: { textAlign: "left" } },
    //     {
    //       type: "paragraph",
    //       attrs: { textAlign: "left" },
    //       content: [
    //         {
    //           text: "According to Professor John Hattie of the Melbourne Education Research Institute, there is very little indication that streaming leads to",
    //           type: "text",
    //         },
    //         { type: "custom-select", attrs: { questionNo: "31" } },
    //         {
    //           text: ". He points out that, in schools which use streaming, the most significant impact is on those students placed in the",
    //           type: "text",
    //         },
    //         { type: "custom-select", attrs: { questionNo: "32" } },
    //         { text: ", especially where a large proportion of them have", type: "text" },
    //         { type: "custom-select", attrs: { questionNo: "33" } },
    //         { text: ". Meanwhile, for the", type: "text" },
    //         { type: "custom-select", attrs: { questionNo: "34" } },
    //         {
    //           text: ", there appears to be only minimal advantage. A further issue is that teachers tend to have",
    //           type: "text",
    //         },
    //         { type: "custom-select", attrs: { questionNo: "35" } },
    //         { text: "of students in streamed groups.", type: "text" },
    //       ],
    //     },
    //   ],
    // },
    editable: false,
    injectCSS: false,
  });

  return (
    <div>
      <EditorContent editor={editor} autoComplete="off" />
    </div>
  );
}
