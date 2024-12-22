import { mergeAttributes, Node } from "@tiptap/core";
import { Attribute, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useState } from "react";

import { Input } from "@/components/ui";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";

type CustomInputProps = Attribute & {
  questionNo: string;
};

const CustomInput = ({ questionNo }: CustomInputProps) => {
  const { answer, answerSheet } = useAnswerStore();
  const [value, setValue] = useState<string | null>(answerSheet[parseInt(questionNo)]);

  return (
    <NodeViewWrapper className="mx-2 w-fit" contentEditable={false}>
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
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: "custom-input",

  group: "inline",
  inline: true,
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
        // getAttrs: (dom) => ({
        //   questionNo: dom.getAttribute("data-questionNo"),
        // }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["custom-input", mergeAttributes(HTMLAttributes, { "data-type": "custom-input" }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(({ node }) => CustomInput({ questionNo: node.attrs.questionNo }), {
      as: "span",
      className: "inline-block",
    });
  },
});
