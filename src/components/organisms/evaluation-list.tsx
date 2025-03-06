import { Typography } from "@components/ui";

import { EnumSkill } from "@/lib/enums";
import { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { getCriterias } from "@/lib/utils";

type CriteriaScoreListProps = {
  evaluationResult: STCriteriaEvaluation;
};

function EvaluationList({ evaluationResult }: CriteriaScoreListProps) {
  const MAPPED_TITLES = getCriterias(EnumSkill.speaking, false);

  return (
    <div className="col-start-2 flex flex-col gap-8 rounded-xl bg-white p-5">
      {Object.entries(evaluationResult.criterias).map(([key, value]) => (
        <div key={key}>
          <Typography variant="h6" className="h-8 font-bold uppercase">
            {MAPPED_TITLES[key]}
          </Typography>
          <p>{typeof value.evaluate == "string" ? value.evaluate : ""}</p>
        </div>
      ))}
    </div>
  );
}

export default EvaluationList;
