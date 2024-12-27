import { zodResolver } from "@hookform/resolvers/zod";
import { EditorContent, useEditor } from "@tiptap/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputFieldButton from "@/components/editor/components/input-field-button";
import ExtensionKit from "@/components/editor/extensions/extension-kit";
import ImageBlockMenu from "@/components/editor/extensions/ImageBlock/components/ImageBlockMenu";
import { TableColumnMenu, TableRowMenu } from "@/components/editor/extensions/Table/menus";
import { TextMenu } from "@/components/editor/menus";
import JsonDisplayWithCopy from "@/components/molecules/json-display-with-copy";
import AddPartForm from "@/components/organisms/add-part-form-fields";
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
  const menuContainerRef = useRef(null);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: EnumSkill.reading,
      part: 1,
      questionType: EnumQuestionGroup.fillInBlanks,
    },
  });
  const editor = useEditor({
    extensions: ExtensionKit(),
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "min-h-full outline-none",
      },
    },
    injectCSS: false,
  });
  const [result, setResult] = useState("{}");

  if (!editor) {
    return null;
  }

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
          <div className="flex flex-col gap-4" ref={menuContainerRef}>
            <div>
              <InputFieldButton editor={editor} />
            </div>
            <EditorContent editor={editor} className="rounded-md border p-4" />
            <TextMenu editor={editor} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
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
