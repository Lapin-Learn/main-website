import { FillInTheBlankContentType } from "@/lib/types";

import BlankRenderer, { type FieldState } from "./blank-renderer";

type ParagraphRendererProps = {
  elements: FillInTheBlankContentType[];
  fieldState: FieldState;
  blankCounter: { current: number };
  onTextChange: (text: string, index: number, field: FieldState) => void;
  hasSubmission: boolean;
};

const ParagraphRenderer = ({
  elements,
  fieldState,
  blankCounter,
  onTextChange,
  hasSubmission,
}: ParagraphRendererProps) => (
  <div className="flex flex-wrap items-center gap-1">
    {elements.map((element, index) => {
      switch (element.type) {
        case "text":
          return element.text ? <TextRenderer key={`text-${index}`} text={element.text} /> : null;
        case "blank":
          if (!element.text) return null;
          return (
            <span key={`blank-${blankCounter.current}`} className="inline-flex">
              <BlankRenderer
                index={blankCounter.current}
                fieldState={fieldState}
                onTextChange={onTextChange}
                correctAnswer={element.text}
                isAnswerCorrect={
                  hasSubmission ? fieldState.value[blankCounter.current++] === element.text : null
                }
              />
            </span>
          );
        case "break":
          return <br key={`break-${index}`} />;
        default:
          return null;
      }
    })}
  </div>
);

type FillInTheBlankContentRendererProps = {
  content: FillInTheBlankContentType[];
  fieldState: FieldState;
  onTextChange: (text: string, index: number, field: FieldState) => void;
  hasSubmission: boolean;
};

const FillInTheBlankContentRenderer = ({
  content,
  fieldState,
  onTextChange,
  hasSubmission,
}: FillInTheBlankContentRendererProps) => {
  const blankCounter = { current: 0 };

  return (
    <div className="flex flex-row flex-wrap items-center gap-1 px-4 md:px-56">
      {content.map((element, index) => {
        switch (element.type) {
          case "paragraph":
            return element.content ? (
              <ParagraphRenderer
                key={`paragraph-${index}`}
                elements={element.content}
                fieldState={fieldState}
                blankCounter={blankCounter}
                onTextChange={onTextChange}
                hasSubmission={hasSubmission}
              />
            ) : null;
          case "text":
            return element.text ? <TextRenderer key={`text-${index}`} text={element.text} /> : null;
          case "blank":
            if (!element.text) return null;
            return (
              <BlankRenderer
                key={`blank-${blankCounter.current++}`}
                index={blankCounter.current}
                fieldState={fieldState}
                onTextChange={onTextChange}
                correctAnswer={element.text}
                isAnswerCorrect={
                  hasSubmission ? fieldState.value[blankCounter.current] === element.text : null
                }
              />
            );
          case "break":
            return <br key={`break-${index}`} />;
          default:
            throw new Error(`Unknown element type: ${element.type}`);
        }
      })}
    </div>
  );
};

export default FillInTheBlankContentRenderer;

const TextRenderer = ({ text }: { text: string }) =>
  text.split(" ").map((word, id) => (
    <span key={`${word}-${id}`} className="inline-flex break-words text-base">
      {word}
    </span>
  ));
