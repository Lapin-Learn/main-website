import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";

import { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { FillInTheBlankContent, FillInTheBlankContentType } from "@/lib/types";
import { cn } from "@/lib/utils";

import { BaseAnswerInputProps } from "..";
import FillInTheBlankContentRenderer from "./type-rendering";

type FillInTheBlankProps = FillInTheBlankContent & BaseAnswerInputProps;

const extractBlankAnswers = (content: FillInTheBlankContentType[]): (string | undefined)[] =>
  content.flatMap((item) =>
    item.type === "blank"
      ? item.text
      : item.type === "paragraph" && item.content
        ? extractBlankAnswers(item.content)
        : []
  );

const FillInTheBlank = ({
  content,
  renderCheckButton,
  isAnswered,
  currentQuestionIndex,
  className,
}: FillInTheBlankProps) => {
  const blankContent = extractBlankAnswers(content);
  const schema = z.object({ answer: z.array(z.string()).length(blankContent.length) });

  type FormField = z.infer<typeof schema>;
  const { control, reset } = useForm<FormField>({
    defaultValues: { answer: Array(blankContent.length).fill("") },
    resolver: zodResolver(schema),
  });

  const { field } = useController({ name: "answer", control });
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    setIsChecking(field.value.some((value) => value.length > 0));
  }, [field.value]);

  useEffect(() => {
    reset({ answer: Array(blankContent.length).fill("") });
    setIsChecking(false);
  }, [currentQuestionIndex, reset, blankContent.length]);

  const getCorrectAnswers = (): DLAnswer =>
    field.value.reduce(
      (acc, value, index) => ({
        numberOfCorrect: acc.numberOfCorrect + (value === blankContent[index] ? 1 : 0),
        totalOfQuestions: acc.totalOfQuestions,
      }),
      { numberOfCorrect: 0, totalOfQuestions: blankContent.length }
    );

  const handleTextChange = (text: string, index: number) => {
    const newAnswer = [...field.value];
    newAnswer[index] = text;
    field.onChange(newAnswer);
  };

  return (
    <>
      <div className={cn("", className)}>
        <FillInTheBlankContentRenderer
          content={content}
          fieldState={field}
          onTextChange={handleTextChange}
          hasSubmission={isAnswered}
        />
      </div>
      {renderCheckButton && renderCheckButton(getCorrectAnswers, !isChecking)}
    </>
  );
};

export default FillInTheBlank;
