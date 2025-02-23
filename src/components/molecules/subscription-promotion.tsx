import { PricingPlanItemList } from "@components/organisms/pricing-plan-item-list.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Typography,
} from "@components/ui";
import { PulsatingButton } from "@components/ui/pulsating-button.tsx";
import { useEvaluateSimulatedTest } from "@hooks/react-query/use-simulated-test.ts";
import { useGetGamificationProfile } from "@hooks/react-query/useGamification.ts";
import { CheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import CarrotBasket from "@/assets/carrot-basket.svg";
import EvaluateFail from "@/assets/evaluate_failed.svg";
import Evaluating from "@/assets/evaluating.svg";
import { carrotSubscription } from "@/lib/consts.ts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums.ts";
import { BaseSTSession } from "@/lib/types/simulated-test-session.type.ts";
import { STCriteriaEvaluation } from "@/lib/types/simulated-test.type.ts";

import { BorderBeam } from "../magicui/border-beam";

type PromotionProps = {
  results: STCriteriaEvaluation[];
} & Pick<BaseSTSession, "id" | "status">;

export function SubscriptionPromotion({ results, id, status }: PromotionProps) {
  const { data: profile, isLoading } = useGetGamificationProfile();
  const isAffordable = (profile?.carrots || 0) >= 100;
  const evaluateMutation = useEvaluateSimulatedTest();
  const { t } = useTranslation(["subscription", "shop"]);

  const isNotEvaluated =
    evaluateMutation.isIdle && status === EnumSimulatedTestSessionStatus.NOT_EVALUATED;
  const isEvaluating =
    evaluateMutation.isPending || status === EnumSimulatedTestSessionStatus.IN_EVALUATING;
  const isEvaluationFailed =
    evaluateMutation.isError || status === EnumSimulatedTestSessionStatus.EVALUATION_FAILED;

  return (
    !results.length &&
    !isLoading && (
      <Card className="relative col-span-2 h-fit border-[#FFCB66] bg-white px-6 shadow-none">
        <CardHeader className="!pb-0">
          <CardTitle>
            <div
              className={`text-heading-5 text-primary-700 ${isNotEvaluated ? "text-left" : "text-center"}`}
            >
              {isNotEvaluated && t("evaluation")}
              {isEvaluating && t("evaluate.in_evaluating")}
              {isEvaluationFailed && t("evaluate.evaluation_failed_title")}
            </div>
          </CardTitle>
          {isNotEvaluated && (
            <CardDescription>{t("description", { ns: "subscription" })}</CardDescription>
          )}
        </CardHeader>
        {isNotEvaluated && <Separator />}
        <CardContent className="mt-6 rounded-xl px-0">
          {isAffordable ? (
            <div className="flex flex-col items-center justify-center gap-4">
              {isNotEvaluated && <img src={CarrotBasket} alt="carrot-basket" />}
              {isEvaluating && <img src={Evaluating} alt="evaluating" />}
              {isEvaluationFailed && <img src={EvaluateFail} alt="evaluate-failed" />}

              <Typography className="my-4 max-w-72 text-center" variant="body2">
                {isNotEvaluated &&
                  t(`shop.use_modal.amount`, { ns: "shop", amount: profile?.carrots, name: "" })}
                {isEvaluating && t("evaluate.in_evaluating_message")}
                {isEvaluationFailed && t("evaluate.evaluation_failed_message")}
              </Typography>

              {!isEvaluating && (
                <PulsatingButton
                  pulseColor="#F4926F"
                  onClick={() => evaluateMutation.mutate(id)}
                  className="min-w-[200px]"
                >
                  <div className="flex items-center gap-2">
                    {evaluateMutation.isError
                      ? t(`evaluate.evaluation_failed`, { ns: "subscription" })
                      : t(`evaluate.${status}`, { ns: "subscription" })}
                  </div>
                </PulsatingButton>
              )}
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
                <PricingPlanItemList item={carrotSubscription} />
              </div>
            </div>
          )}
          <BorderBeam duration={8} size={200} colorFrom="#FFCB66" colorTo="#FE8D0C" />
        </CardContent>
      </Card>
    )
  );
}
