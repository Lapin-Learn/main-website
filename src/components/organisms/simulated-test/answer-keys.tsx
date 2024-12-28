import { useTranslation } from "react-i18next";

import { STSkillTestAnswer } from "@/lib/types/simulated-test.type";

export default function AnswerKeys({
  answerKeys,
  startNo,
  endNo,
}: {
  answerKeys: STSkillTestAnswer[];
  startNo: number;
  endNo: number;
}) {
  const { t } = useTranslation("collection");
  return (
    <div className="flex flex-col gap-4">
      {answerKeys.slice(startNo - 1, endNo).map((answer, index) => (
        <div key={index} className="flex gap-2">
          <div className="text-base font-bold">{+startNo + index}</div>
          {t("detail.answer")}:
          <div className="font-bold text-red-500">
            {String(answer.valid || answer.variants?.join("/ ")).toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
}
