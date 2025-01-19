import { ItemPricingPlans } from "@components/molecules/item-pricing-plans.tsx";
import { useGetGamificationProfile } from "@hooks/react-query/useGamification.ts";
import { CheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import CarrotBasket from "@/assets/carrotBasket.svg";
import icons from "@/assets/icons";
import CriteriaScoreCard from "@/components/molecules/criteria-score-card";
import { SkillEvaluationChart } from "@/components/organisms/skill-evaluation-chart";
import WritingSubmission from "@/components/organisms/writing-submission";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Typography,
} from "@/components/ui";
import { useGetSimulatedTestDetail } from "@/hooks/react-query/use-simulated-test";
import { carrotSubscription, MAPPED_WRITING_CRITERIA_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus, EnumSkill, EnumSpeakingCriteria } from "@/lib/enums";
import { WritingSession } from "@/lib/types/simulated-test-session.type";
import { cn, formatTime } from "@/lib/utils";

type WritingResultProps = {
  session: WritingSession;
};

function WritingResult({ session }: WritingResultProps) {
  const { data: stData } = useGetSimulatedTestDetail(session.skillTest.simulatedIeltsTest.id);
  const { data: profile } = useGetGamificationProfile();
  const isFullParts = session.responses.length == 2;
  const isAffordable = (profile?.carrots || 0) >= 100;
  const { t } = useTranslation(["simulatedTest", "subscription"]);

  // Get part types: Line graph, Pie chart, etc.
  const partDetails =
    stData?.skillTests
      .find((skill) => skill.skill === EnumSkill.writing)
      ?.partsDetail.map((item) => item.questionTypes) ?? [];

  return (
    <div className="flex flex-col gap-4">
      {session.status == EnumSimulatedTestSessionStatus.IN_EVALUATING ? (
        <div>{t("status_in_evaluating")}</div>
      ) : (
        <EvaluationSection session={session} />
      )}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-8">
        <div className={cn("flex gap-4 pb-0", !session.results ? "col-span-4" : "col-span-full")}>
          <WritingSubmission
            userSubmissions={session.responses}
            skillTestId={session.skillTest.id}
            partDetails={partDetails}
            evaluationResults={session.results}
            rootComponent={isFullParts ? "accordion" : "card"}
            finishedOn={session.updatedAt}
            timeSpent={formatTime(session.elapsedTime)}
          />
        </div>
        {!session.results && (
          <Card className="col-span-2 h-fit border-none bg-gradient-to-b from-[#FCE3B4] px-6 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-primary-700">
                {t("evaluation", { ns: "subscription" })}
              </CardTitle>
              <CardDescription>{t("description", { ns: "subscription" })}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="mt-6 px-0">
              {!isAffordable ? (
                <div className="flex flex-col items-center justify-center gap-4">
                  <img src={CarrotBasket} alt="carrot-basket" />
                  <Typography variant="body2">Ban dang co: {profile?.carrots} </Typography>
                  <Button className="w-full">{t("evaluateNow", { ns: "subscription" })}</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {["features.criteria", "features.price"].map((key) => (
                    <div key={key} className="flex gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary p-1">
                        <CheckIcon color="white" />
                      </div>
                      <Typography variant="body2">{t(key, { ns: "subscription" })}</Typography>
                    </div>
                  ))}
                  <div className="flex w-full flex-wrap justify-center gap-4">
                    <ItemPricingPlans item={carrotSubscription} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function EvaluationSection({ session }: WritingResultProps) {
  const { t } = useTranslation(["practice", "collection"]);

  const isFullParts = session.responses.length == 2;

  if (!isFullParts) return null;

  const overalScore = session.results.find(
    (item) => typeof item.part === "string" && item.part === EnumSpeakingCriteria.Overall
  );

  if (!overalScore)
    return (
      <div className="rounded-xl bg-white p-4 xl:p-8">
        {t("crashMessage", {
          ns: "common",
        })}
      </div>
    );

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
            evaluate={value.evaluate ?? ""}
            score={value.score}
            Icon={icons.WritingFilled}
          />
        ))}
      </div>
    </div>
  );
}

export default WritingResult;
