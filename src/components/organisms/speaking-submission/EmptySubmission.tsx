import { useTranslation } from "react-i18next";

import { AccordionContent, AccordionItem, AccordionTrigger, Typography } from "@/components/ui";

type EmptySubmissionAccordionItemProps = {
  partNo: number;
  questionTypes: string[];
};
function EmptySubmission({ partNo, questionTypes }: EmptySubmissionAccordionItemProps) {
  const { t } = useTranslation("simulatedTest");
  return (
    <AccordionItem
      value={partNo.toString()}
      className="flex flex-col gap-4 rounded-xl border-none bg-white p-5"
    >
      <AccordionTrigger
        className="justify-between py-0 text-lg font-semibold uppercase hover:underline"
        iconPosition="right"
      >
        Part {partNo}:&nbsp;{questionTypes.join(", ")}
      </AccordionTrigger>
      <AccordionContent className="grid h-20 place-items-center">
        <Typography variant="h6" className="italic">
          {t("result.unanswered")}
        </Typography>
      </AccordionContent>
    </AccordionItem>
  );
}

export default EmptySubmission;
