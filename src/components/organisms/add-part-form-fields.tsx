import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { DEFAULT_QUESTION_NO_BY_SKILL } from "@/lib/consts";
import { EnumQuestionGroup, EnumSkill } from "@/lib/enums";

import FormSelect from "../molecules/form-inputs/form-select";
import FormTextArea from "../molecules/form-inputs/form-text-area";
import FormTextField from "../molecules/form-inputs/form-text-field";

export default function AddPartFormFields() {
  const { setValue, watch } = useFormContext();
  const skill = watch("skill");
  const part = watch("part");

  useEffect(() => {
    if (skill && part) {
      const startQuestionNo =
        DEFAULT_QUESTION_NO_BY_SKILL[skill as EnumSkill]?.[part]?.startQuestionNo ?? "";
      setValue("startQuestionNo", startQuestionNo);
      const endQuestionNo =
        DEFAULT_QUESTION_NO_BY_SKILL[skill as EnumSkill]?.[part]?.endQuestionNo ?? "";
      setValue("endQuestionNo", endQuestionNo);
    }
  }, [skill, part]);

  return (
    <>
      <FormSelect
        name="skill"
        label="Skill"
        placeholder="Select skill"
        options={Object.values(EnumSkill).map((value) => ({ value, label: value }))}
      />
      <FormTextField
        name="part"
        label="Part no."
        className="col-start-1"
        inputProps={{ placeholder: "Order of the part in the simulated test", type: "number" }}
      />
      {skill == EnumSkill.listening ||
        (skill == EnumSkill.reading && (
          <>
            <FormTextField
              name="startQuestionNo"
              label="From question no."
              className="col-start-1"
              inputProps={{
                placeholder: "Enter the no. of the first question",
                type: "number",
              }}
            />
            <FormTextField
              name="endQuestionNo"
              label="To question no."
              className="col-start-2"
              inputProps={{
                placeholder: "Enter the no. of the last question",
                type: "number",
              }}
            />
          </>
        ))}
      <FormTextArea
        name="questionCard"
        label="Question card"
        inputProps={{
          placeholder: "Enter the question card",
          rows: 4,
        }}
        className="col-span-2"
      />
      <FormSelect
        name="questionType"
        label="Question type"
        placeholder="Select question type"
        className="col-start-1"
        options={Object.values(EnumQuestionGroup).map((value) => ({ value, label: value }))}
      />
    </>
  );
}
