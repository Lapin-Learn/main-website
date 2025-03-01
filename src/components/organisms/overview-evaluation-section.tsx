import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

import CriteriaScoreCard from "@/components/molecules/criteria-score-card";
import { SkillEvaluationChart } from "@/components/organisms/skill-evaluation-chart";
import { Typography } from "@/components/ui";
import {
  EnumSimulatedTestSessionStatus,
  EnumSkill,
  EnumSpeakingCriteria,
  EnumWritingCriteria,
} from "@/lib/enums";
import { WritingSession } from "@/lib/types/simulated-test-session.type";
import { formatTime, getCriterias } from "@/lib/utils";

import CustomAlert from "../molecules/alert";

type OverviewEvaluationSectionProps = {
  session: WritingSession;
};

function OverviewEvaluationSection({ session }: OverviewEvaluationSectionProps) {
  const { t } = useTranslation(["practice", "collection"]);

  const isFullParts = session.responses.length == 2;

  if (!isFullParts) return null;

  const overalScore = session.results.find(
    (item) => typeof item.part === "string" && item.part === EnumSpeakingCriteria.Overall
  );

  if (!overalScore) {
    if (session.status !== EnumSimulatedTestSessionStatus.NOT_EVALUATED)
      return (
        <div className="rounded-xl bg-white p-4 xl:p-8">
          {t("crashMessage", {
            ns: "common",
          })}
        </div>
      );
    return;
  }

  return (
    <div className="relative rounded-xl bg-white p-4 xl:p-8">
      <div className="flex flex-col">
        <Typography variant="h5" className="text-center">
          {session.skillTest.simulatedIeltsTest.testName}
        </Typography>
        <Typography variant="body2" className="text-center text-supporting-text">
          {t("finished-on")}: {new Date(session.updatedAt || "").toLocaleString()}
        </Typography>
      </div>
      <div className="absolute left-4 top-4 flex flex-col items-start border-l-2 pl-4 text-sm italic text-muted-foreground xl:left-8 xl:top-8">
        <Typography variant="h6" className="text-center">
          {t("timeSpent", { ns: "collection" })}: {formatTime(session.elapsedTime)}
        </Typography>
      </div>
      <div className="mt-8 gap-8 md:grid md:grid-cols-2">
        {overalScore && <SkillEvaluationChart data={overalScore} skill={EnumSkill.writing} />}
        <div className="flex flex-col gap-3">
          <CustomAlert
            icon={<Info size={20} />}
            theme="info"
            title={t("warning", { ns: "common" })}
            description={t("result.warning", { ns: "simulatedTest" })}
          />
          <div className="grid grid-cols-2 gap-3 xl:gap-8 2xl:gap-3">
            {Object.entries(overalScore.criterias).map(([key, value]) => (
              <CriteriaScoreCard
                key={key}
                criteria={getCriterias(EnumSkill.writing)[key]}
                criteriaKey={key as EnumWritingCriteria}
                score={value.score}
                skill={EnumSkill.writing}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewEvaluationSection;
