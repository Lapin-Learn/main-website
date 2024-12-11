import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen, TriangleAlert, Zap } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import CustomAlert from "../mocules/alert";
import FormSelect from "../mocules/form-inputs/form-select";
import { Button, Form } from "../ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type SelectModeDialogProps = {
  title: string;
  parts: {
    value: string;
    label: string;
  }[];
};

const SelectModeDialog = ({ title, parts }: SelectModeDialogProps) => {
  const [mode, setMode] = useState("full_test");
  const { t } = useTranslation("practice");

  const baseSchema = z.object({
    mode: z.string(),
  });
  const practiceSchema = baseSchema.extend({
    timeLimit: z.string(),
    parts: z.array(z.string()).nonempty(t("exam-mode-config.parts.error")),
  });
  type FormInputs = z.infer<typeof practiceSchema>;
  const form = useForm<FormInputs>({
    resolver: zodResolver(mode === "practice" ? practiceSchema : baseSchema),
    defaultValues: {
      mode: "full_test",
      timeLimit: "no_limit",
      parts: parts.map((item) => item.value),
    },
  });

  const modes = [
    { value: "practice", label: t("exam-mode-config.mode.practice") },
    { value: "full_test", label: t("exam-mode-config.mode.full_test") },
  ];

  const timeLimits = [{ value: "no_limit", label: t("exam-mode-config.time_limit.no_limit") }];
  for (let i = 10; i <= 90; i += 10) {
    timeLimits.push({
      value: i.toString(),
      label: t("exam-mode-config.time_limit.time", { time: i.toString() }),
    });
  }

  const handleModeChange = (value: string) => {
    setMode(value);
    form.reset({
      ...form.getValues(),
      mode: value,
      timeLimit: "no_limit",
      parts: parts.map((item) => item.value),
    });
  };

  const handleCancel = () => {
    form.reset();
  };

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Test Popup</Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-[720px] flex-col gap-4 rounded-2xl bg-white px-8 py-10">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-heading-4 font-bold">{title}</DialogTitle>
          <DialogDescription>
            {mode === "practice" ? (
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
            <DialogFooter className="mt-4 gap-1 sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  {t("exam-mode-config.buttons.cancel")}
                </Button>
              </DialogClose>
              <Button type="submit" className="w-fit">
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
