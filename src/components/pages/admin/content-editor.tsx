import { EditorContent, useEditor } from "@tiptap/react";
import { useRef, useState } from "react";

import InputFieldButton from "@/components/editor/components/input-field-button";
import ExtensionKit from "@/components/editor/extensions/extension-kit";
import ImageBlockMenu from "@/components/editor/extensions/ImageBlock/components/ImageBlockMenu";
import { TableColumnMenu, TableRowMenu } from "@/components/editor/extensions/Table/menus";
import { TextMenu } from "@/components/editor/menus";
import JsonDisplayWithCopy from "@/components/molecules/json-display-with-copy";
import { Button } from "@/components/ui";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const menuContainerRef = useRef(null);

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
  const [result, setResult] = useState("");

  if (!editor) {
    return null;
  }

  return (
    <main className="p-8">
      <div className="rounded-md border bg-white p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Tiptap exporter</h2>
          <div className="flex flex-col gap-4" ref={menuContainerRef}>
            <div>
              <InputFieldButton editor={editor} />
            </div>
            <EditorContent
              editor={editor}
              className="h-80 overflow-y-scroll rounded-md border p-4"
            />
            <TextMenu editor={editor} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigator.clipboard.writeText(editor?.getHTML())}
          className="my-4 mr-4 w-fit"
        >
          Copy HTML to clipboard
        </Button>
        <Button
          onClick={() => {
            setResult(JSON.stringify(editor?.getJSON()));
          }}
          className="my-4 w-fit"
        >
          Export JSON
        </Button>
        {result && <JsonDisplayWithCopy jsonString={result} />}
      </div>
    </main>
  );
};
