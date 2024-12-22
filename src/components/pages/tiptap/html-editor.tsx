import "./styles.css";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

import CustomInput from "../../organisms/question-groups/input-node";
import { Button } from "../../ui";
import JsonDisplayWithCopy from "./json-display";
import MenuBar from "./menu-bar";

// const CustomTableCell = TableCell.extend({
//   addAttributes() {
//     return {
//       // extend the existing attributes …
//       ...this.parent?.(),

//       // and add a new one …
//       backgroundColor: {
//         default: null,
//         parseHTML: (element) => element.getAttribute("data-background-color"),
//         renderHTML: (attributes) => {
//           return {
//             "data-background-color": attributes.backgroundColor,
//             style: `background-color: ${attributes.backgroundColor}`,
//           };
//         },
//       },
//     };
//   },
// });

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      // Default TableCell
      TableCell,
      // Custom TableCell with backgroundColor attribute
      //   CustomTableCell,
      CustomInput,
    ],
    injectCSS: false,
  });
  const [result, setResult] = useState("{}");

  return (
    <div className="flex flex-col gap-4 p-8">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="rounded-md border p-4 [&>[role='textbox']]:outline-none"
      />
      <Button
        onClick={() => {
          setResult(JSON.stringify(editor?.getJSON()));
        }}
        className="w-fit"
      >
        Export
      </Button>
      <JsonDisplayWithCopy jsonString={result} />
    </div>
  );
};
