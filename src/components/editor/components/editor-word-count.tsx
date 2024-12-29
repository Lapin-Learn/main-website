import { Editor, useEditorState } from "@tiptap/react";
import { memo } from "react";

import { cn } from "@/lib/utils";

export type EditorWordCountProps = {
  editor: Editor;
  showWords?: boolean;
  showCharacters?: boolean;
  className?: string;
};

export const EditorWordCount = memo(
  ({ editor, showWords = false, showCharacters = false, className }: EditorWordCountProps) => {
    const { characters, words } = useEditorState({
      editor,
      selector: (ctx): { characters: number; words: number } => {
        const { characters, words } = ctx.editor?.storage.characterCount || {
          characters: () => 0,
          words: () => 0,
        };
        return { characters: characters(), words: words() };
      },
    });

    return (
      <div className={cn("mr-4 mt-2 flex flex-col justify-center pr-4", className)}>
        {showWords && (
          <div className="text-sm font-semibold text-neutral-500">
            {words} {words === 1 ? "word" : "words"}
          </div>
        )}
        {showCharacters && (
          <div className="text-sm font-semibold text-neutral-500">
            {characters} {characters === 1 ? "character" : "characters"}
          </div>
        )}
      </div>
    );
  }
);

EditorWordCount.displayName = "EditorWordCount";
