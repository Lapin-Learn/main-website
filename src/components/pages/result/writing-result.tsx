import { SubscriptionRedirectDialog } from "@components/molecules/subscription-redirect-dialog.tsx";
import { useTranslation } from "react-i18next";

import icons from "@/assets/icons";
import CriteriaScoreCard from "@/components/molecules/criteria-score-card";
import { EvaluationSection } from "@/components/molecules/evaluation-section";
import { SkillEvaluationChart } from "@/components/organisms/skill-evaluation-chart";
import WritingSubmission from "@/components/organisms/writing-submission";
import { Typography } from "@/components/ui";
import { MAPPED_WRITING_CRITERIA_TITLES } from "@/lib/consts";
import {
  EnumSimulatedTestSessionStatus,
  EnumSkill,
  EnumSpeakingCriteria,
  EnumWritingCriteria,
} from "@/lib/enums";
import { WritingSession } from "@/lib/types/simulated-test-session.type";
import { cn, formatTime } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

type WritingResultProps = {
  session: WritingSession;
};

function WritingResult({ session }: WritingResultProps) {
  const { status, orderCode } = Route.useSearch();
  const isFullParts = session.parts.length == 2;

  // Get part types: Line graph, Pie chart, etc.
  const fullPartDetails = session.skillTest.partsDetail;
  const selectedPartDetails = fullPartDetails.filter((_, partNo) =>
    session.parts.includes(partNo + 1)
  );
  const partDetails = selectedPartDetails.map((part) =>
    part.questionTypesIndices.map((qt) => qt.name)
  );

  const submissions = session.parts.map((partNo) => {
    const submission = session.responses.find((response) => response.questionNo === partNo) ?? {
      questionNo: partNo,
      answer: "",
    };
    return submission;
  });

  return (
    <div className="flex flex-col gap-4">
      <OverviewEvaluationSection session={session} />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-4">
        <div
          className={cn(
            "flex gap-4 pb-0",
            !session.results.length ? "col-span-4" : "col-span-full"
          )}
        >
          <WritingSubmission
            userSubmissions={submissions}
            skillTestId={session.skillTest.id}
            partDetails={partDetails}
            evaluationResults={session.results}
            rootComponent={isFullParts ? "accordion" : "card"}
            finishedOn={session.updatedAt}
            timeSpent={formatTime(session.elapsedTime)}
          />
        </div>
        {session.results.length == 0 && (
          <EvaluationSection id={session.id} status={session.status} />
        )}
      </div>
      <SubscriptionRedirectDialog status={status} orderCode={orderCode} />
    </div>
  );
}

function OverviewEvaluationSection({ session }: WritingResultProps) {
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
      {overalScore && <SkillEvaluationChart data={overalScore} skill={EnumSkill.writing} />}
      <div className="3xl:grid-cols-4 grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8 2xl:gap-4">
        {Object.entries(overalScore.criterias).map(([key, value]) => (
          <CriteriaScoreCard
            key={key}
            criteria={MAPPED_WRITING_CRITERIA_TITLES[key] ?? key}
            criteriaKey={key as EnumWritingCriteria}
            evaluate={value.evaluate ?? ""}
            score={value.score}
            skill={EnumSkill.writing}
            Icon={icons.WritingFilled}
          />
        ))}
      </div>
    </div>
  );
}

export default WritingResult;
