import { Attribute, NodeViewWrapper } from "@tiptap/react";

import { Input } from "@/components/ui";

type CustomInputProps = Attribute & {
  questionNo: string;
};
export default ({ questionNo }: CustomInputProps) => {
  return (
    <NodeViewWrapper className="mx-2 w-fit" contentEditable={false}>
      <Input
        className="my-1 h-8 w-36 rounded-sm focus-visible:border-primary"
        id={`Question-${questionNo}`}
        placeholder={`Question ${questionNo}`}
      />
    </NodeViewWrapper>
  );
};
