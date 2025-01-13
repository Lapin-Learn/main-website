import icons from "@/assets/icons";
import CriteriaScoreCard from "@/components/molecules/criteria-score-card";
import { SkillEvaluationChart } from "@/components/organisms/skill-evaluation-chart";
import { EnumSimulatedTestSessionStatus, EnumSpeakingCriteria } from "@/lib/enums";
import { WritingSession } from "@/lib/types/simulated-test-session.type";

type WritingResultProps = {
  session: WritingSession;
};

function WritingResult({ session }: WritingResultProps) {
  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      {session.status == EnumSimulatedTestSessionStatus.IN_EVALUATING ? (
        <div>Đang chấm điểm</div>
      ) : (
        <EvaluationSection session={session} />
      )}
      <div className="rounded-xl bg-white p-4 xl:p-8">
        {session.responses.map((response, index) => (
          <div key={index} className="mb-8">
            <div className="mb-4 text-lg font-semibold">Task {index + 1}</div>
            <div className="rounded-xl bg-gray-100 p-4">{response.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvaluationSection({ session }: WritingResultProps) {
  const overallScore = session.results.find(
    (item) => item.part?.toLowerCase() === EnumSpeakingCriteria.Overall
  );

  if (!overallScore) return <div className="rounded-xl bg-white p-4 xl:p-8">Đã có lỗi xảy ra</div>;

  const { part: _part, score: _score, ...overallEvaluation } = overallScore;

  return (
    <div className="rounded-xl bg-white p-4 xl:p-8">
      {overallScore && <SkillEvaluationChart data={overallScore} />}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {Object.entries(overallEvaluation).map(([key, value]) => (
          <CriteriaScoreCard
            key={key}
            criteria={key}
            evaluate={value.evaluate}
            score={value.score}
            Icon={icons.WritingFilled}
          />
        ))}
      </div>
    </div>
  );
}

export default WritingResult;
