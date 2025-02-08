import { BubbleMenu, Editor } from "@tiptap/react";

import { ColorButtons } from "@/components/editor/panels";
import { Toolbar } from "@/components/ui/toolbar";

import { TIPPY_OPTIONS } from "../consts";
import { useTextmenuCommands } from "../text-menu/hooks/useTextmenuCommands";
import { useTextmenuStates } from "../text-menu/hooks/useTextmenuStates";

export type HighlightMenuProps = {
  editor: Editor;
};

export const HighlightMenu = ({ editor }: HighlightMenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);

  return (
    <BubbleMenu
      tippyOptions={TIPPY_OPTIONS}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}
      className="border-none"
    >
      <Toolbar.Wrapper>
        <ColorButtons
          color={states.currentHighlight}
          onChange={commands.onChangeHighlight}
          onClear={commands.onClearHighlight}
        />
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};
