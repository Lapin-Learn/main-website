import { Editor, useEditorState } from "@tiptap/react";
import { memo } from "react";

export type EditorWordCountProps = {
  editor: Editor;
};

export const EditorWordCount = memo(({ editor }: EditorWordCountProps) => {
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
    <div className="mr-4 flex flex-col justify-center border-r border-neutral-200 pr-4 text-right dark:border-neutral-800">
      <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        {words} {words === 1 ? "word" : "words"}
      </div>
      <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        {characters} {characters === 1 ? "character" : "characters"}
      </div>
    </div>
  );
});

EditorWordCount.displayName = "EditorWordCount";
