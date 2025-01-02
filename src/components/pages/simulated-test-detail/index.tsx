import { useGetSimulatedTestDetail } from "@/hooks/react-query/use-simulated-test";
import { Route } from "@/routes/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId";

import SkillsFilter from "../../molecules/skill-filter";
import { SimulatedTestHistoryTable } from "../../organisms/simulated-test-table/table";
import { SimulatedTestDetailHeader } from "./simulated-test-detail-header";

export default function SimulatedTestDetailPage() {
  const { collectionId } = Route.useParams();

  const { data: simulatedTest } = useGetSimulatedTestDetail(collectionId, !!collectionId);

  return (
    <div className="flex flex-col gap-6 p-8">
      <SimulatedTestDetailHeader simulatedTest={simulatedTest} />
      <SkillsFilter />
      <SimulatedTestHistoryTable />
    </div>
  );
}
