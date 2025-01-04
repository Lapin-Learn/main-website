import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen, TriangleAlert, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import CustomAlert from "@/components/molecules/alert";
import FormSelect from "@/components/molecules/form-inputs/form-select";
import { Button, Form } from "@/components/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStartSimulatedTest } from "@/hooks/react-query/use-simulated-test";
import { EnumMode, EnumSkill } from "@/lib/enums";
import { SimulatedTest } from "@/lib/types/simulated-test.type";

import useSelectModeDialog from "./use-select-mode-dialog";

const SelectModeDialog = () => {
  const { t } = useTranslation("practice");
  const { test, skillTest, open, setOpen } = useSelectModeDialog();
  const startSimulatedTest = useStartSimulatedTest();

  const parts: {
    value: string;
    label: string;
    description?: string;
  }[] = generateParts(skillTest?.skill ?? EnumSkill.reading, test?.skillTests ?? []);

  function generateParts(skill: EnumSkill, skillTests: SimulatedTest["skillTests"]) {
    const partsDetail = skillTests.find((item) => item.skill === skill)?.partsDetail ?? [];
    const parts = partsDetail.map((part, index) => {
      return {
        value: (index + 1).toString(),
        label: t(`skills.part`, { number: index + 1, context: skill.toString() }),
        description: part.questionTypes.join(", "),
      };
    });
    return parts;
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
    if (skillTest) {
      startSimulatedTest.mutate(
        {
          skillTestId: skillTest.id,
          timeLimit: data.timeLimit === "no_limit" ? 0 : parseInt(data.timeLimit, 10),
          mode: data.mode,
          parts: data.parts.map((part) => (typeof part === "string" ? parseInt(part, 10) : part)),
        },
        {
          onSettled: () => {
            setOpen(false);
          },
        }
      );
    }
  };

  if (!test || !skillTest) return null;

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
      <DialogContent
        className="flex max-w-screen-sm flex-col gap-4 rounded-2xl bg-white px-3 py-4 md:max-w-[720px] md:px-8 md:py-10"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-heading-4 font-bold">
            {test.testName}&nbsp;-&nbsp;
            {skillTest.skill.toString().charAt(0).toUpperCase() +
              skillTest.skill.toString().slice(1)}
          </DialogTitle>
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
                  renderSelectItem={(option) => {
                    return (
                      <span className="max-w-32 overflow-hidden text-ellipsis">
                        {option.label}: {option.description}
                      </span>
                    );
                  }}
                />
              </>
            )}
            <DialogFooter className="mt-1 justify-start gap-1 md:mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex-1 sm:w-fit"
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
