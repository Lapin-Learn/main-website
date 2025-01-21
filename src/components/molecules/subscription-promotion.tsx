import { ItemPricingPlans } from "@components/molecules/item-pricing-plans.tsx";
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
import { useGetGamificationProfile } from "@hooks/react-query/useGamification.ts";
import { CheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import CarrotBasket from "@/assets/carrotBasket.svg";
import { carrotSubscription } from "@/lib/consts.ts";
import { STCriteriaEvaluation } from "@/lib/types/simulated-test.type.ts";

export function SubscriptionPromotion({ results }: { results: STCriteriaEvaluation[] }) {
  const { data: profile } = useGetGamificationProfile();
  const isAffordable = (profile?.carrots || 0) >= 100;

  const { t } = useTranslation("subscription");

  return (
    !results && (
      <Card className="col-span-2 h-fit border-none bg-gradient-to-b from-[#FCE3B4] px-6 shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-primary-700">{t("evaluation")}</CardTitle>
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
    )
  );
}
