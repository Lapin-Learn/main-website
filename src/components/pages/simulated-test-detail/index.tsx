import { useSearch } from "@tanstack/react-router";

import { useGetSimulatedTestDetail } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import { Route } from "@/routes/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId";

import SkillsFilter from "../../molecules/skill-filter";
import { SimulatedTestHistoryTable } from "../../organisms/simulated-test-table/table-by-test";
import { SimulatedTestDetailHeader } from "./simulated-test-detail-header";

export default function SimulatedTestDetailPage() {
  const { collectionId, simulatedTestId } = Route.useParams();
  const { skill } = useSearch({
    strict: false,
  });

  const { data: simulatedTest } = useGetSimulatedTestDetail(collectionId, !!collectionId);

  return (
    <div className="flex flex-col gap-6 p-8">
      <SimulatedTestDetailHeader
        simulatedTest={simulatedTest}
        filter={{
          skill: (skill as EnumSkill) ?? undefined,
        }}
      />
      <SkillsFilter />
      <SimulatedTestHistoryTable
        simulatedTestId={simulatedTestId}
        filter={{
          skill: (skill as EnumSkill) ?? undefined,
        }}
      />
    </div>
  );
}
