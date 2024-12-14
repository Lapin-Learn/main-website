import { mergeAttributes, Node } from "@tiptap/core";
import { Attribute, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

import { Input } from "@/components/ui";

type CustomInputProps = Attribute & {
  questionNo: string;
};

const CustomInput = ({ questionNo }: CustomInputProps) => {
  return (
    <NodeViewWrapper className="mx-2 w-fit" contentEditable={false}>
      <Input
        className="my-1 h-8 w-36 rounded-sm px-1.5 focus-visible:border-primary"
        id={`Question-${questionNo}`}
        placeholder={`Question ${questionNo}`}
      />
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: "custom-input",

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
        tag: 'span[data-type="custom-input"]',
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
    return ReactNodeViewRenderer(({ node }) => CustomInput({ questionNo: node.attrs.questionNo }), {
      as: "span",
      className: "inline-block",
    });
  },
});
