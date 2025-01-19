import { useTranslation } from "react-i18next";

import { TransactionsHistoryTable } from "@/components/organisms/transactions-table/table";
import { Typography } from "@/components/ui";

export default function TransactionsPage() {
  const { t } = useTranslation("profile");
  return (
    <div className="py-8">
      <Typography variant="h5" className="mb-4">
        {t("transaction.title")}
      </Typography>
      <TransactionsHistoryTable />
    </div>
  );
}
