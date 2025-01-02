import { useTranslation } from "react-i18next";

import { useGetSimulatedTestDetail } from "@/hooks/react-query/use-simulated-test";
import { Route } from "@/routes/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId";

import SkillsFilter from "../molecules/skill-filter";
import { CollectionDetailHeader } from "../organisms/collection-detail-header";
import { SimulatedTestHistoryTable } from "../organisms/simulated-test-table/table";
export default function SimulatedTestDetailPage() {
  const { t: _ } = useTranslation(["collection", "common"]);
  const { collectionId } = Route.useParams();

  const { data: simulatedTest } = useGetSimulatedTestDetail(collectionId, !!collectionId);

  return (
    <div className="flex flex-col gap-6 p-8">
      <CollectionDetailHeader collectionId={simulatedTest?.collectionId || 0} />
      <SkillsFilter />
      <SimulatedTestHistoryTable />
    </div>
  );
}
