import { useTranslation } from "react-i18next";

import icons from "@/assets/icons";
import CriteriaScoreCard from "@/components/molecules/criteria-score-card";
import { SkillEvaluationChart } from "@/components/organisms/skill-evaluation-chart";
import SpeakingSubmission from "@/components/organisms/speaking-submission";
import { Typography } from "@/components/ui";
import { useGetSimulatedTestDetail } from "@/hooks/react-query/use-simulated-test";
import { MAPPED_SPEAKING_CRITERIA_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus, EnumSkill, EnumSpeakingCriteria } from "@/lib/enums";
import { SpeakingSession } from "@/lib/types/simulated-test-session.type";
import { formatTime } from "@/lib/utils/index";

type SpeakingResultProps = {
  session: SpeakingSession;
};

function SpeakingResult({ session }: SpeakingResultProps) {
  const { data: stData } = useGetSimulatedTestDetail(session.skillTest.simulatedIeltsTest.id);
  const { t } = useTranslation();
  const questionTypes =
    stData?.skillTests
      .find((skill) => skill.skill === EnumSkill.speaking)
      ?.partsDetail.map((item) => item.questionTypes) ?? [];

  return (
    <div className="flex flex-col gap-4">
      {session.status == EnumSimulatedTestSessionStatus.IN_EVALUATING ? (
        <div>{t("status_in_evaluating", { ns: "simulatedTest" })}</div>
      ) : session.results ? (
        <EvaluationSection session={session} />
      ) : (
        <div className="rounded-xl bg-white p-4 xl:p-8">{t("crashMessage")}</div>
      )}
      <SpeakingSubmission
        userSubmissions={session.responses}
        skillTestId={session.skillTest.id}
        questionTypes={questionTypes}
        evaluationResults={session.results}
        parts={session.parts}
        resource={session.resource}
      />
    </div>
  );
}

function EvaluationSection({ session }: SpeakingResultProps) {
  const { t } = useTranslation(["practice", "collection"]);

  const overalScore = session.results.find(
    (item) => typeof item.part === "string" && item.part === EnumSpeakingCriteria.Overall
  );

  // TODO: add a screen for the user to retake the test, do full part to get the overall score
  if (session.responses.length < 3 || !overalScore) return null;

  return (
    <div className="relative rounded-xl bg-white p-4 xl:p-8">
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
      {overalScore && <SkillEvaluationChart data={overalScore} />}
      <div className="3xl:grid-cols-4 grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8 2xl:gap-4">
        {Object.entries(overalScore.criterias).map(([key, value]) => (
          <CriteriaScoreCard
            key={key}
            criteria={MAPPED_SPEAKING_CRITERIA_TITLES[key] ?? key}
            evaluate={value.evaluate ?? ""}
            score={value.score}
            Icon={icons.WritingFilled}
          />
        ))}
      </div>
    </div>
  );
}

export default SpeakingResult;
