import icons from "@/assets/icons";
import CriteriaScoreCard from "@/components/molecules/criteria-score-card";
import { SkillEvaluationChart } from "@/components/organisms/skill-evaluation-chart";
import { MAPPED_SPEAKING_CRITERIA_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus, EnumSpeakingCriteria } from "@/lib/enums";
import { SpeakingSession } from "@/lib/types/simulated-test-session.type";

type SpeakingResultProps = {
  session: SpeakingSession;
};

function SpeakingResult({ session }: SpeakingResultProps) {
  if (session.status == EnumSimulatedTestSessionStatus.IN_EVALUATING) {
    return <div>Đang chấm điểm</div>;
  }

  const overallScore = session.results.find(
    (item) => item.part?.toLowerCase() === EnumSpeakingCriteria.Overall
  );

  if (!overallScore) return <div>Đã có lỗi xảy ra</div>;

  const { part: _part, score: _score, ...overallEvaluation } = overallScore;

  return (
    <div className="rounded-xl bg-white p-4 xl:p-8">
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
