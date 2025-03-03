import { mergeAttributes, Node } from "@tiptap/core";
import { Attribute, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useState } from "react";

import BubbleQuestionIndex from "@/components/molecules/bubble-question-index";
import { AnswerContent } from "@/components/organisms/result/part-answers-card";
import { Input } from "@/components/ui";
import { useResult } from "@/hooks/zustand/use-result";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { genQuestionId } from "@/lib/utils";

type CustomInputProps = Attribute & {
  questionNo: string;
};

// eslint-disable-next-line react-refresh/only-export-components
const CustomInput = ({ questionNo }: CustomInputProps) => {
  const { answer, answerSheet } = useAnswerStore();
  const [value, setValue] = useState<string | null>(answerSheet[parseInt(questionNo)]);
  const { answerKeys, guidances, status } = useResult();

  const isCorrect = status?.[parseInt(questionNo) - 1];

  return (
    <NodeViewWrapper className="mx-2 w-fit" contentEditable={false}>
      {answerKeys.length ? (
        <AnswerContent
          id={genQuestionId(questionNo)}
          questionNo={parseInt(questionNo)}
          answer={answerKeys[parseInt(questionNo) - 1]}
          userAnswer={value ?? ""}
          guidance={guidances ? guidances[parseInt(questionNo) - 1] : null}
          status={isCorrect}
        />
      ) : (
        <span className="inline-flex items-center gap-2">
          <BubbleQuestionIndex index={parseInt(questionNo)} />
          <Input
            className="my-1 h-8 w-36 rounded-sm px-1.5 focus-visible:border-primary"
            placeholder={`Question ${questionNo}`}
            onChange={(e) => {
              answer(parseInt(questionNo), e.target.value);
              setValue(e.target.value);
            }}
            autoComplete="off"
            value={value ?? ""}
          />
        </span>
      )}
    </NodeViewWrapper>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
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
