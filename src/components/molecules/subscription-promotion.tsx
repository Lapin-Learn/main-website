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
import { CheckIcon, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import CarrotBasket from "@/assets/carrot-basket.svg";
import Evaluating from "@/assets/evaluating.svg";
import { carrotSubscription } from "@/lib/consts.ts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums.ts";
import { BaseSTSession } from "@/lib/types/simulated-test-session.type.ts";
import { STCriteriaEvaluation } from "@/lib/types/simulated-test.type.ts";
import { cn } from "@/lib/utils";

import { BorderBeam } from "../magicui/border-beam";

type PromotionProps = {
  results: STCriteriaEvaluation[];
} & Pick<BaseSTSession, "id" | "status">;

export function SubscriptionPromotion({ results, id, status }: PromotionProps) {
  const { data: profile, isLoading } = useGetGamificationProfile();
  const isAffordable = (profile?.carrots || 0) >= 100;

  const evaluateMutation = useEvaluateSimulatedTest();

  const { t } = useTranslation(["subscription", "shop"]);

  return (
    !results.length &&
    !isLoading && (
      <Card
        className={cn(
          "col-span-2 h-fit relative px-6 shadow-none border-[#FFCB66]",
          evaluateMutation.isPending ? "bg-white" : "bg-gradient-to-b from-[#FCE3B4]"
        )}
      >
        <CardHeader className="px-0">
          <CardTitle className="text-primary-700">
            {evaluateMutation.isPending ? t("evaluate.in_evaluating") : t("evaluation")}
          </CardTitle>
          {!evaluateMutation.isPending && (
            <CardDescription>{t("description", { ns: "subscription" })}</CardDescription>
          )}
        </CardHeader>
        <Separator />
        <CardContent className="mt-6 rounded-xl px-0">
          {isAffordable ? (
            evaluateMutation.isPending ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <img src={Evaluating} alt="evaluating" />
                <Typography className="text-center" variant="body2">
                  {t("evaluate.in_evaluating_message")}
                </Typography>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <img src={CarrotBasket} alt="carrot-basket" />
                <Typography variant="body2">
                  {t(`shop.use_modal.amount`, { ns: "shop", amount: profile?.carrots, name: "" })}
                </Typography>
                <PulsatingButton
                  pulseColor="#F4926F"
                  onClick={() => evaluateMutation.mutate(id)}
                  disabled={status == EnumSimulatedTestSessionStatus.IN_EVALUATING}
                  className="min-w-[200px]"
                >
                  {evaluateMutation.isPending ? (
                    <Loader2 className="animate-spin text-white" size={24} />
                  ) : (
                    <div className="flex items-center gap-2">
                      {t(`evaluate.${status}`, { ns: "subscription" })}
                      {status === EnumSimulatedTestSessionStatus.IN_EVALUATING ? (
                        <Loader2 className="animate-spin text-white" size={24} />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </PulsatingButton>
              </div>
            )
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
