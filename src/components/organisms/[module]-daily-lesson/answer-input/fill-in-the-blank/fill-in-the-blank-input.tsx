import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

import { FieldState } from "./blank-renderer";

type FillInTheBlankInputProps = {
  index: number;
  field: ControllerRenderProps<{ answer: string[] }, "answer">;
  onChange: (text: string, index: number, field: FieldState) => void;
  answer: string;
  isCorrect: boolean | null;
};

const getBlankStyles = (isCorrect: boolean | null, hasText: boolean, isFocused: boolean) => ({
  indexCircle: cn(
    "h-8 w-8 rounded-full flex items-center justify-center",
    isCorrect === null
      ? hasText
        ? "bg-blue-500"
        : "bg-blue-100"
      : isCorrect
        ? "bg-green-400"
        : "bg-red-400"
  ),
  indexText: cn(
    "text-center font-bold text-sm",
    isCorrect === null
      ? hasText
        ? "text-blue-50"
        : "text-blue-900"
      : isCorrect
        ? "text-green-50"
        : "text-red-50"
  ),
  input: cn(
    "border-b text-center pt-1 w-36",
    isCorrect === null
      ? isFocused
        ? "text-blue-600 border-blue-600"
        : hasText
          ? "text-black border-black"
          : "text-neutral-300 border-neutral-200"
      : `w-auto ${isCorrect ? "text-green-600 border-green-600" : "text-red-600 border-red-600 line-through"}`
  ),
  correctAnswer: cn("border-b text-center pt-1 w-auto text-green-600 border-green-600"),
});

const FillInTheBlankInput = ({
  index,
  field,
  onChange,
  answer,
  isCorrect,
  ...rest
}: FillInTheBlankInputProps) => {
  const { t } = useTranslation("question");
  const [isFocused, setIsFocused] = useState(false);
  const hasText = Boolean(field.value[index]);
  const styles = getBlankStyles(isCorrect, hasText, isFocused);

  return (
    <div className="flex items-center gap-1">
      <Label htmlFor={`answer-${index}`}>
        <div className={styles.indexCircle}>
          <span className={styles.indexText}>{index + 1}</span>
        </div>
      </Label>

      {isCorrect !== null ? (
        <span className={styles.input}>{field.value[index]}</span>
      ) : (
        <Input
          {...rest}
          id={`answer-${index}`}
          className={cn(
            styles.input,
            "text-center",
            isFocused ? "::placeholder:text-blue-600" : "::placeholder:text-neutral-300"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t("fillInTheBlank.enterTheAnswer")}
          autoCapitalize="none"
          value={field.value[index]}
          onChange={(e) => onChange(e.target.value, index, field)}
        />
      )}

      {isCorrect === false && <span className={styles.correctAnswer}>{answer}</span>}
    </div>
  );
};

export default FillInTheBlankInput;
