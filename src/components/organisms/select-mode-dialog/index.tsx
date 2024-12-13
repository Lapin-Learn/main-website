import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen, TriangleAlert, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import CustomAlert from "@/components/mocules/alert";
import FormSelect from "@/components/mocules/form-inputs/form-select";
import { Button, Form } from "@/components/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EnumSkill } from "@/lib/enums";

import useSelectModeDialog from "./use-select-mode-dialog";

enum EnumMode {
  PRACTICE = "practice",
  FULL_TEST = "full_test",
}

const SelectModeDialog = () => {
  const { t } = useTranslation("practice");
  const { test, skill, open, setOpen } = useSelectModeDialog();

  const parts: {
    value: string;
    label: string;
  }[] = generateParts(skill ?? EnumSkill.reading);

  // TODO: Temporary function to generate parts
  function generateParts(skill: EnumSkill) {
    switch (skill) {
      case EnumSkill.reading:
        return [
          { value: "passage_1", label: t("skills.reading.passage", { number: 1 }) },
          { value: "passage_2", label: t("skills.reading.passage", { number: 2 }) },
          { value: "passage_3", label: t("skills.reading.passage", { number: 3 }) },
        ];
      case EnumSkill.listening:
        return [
          { value: "section_1", label: t("skills.listening.section", { number: 1 }) },
          { value: "section_2", label: t("skills.listening.section", { number: 2 }) },
          { value: "section_3", label: t("skills.listening.section", { number: 3 }) },
          { value: "section_4", label: t("skills.listening.section", { number: 4 }) },
        ];
      case EnumSkill.writing:
        return [
          { value: "task_1", label: t("skills.writing.task", { number: 1 }) },
          { value: "task_2", label: t("skills.writing.task", { number: 2 }) },
        ];
      case EnumSkill.speaking:
        return [
          { value: "part_1", label: t("skills.speaking.part", { number: 1 }) },
          { value: "part_2", label: t("skills.speaking.part", { number: 2 }) },
          { value: "part_3", label: t("skills.speaking.part", { number: 3 }) },
        ];
      default:
        return [];
    }
  }

  const practiceSchema = z
    .object({
      mode: z.nativeEnum(EnumMode),
      timeLimit: z.string(),
      parts: z.array(z.string()),
    })
    .superRefine((data, ctx) => {
      if (data.mode === EnumMode.PRACTICE && data.parts.length === 0) {
        ctx.addIssue({
          message: t("exam-mode-config.parts.error"),
          path: ["parts"],
          code: z.ZodIssueCode.custom,
        });
      }
    });

  type FormInputs = z.infer<typeof practiceSchema>;

  const formDefaultValues: FormInputs = {
    mode: EnumMode.FULL_TEST,
    timeLimit: "no_limit",
    parts: parts.map((item) => item.value),
  };

  const form = useForm<FormInputs>({
    resolver: zodResolver(practiceSchema),
    defaultValues: formDefaultValues,
  });

  const modes = [
    { value: EnumMode.PRACTICE, label: t("exam-mode-config.mode.practice") },
    { value: EnumMode.FULL_TEST, label: t("exam-mode-config.mode.full_test") },
  ];

  const timeLimits = [{ value: "no_limit", label: t("exam-mode-config.time_limit.no_limit") }];
  for (let i = 10; i <= 90; i += 10) {
    timeLimits.push({
      value: i.toString(),
      label: t("exam-mode-config.time_limit.time", { time: i.toString() }),
    });
  }
  const mode = form.watch("mode");

  const handleModeChange = (value: string) => {
    form.reset({
      ...formDefaultValues,
      mode: value as EnumMode,
    });
  };

  const handleCancel = () => {
    form.reset(formDefaultValues);
  };

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset(formDefaultValues);
        }
        setOpen(open);
      }}
    >
      <DialogContent className="flex max-w-screen-sm flex-col gap-4 rounded-2xl bg-white px-3 py-4 md:max-w-[720px] md:px-8 md:py-10">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-heading-4 font-bold">
            {test?.testName} -{" "}
            {skill.toString().charAt(0).toUpperCase() + skill.toString().slice(1)}
          </DialogTitle>
          <DialogDescription>
            {mode === EnumMode.PRACTICE ? (
              <CustomAlert
                theme="success"
                title={t("exam-mode-config.alerts.practice.title")}
                description={t("exam-mode-config.alerts.practice.description")}
                icon={<SquarePen className="size-5" color="#166534" />}
              />
            ) : (
              <CustomAlert
                theme="warning"
                title={t("exam-mode-config.alerts.full_test.title")}
                description={t("exam-mode-config.alerts.full_test.description")}
                icon={<TriangleAlert className="size-5" color="#854D0E" />}
              />
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2">
            <FormSelect
              name="mode"
              label={t("exam-mode-config.mode.label")}
              placeholder={t("exam-mode-config.mode.placeholder")}
              options={modes.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              onValueChange={handleModeChange}
            />
            {mode === "practice" && (
              <>
                <FormSelect
                  name="timeLimit"
                  label={t("exam-mode-config.time_limit.label")}
                  placeholder={t("exam-mode-config.time_limit.placeholder")}
                  options={Object.values(timeLimits).map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                />
                <FormSelect
                  name="parts"
                  label={t("exam-mode-config.parts.label")}
                  placeholder={t("exam-mode-config.parts.placeholder")}
                  options={parts}
                  isMulti={true}
                />
              </>
            )}
            <DialogFooter className="mt-1 justify-start gap-1 md:mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex-1"
                  onClick={handleCancel}
                >
                  {t("exam-mode-config.buttons.cancel")}
                </Button>
              </DialogClose>
              <Button type="submit" className="w-full flex-1 sm:w-fit">
                <div className="flex items-center gap-2">
                  <Zap fill="white" strokeWidth={0} className="size-4" />
                  {mode === "practice"
                    ? t("exam-mode-config.buttons.practice")
                    : t("exam-mode-config.buttons.start")}
                </div>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SelectModeDialog;
