import { EnumSkill } from "@/lib/enums";
import { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { calculateOverallBandScore, cn, getCriterias } from "@/lib/utils";

import CriteriaScoreCardSimple from "../molecules/criteria-score-card-simple";
import { Typography } from "../ui";

type CriteriaScoreListProps = {
  evaluationResult: STCriteriaEvaluation;
  skill: EnumSkill.writing | EnumSkill.speaking;
};

function CriteriaScoreList({ evaluationResult, skill }: CriteriaScoreListProps) {
  const overall = calculateOverallBandScore(
    Object.values(evaluationResult.criterias).map((item) => item.score)
  );
  const MAPPED_TITLES = getCriterias(skill, true);

  return (
    <div
      className={cn(
        "col-span-2 flex flex-col rounded-lg bg-secondary/50",
        skill == EnumSkill.speaking && "col-span-3"
      )}
    >
      <Typography variant="h3" className="mt-6 text-center capitalize text-primary-700">
        Total: {overall}
      </Typography>
      {Object.entries(evaluationResult.criterias).map(([key, value]) => (
        <CriteriaScoreCardSimple
          key={key}
          criteria={MAPPED_TITLES[key] ?? key}
          evaluate={value.evaluate ?? ""}
          score={value.score}
        />
      ))}
    </div>
  );
}

export default CriteriaScoreList;
