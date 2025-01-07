import { mergeAttributes, Node } from "@tiptap/core";
import { Attribute, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useState } from "react";

import AnswerGuidanceContent from "@/components/organisms/result/answer-guidance-content";
import { Input } from "@/components/ui";
import { useResult } from "@/hooks/zustand/use-result";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";

type CustomInputProps = Attribute & {
  questionNo: string;
};

const CustomInput = ({ questionNo }: CustomInputProps) => {
  const { answer, answerSheet } = useAnswerStore();
  const [value, setValue] = useState<string | null>(answerSheet[parseInt(questionNo)]);
  const { answerKeys, guidances, status } = useResult();

  const isCorrect = status?.[parseInt(questionNo) - 1];

  return (
    <NodeViewWrapper className="mx-2 w-fit" contentEditable={false}>
      {answerKeys.length ? (
        <AnswerGuidanceContent
          answer={answerKeys[parseInt(questionNo) - 1]}
          userAnswer={value || ""}
          guidance={guidances ? guidances[parseInt(questionNo) - 1] : null}
          status={isCorrect}
        />
      ) : (
        <Input
          className="my-1 h-8 w-36 rounded-sm px-1.5 focus-visible:border-primary"
          id={`Question-${questionNo}`}
          placeholder={`Question ${questionNo}`}
          onChange={(e) => {
            answer(parseInt(questionNo), e.target.value);
            setValue(e.target.value);
          }}
          value={value || ""}
        />
      )}
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: "custom-input",

  group: "inline",
  inline: true,
  selectable: false,
  draggable: false,
  content: "text*",

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
        tag: "custom-input",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["custom-input", mergeAttributes(HTMLAttributes, { "data-type": "custom-input" }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(
      ({ node }) =>
        CustomInput({
          questionNo: node.attrs.questionNo,
        }),
      {
        as: "span",
        className: "inline-block",
      }
    );
  },
});
