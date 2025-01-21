import { useTranslation } from "react-i18next";

import { EnumTransactionStatus } from "@/lib/enums";

import { Badge, BadgeVariant } from "../ui";

const TransactionStatusBadge = ({ status }: { status: EnumTransactionStatus }) => {
  const { t } = useTranslation("profile");
  const statusBadges: Record<EnumTransactionStatus, BadgeVariant> = {
    [EnumTransactionStatus.PAID]: "green",
    [EnumTransactionStatus.PENDING]: "blue",
    [EnumTransactionStatus.CANCELLED]: "purple",
    [EnumTransactionStatus.UNDERPAID]: "blue",
    [EnumTransactionStatus.ERROR]: "red",
  };

  return <Badge variant={statusBadges[status]}>{t(`transaction.statusOptions.${status}`)}</Badge>;
};

export default TransactionStatusBadge;
