import { mergeAttributes, Node } from "@tiptap/core";
import { Attribute, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useState } from "react";

import BubbleQuestionIndex from "@/components/molecules/bubble-question-index";
import { useQuestionGroupContext } from "@/components/organisms/question-groups";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";

type CustomSelectProps = Attribute & {
  questionNo: string;
};

// eslint-disable-next-line react-refresh/only-export-components
const CustomSelect = ({ questionNo }: CustomSelectProps) => {
  const { questionGroup } = useQuestionGroupContext();
  const { answer, answerSheet } = useAnswerStore();
  const [value, setValue] = useState<string | null>(answerSheet[parseInt(questionNo)]);

  return (
    <NodeViewWrapper className="mx-2 my-1" contentEditable={false}>
      <span className="inline-flex items-center gap-2">
        <BubbleQuestionIndex index={parseInt(questionNo)} />

        <Select
          value={value ?? undefined}
          onValueChange={(value) => {
            answer(parseInt(questionNo), value);
            setValue(value);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue
              placeholder={<span className="text-[#6B7280]">Question {questionNo}</span>}
            />
          </SelectTrigger>
          <SelectContent>
            {questionGroup.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.value}. {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </span>
    </NodeViewWrapper>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default Node.create({
  name: "custom-select",

  group: "inline*",

  addAttributes() {
    return {
      questionNo: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="custom-select"]',
        getAttrs: (dom) => ({
          questionNo: dom.getAttribute("data-questionNo"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { "data-type": "custom-input" }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(
      ({ node }) => CustomSelect({ questionNo: node.attrs.questionNo }),
      {
        as: "span",
        className: "inline-block",
      }
    );
  },
});
