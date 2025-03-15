import { Typography } from "@components/ui";
import i18next from "i18next";
import { useState } from "react";

import { EnumSkill } from "@/lib/enums";
import { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { getCriterias, updateResults } from "@/lib/utils";

type CriteriaScoreListProps = {
  evaluationResult: STCriteriaEvaluation[];
  partNo: number;
};

function EvaluationList({ evaluationResult, partNo }: CriteriaScoreListProps) {
  const MAPPED_TITLES = getCriterias(EnumSkill.speaking, false);
  const [results, setResults] = useState<STCriteriaEvaluation[]>(updateResults(evaluationResult));
  i18next.on("languageChanged", () => {
    setResults(updateResults(evaluationResult));
  });

  const evaluatedResults = results.find((result) => result.part == partNo);

  return (
    <div className="col-start-2 flex flex-col gap-8 rounded-xl bg-white p-5">
      {evaluatedResults &&
        Object.entries(evaluatedResults.criterias).map(([key, value]) => (
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
