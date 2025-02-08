import { Editor, JSONContent } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { HighlightMenu } from "../editor/menus";

type ReadingPassageProps = {
  content: JSONContent;
};
export default function ReadingPassage({ content }: ReadingPassageProps) {
  const editor = new Editor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "indent-6 mb-6",
          },
        },
        heading: {
          levels: [2],
          HTMLAttributes: {
            class: "font-bold text-2xl mb-4 text-center",
          },
        },
      }),
      Image,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editable: true,
    onUpdate: () => {},
    injectCSS: false,
    editorProps: {
      handleDOMEvents: {
        // Prevent typing and pasting
        beforeinput: (_, event) => {
          if (event.inputType.startsWith("insert") || event.inputType.startsWith("delete")) {
            event.preventDefault();
            return true; // Block text modification
          }
          return false;
        },
      },
    },
  });

  return (
    <>
      {editor && <HighlightMenu editor={editor} />}

      <EditorContent editor={editor} className="py-4" />
    </>
  );
}
