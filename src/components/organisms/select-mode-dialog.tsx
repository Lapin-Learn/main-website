import { Button, Form } from "../ui";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { SquarePen, TriangleAlert, Zap } from "lucide-react";
import FormSelect from "../mocules/form-inputs/form-select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormMultipleSelect from "../mocules/form-inputs/form-multiple-select";
import { useState } from "react";
import CustomAlert from "../mocules/alert";

const modes = [
  { value: "full_test", label: "Thi thử" },
  { value: "practice", label: "Luyện tập" },
];

const timeLimits = [
  { value: "no_limit", label: "Không giới hạn" },
  { value: "10", label: "10 phút" },
  { value: "20", label: "20 phút" },
  { value: "30", label: "30 phút" },
  { value: "40", label: "40 phút" },
  { value: "50", label: "50 phút" },
  { value: "60", label: "60 phút" },
  { value: "70", label: "70 phút" },
  { value: "80", label: "80 phút" },
  { value: "90", label: "90 phút" },
];

type SelectModeDialogProps = {
  visible: boolean;
  title: string;
  parts: {
    value: string;
    label: string;
  }[];
  onClose?: () => void;
};

const formSchema = z.object({
  mode: z.string(),
  timeLimit: z.string(),
  parts: z.array(z.string()).nonempty("Chọn ít nhất một phần bài muốn làm"),
});

type FormInputs = z.infer<typeof formSchema>;

const SelectModeDialog = ({ visible, title, parts, onClose }: SelectModeDialogProps) => {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: "full_test",
      timeLimit: "no_limit",
      parts: parts.map((item) => item.value),
    },
  });
  const [mode, setMode] = useState("");

  const handleModeChange = (value: string) => {
    setMode(value);
  };

  const onSubmit = (data: FormInputs) => {
    if (mode === "full_test") {
      const { mode } = data;
      console.log(mode);
    } else {
      console.log(data);
    }
  };

  return (
    <Dialog open={visible}>
      <DialogContent className="flex max-w-[720px] flex-col gap-4 rounded-2xl bg-white px-8 py-10">
        <DialogTitle className="text-heading-4 font-bold">{title}</DialogTitle>
        <DialogDescription>
          {mode === "practice" ? (
            <CustomAlert
              theme="success"
              title="Chế độ luyện tập"
              description="Trong chế độ này, bạn có thể tự chọn phần mình muốn làm, tự điều chỉnh thời gian tuỳ vào khả năng của mình và nghe lại đoạn thu âm."
              icon={<SquarePen className="h-5 w-5" color="#166534" />}
            />
          ) : (
            <CustomAlert
              theme="warning"
              title="Lưu ý"
              description="Trong quá trình làm bài, bạn sẽ không thể nghe lại và không nên thoát ra để kết quả được đánh giá một cách tốt nhất."
              icon={<TriangleAlert className="h-5 w-5" color="#854D0E" />}
            />
          )}
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2">
            <FormSelect
              name="mode"
              label="Chế độ"
              placeholder="Chọn chế độ thi"
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
                  label="Thời gian"
                  placeholder="Chọn thời gian làm bài"
                  options={Object.values(timeLimits).map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                />
                <FormMultipleSelect name="parts" label="Chọn phần bài muốn làm" options={parts} />
              </>
            )}
            <div className="mt-4 flex justify-start gap-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit" className="w-fit">
                {mode === "practice" ? (
                  "Luyện tập"
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap fill="white" strokeWidth={0} className="h-4 w-4" />
                    Bắt đầu
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SelectModeDialog;
