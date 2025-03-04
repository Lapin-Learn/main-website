import { PricingPlanItemList } from "@components/organisms/pricing-plan-item-list.tsx";
import {
  Button,
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
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import CarrotIcon from "@/assets/icons/carrot";
import { carrotSubscription } from "@/lib/consts.ts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums.ts";
import { BaseSTSession } from "@/lib/types/simulated-test-session.type.ts";
import { cn } from "@/lib/utils";

import { BorderBeam } from "../magicui/border-beam";

type EvaluationSectionProps = Pick<BaseSTSession, "id" | "status"> & {
  className?: string;
};

export function EvaluationSection({ id, status, className }: EvaluationSectionProps) {
  const { data: profile, isLoading } = useGetGamificationProfile();
  const evaluateMutation = useEvaluateSimulatedTest();
  const { t } = useTranslation(["subscription", "shop"]);

  const isNotEvaluated =
    evaluateMutation.isIdle && status === EnumSimulatedTestSessionStatus.NOT_EVALUATED;
  const isEvaluating =
    evaluateMutation.isPending || status === EnumSimulatedTestSessionStatus.IN_EVALUATING;
  const isEvaluationFailed =
    evaluateMutation.isError || status === EnumSimulatedTestSessionStatus.EVALUATION_FAILED;

  const childrenByStatus = useMemo(() => {
    if (isNotEvaluated) {
      return {
        title: "evaluation",
        titleStyle: "text-left",
        description: "description",
        buttonText: "evaluate.not_evaluated",
        image: "/assets/carrot-basket.svg",
        altImage: "carrot-basket",
      };
    }
    if (isEvaluating) {
      return {
        title: "evaluate.in_evaluating",
        titleStyle: "text-center",
        description: "evaluate.in_evaluating_message",
        buttonText: "evaluate.in_evaluating",
        image: "/assets/evaluating.svg",
        altImage: "evaluating",
      };
    }
    if (isEvaluationFailed) {
      return {
        title: "evaluate.evaluation_failed_title",
        titleStyle: "text-center",
        description: "evaluate.evaluation_failed_message",
        buttonText: "evaluate.evaluation_failed",
        image: "/assets/evaluate_failed.svg",
        altImage: "evaluate-failed",
      };
    }
    return null;
  }, [isNotEvaluated, isEvaluating, isEvaluationFailed]);

  if (isLoading || !profile || !childrenByStatus) return null;

  const isAffordable = profile.carrots >= 100;

  return (
    <Card
      className={cn(
        "relative col-span-2 h-fit overflow-hidden border-2 border-none bg-white shadow-none",
        className
      )}
    >
      <CardHeader className="!pb-0">
        <CardTitle>
          <div className={`text-heading-5 text-primary-700 ${childrenByStatus.titleStyle}`}>
            {t(childrenByStatus.title)}
          </div>
        </CardTitle>
        {isNotEvaluated && (
          <>
            <CardDescription>{t("description", { ns: "subscription" })}</CardDescription>
            <Separator />
          </>
        )}
      </CardHeader>
      <CardContent className="mt-6 rounded-xl">
        <div className="flex flex-col items-center justify-center gap-4">
          {isNotEvaluated || isEvaluationFailed ? (
            <div className="flex flex-col gap-4">
              {["features.criteria", "features.price"].map((key) => (
                <div key={key} className="flex gap-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-blue p-1">
                    <CheckIcon color="white" />
                  </div>
                  <Typography variant="body2">{t(key, { ns: "subscription" })}</Typography>
                </div>
              ))}
            </div>
          ) : null}
          {isAffordable ? (
            <img src={childrenByStatus.image} alt={childrenByStatus.altImage} className="h-40" />
          ) : (
            <div className="flex w-full flex-wrap justify-center gap-4">
              <PricingPlanItemList item={carrotSubscription} />
            </div>
          )}

          {isNotEvaluated && (
            <Typography
              className="my-4 inline-flex max-w-72 items-center gap-2 text-center"
              variant="body2"
            >
              {t(`shop.use_modal.amount`, { ns: "shop", amount: profile?.carrots, name: "" })}
              <CarrotIcon />
            </Typography>
          )}
          {isEvaluating && (
            <Typography className="my-4 max-w-72 text-center ">
              {t("evaluate.in_evaluating_message")}
            </Typography>
          )}
          {isEvaluationFailed && (
            <Typography className="my-4 max-w-72 text-center ">
              {t("evaluate.evaluation_failed_message")}
            </Typography>
          )}

          {!isEvaluating ? (
            isAffordable ? (
              <PulsatingButton
                pulseColor="#F4926F"
                onClick={() => evaluateMutation.mutate(id)}
                className="min-w-[200px]"
                disabled={!isAffordable}
              >
                {t(childrenByStatus.buttonText, { ns: "subscription" })}
              </PulsatingButton>
            ) : (
              <Button
                onClick={() => evaluateMutation.mutate(id)}
                className="min-w-[200px]"
                disabled
              >
                {t(childrenByStatus.buttonText, { ns: "subscription" })}
              </Button>
            )
          ) : null}
        </div>
      </CardContent>
      <BorderBeam
        duration={8}
        size={200}
        colorFrom="#FFCB66"
        colorTo="#FE8D0C"
        borderColor="border-[#FFCB66] border-2"
      />
    </Card>
  );
}
