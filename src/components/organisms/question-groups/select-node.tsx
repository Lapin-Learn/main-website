import { mergeAttributes, Node } from "@tiptap/core";
import { Attribute, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";

type CustomSelectProps = Attribute & {
  questionNo: string;
  options: string[];
};

const CustomSelect = ({ questionNo, options }: CustomSelectProps) => {
  return (
    <NodeViewWrapper className="mx-2 w-fit" contentEditable={false}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={`Question ${questionNo}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </NodeViewWrapper>
  );
};

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
          options: dom.getAttribute("data-options"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { "data-type": "custom-input" }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(
      ({ node }) =>
        CustomSelect({ questionNo: node.attrs.questionNo, options: node.attrs.options }),
      {
        as: "span",
        className: "inline-block",
      }
    );
  },
});
