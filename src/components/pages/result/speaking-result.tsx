import { useTranslation } from "react-i18next";

import icons from "@/assets/icons";
import CriteriaScoreCard from "@/components/molecules/criteria-score-card";
import { SkillEvaluationChart } from "@/components/organisms/skill-evaluation-chart";
import { Typography } from "@/components/ui";
import { MAPPED_SPEAKING_CRITERIA_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus, EnumSpeakingCriteria } from "@/lib/enums";
import { SpeakingSession } from "@/lib/types/simulated-test-session.type";

import { formatTime } from "../../../lib/utils/index";

type SpeakingResultProps = {
  session: SpeakingSession;
};

function SpeakingResult({ session }: SpeakingResultProps) {
  const { t } = useTranslation(["practice", "collection"]);
  if (session.status == EnumSimulatedTestSessionStatus.IN_EVALUATING) {
    return <div>Đang chấm điểm</div>;
  }

  const overallScore = session.results.find(
    (item) => item.part?.toLowerCase() === EnumSpeakingCriteria.Overall
  );

  if (!overallScore) return <div>Đã có lỗi xảy ra</div>;

  const { part: _part, score: _score, ...overallEvaluation } = overallScore;

  return (
    <div className="relative flex flex-col items-center gap-4 rounded-xl bg-white p-4 xl:p-8">
      <Typography variant="h5" className="text-center">
        {session.skillTest.simulatedIeltsTest.testName}
      </Typography>
      <div className="absolute left-4 top-4 flex flex-col items-start border-l-2 pl-4 text-sm italic text-muted-foreground xl:left-8 xl:top-8">
        <Typography variant="h6" className="text-center">
          {t("timeSpent", { ns: "collection" })}: {formatTime(session.elapsedTime)}
        </Typography>
        <Typography variant="h6" className="text-center">
          {t("finished-on")}: {new Date(session.updatedAt || "").toLocaleString()}
        </Typography>
      </div>

      {overallScore && <SkillEvaluationChart data={overallScore} />}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
        {Object.entries(overallEvaluation).map(([key, value]) => (
          <CriteriaScoreCard
            key={key}
            criteria={MAPPED_SPEAKING_CRITERIA_TITLES[key] ?? key}
            evaluate={value.evaluate}
            score={value.score}
            Icon={icons.SpeakingFilled}
          />
        ))}
      </div>
    </div>
  );
}

export default SpeakingResult;
