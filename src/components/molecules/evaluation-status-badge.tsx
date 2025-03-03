import { useTranslation } from "react-i18next";

import { EnumSimulatedTestSessionStatus } from "@/lib/enums";

import { Badge, BadgeVariant } from "../ui";

const statusBadges: Record<EnumSimulatedTestSessionStatus, BadgeVariant> = {
  [EnumSimulatedTestSessionStatus.IN_EVALUATING]: "blue",
  [EnumSimulatedTestSessionStatus.EVALUATION_FAILED]: "red",
  [EnumSimulatedTestSessionStatus.NOT_EVALUATED]: "neutral",
  [EnumSimulatedTestSessionStatus.FINISHED]: "green",
  [EnumSimulatedTestSessionStatus.IN_PROGRESS]: "default",
  [EnumSimulatedTestSessionStatus.NOT_STARTED]: "default",
  [EnumSimulatedTestSessionStatus.CANCELED]: "default",
};

const EvaluationStatusBadge = ({ status }: { status: EnumSimulatedTestSessionStatus }) => {
  const { t } = useTranslation("simulatedTest");

  return (
    <Badge variant={statusBadges[status]} className="font-medium">
      {t(`status.${status}`)}
    </Badge>
  );
};

export default EvaluationStatusBadge;
