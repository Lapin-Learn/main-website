import "@/styles/styles.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import JsonDisplayWithCopy from "@/components/molecules/json-display-with-copy";
import AddPartForm from "@/components/organisms/add-part-form-fields";
import MenuBar from "@/components/organisms/editor/menu-bar";
import CustomInput from "@/components/organisms/question-groups/input-node";
import { Button, Form } from "@/components/ui";
import { EnumQuestionGroup, EnumSkill } from "@/lib/enums";

const formSchema = z
  .object({
    skill: z.nativeEnum(EnumSkill).default(EnumSkill.reading),
    part: z.number().int().positive().default(1),
    startQuestionNo: z.number().int().positive(),
    endQuestionNo: z.number().int().positive(),
    questionType: z.nativeEnum(EnumQuestionGroup),
    questionCard: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.endQuestionNo < data.startQuestionNo) {
      return ctx.addIssue({
        message: "End question number must be greater than start question number",
        path: ["endQuestionNo"],
        code: "custom",
      });
    }
    return true;
  });
type FormSchema = z.infer<typeof formSchema>;

export default () => {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: EnumSkill.reading,
      part: 1,
      questionType: EnumQuestionGroup.fillInBlanks,
    },
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CustomInput,
      TextStyle,
      Color.configure({ types: [TextStyle.name] }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign,
    ],
    injectCSS: false,
  });
  const [result, setResult] = useState("{}");

  return (
    <main className="bg-neutral-50 p-8">
      <div className="rounded-md border bg-white p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Add new question group</h2>
          <Form {...methods}>
            <form className="grid grid-cols-2 gap-x-4 gap-y-6">
              <AddPartForm />
            </form>
          </Form>
          <div className="flex flex-col gap-4">
            <MenuBar editor={editor} />
            <EditorContent
              editor={editor}
              className="rounded-md border p-4 [&>[role='textbox']]:outline-none"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            const { skill, ...rest } = methods.getValues();
            setResult(
              JSON.stringify({
                ...rest,
                questions: editor?.getJSON(),
              })
            );
          }}
          className="my-4 w-fit"
        >
          Export
        </Button>
        <JsonDisplayWithCopy jsonString={result} />
      </div>
    </main>
  );
};
