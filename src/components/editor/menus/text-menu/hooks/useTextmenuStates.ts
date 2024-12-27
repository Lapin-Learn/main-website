import { Editor, useEditorState } from "@tiptap/react";
import { useCallback } from "react";

import { isCustomNodeSelected } from "@/lib/utils/isCustomNodeSelected";
import { isTextSelected } from "@/lib/utils/isTextSelected";

import { ShouldShowProps } from "../../types";

export const useTextmenuStates = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isStrike: ctx.editor.isActive("strike"),
        isUnderline: ctx.editor.isActive("underline"),
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }),
        currentColor: ctx.editor.getAttributes("textStyle")?.color || undefined,
        currentHighlight: ctx.editor.getAttributes("highlight")?.color || undefined,
      };
    },
  });

  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view || editor.view.dragging) {
        return false;
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      if (isCustomNodeSelected(editor, node)) {
        return false;
      }

      return isTextSelected({ editor });
    },
    [editor]
  );

  return {
    shouldShow,
    ...states,
  };
};
