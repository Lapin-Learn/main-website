import { FillInTheBlankContentType } from "@/lib/types";

import BlankRenderer, { type FieldState } from "./blank-renderer";

type ParagraphRendererProps = {
  elements: FillInTheBlankContentType[];
  fieldState: FieldState;
  blankStartIndex: number;
  onTextChange: (text: string, index: number, field: FieldState) => void;
  hasSubmission: boolean;
};

const ParagraphRenderer = ({
  elements,
  fieldState,
  blankStartIndex,
  onTextChange,
  hasSubmission,
}: ParagraphRendererProps) => {
  let blankIndex = blankStartIndex;

  return (
    <div className="flex w-full flex-wrap items-center gap-1">
      {elements.map((element, index) => {
        switch (element.type) {
          case "text":
            return element.text ? <TextRenderer key={`text-${index}`} text={element.text} /> : null;
          case "blank": {
            if (!element.text) return null;
            const currentIndex = blankIndex++;
            return (
              <span key={`blank-${currentIndex}`} className="inline-flex">
                <BlankRenderer
                  index={currentIndex}
                  fieldState={fieldState}
                  onTextChange={onTextChange}
                  correctAnswer={element.text}
                  isAnswerCorrect={
                    hasSubmission ? fieldState.value[currentIndex] === element.text : null
                  }
                />
              </span>
            );
          }
          case "break":
            return <br key={`break-${index}`} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

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
  let blankCounter = 0;

  return (
    <div className="flex flex-row flex-wrap items-center gap-1 px-4 md:px-56">
      {content.map((element, index) => {
        switch (element.type) {
          case "paragraph": {
            if (!element.content) return null;

            const blankCount = element.content.filter((el) => el.type === "blank").length;
            const startIndex = blankCounter;
            blankCounter += blankCount;

            return (
              <ParagraphRenderer
                key={`paragraph-${index}`}
                elements={element.content}
                fieldState={fieldState}
                blankStartIndex={startIndex}
                onTextChange={onTextChange}
                hasSubmission={hasSubmission}
              />
            );
          }
          case "text":
            return element.text ? <TextRenderer key={`text-${index}`} text={element.text} /> : null;
          case "blank":
            if (!element.text) return null;
            return (
              <BlankRenderer
                key={`blank-${blankCounter}`}
                index={blankCounter++}
                fieldState={fieldState}
                onTextChange={onTextChange}
                correctAnswer={element.text}
                isAnswerCorrect={
                  hasSubmission ? fieldState.value[blankCounter] === element.text : null
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
