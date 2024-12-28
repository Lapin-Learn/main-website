import { useLocation, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useGetCollectionDetail } from "@/hooks/react-query/use-simulated-test";
import { Route } from "@/routes/_authenticated/_dashboard/practice/$collectionId";

import { LoadMore } from "../molecules/load-more";
import {
  FilteredSkillCard,
  SkeletonFilteredSkillCard,
} from "../molecules/simulated-tests/filtered-skill-card";
import { CollectionDetailHeader } from "../organisms/collection-detail-header";
import SelectModeDialog from "../organisms/select-mode-dialog";
import { SimulatedTestCard, SkeletonSimulatedTestCard } from "../organisms/simulated-test/card";

export default function CollectionDetailPage() {
  const { search } = useLocation();
  const { collectionId } = Route.useParams();
  const { list, isLoading, loadMoreProps } = useGetCollectionDetail(Number(collectionId));
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!isLoading && !list) {
    navigate({ to: "/practice" });
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <CollectionDetailHeader collectionId={Number(collectionId)} />
      <SelectModeDialog />
      {search.skill ? (
        list && !isLoading ? (
          list.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {list.map((simulatedTest) => {
                const skillTest = simulatedTest.skillTests.find((st) => st.skill === search.skill);
                if (!skillTest) return null;
                return (
                  <FilteredSkillCard
                    test={simulatedTest}
                    skillTest={skillTest}
                    isSupport={!!skillTest && skillTest.partsDetail.length > 0}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid h-96 place-items-center text-center text-xl text-neutral-500">
              {t("search.noResults")}
            </div>
          )
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, id) => (
              <SkeletonFilteredSkillCard key={id} />
            ))}
          </div>
        )
      ) : list && !isLoading ? (
        list.length > 0 ? (
          list.map((simulatedTest) => (
            <SimulatedTestCard
              key={simulatedTest.id}
              {...simulatedTest}
              collectionId={collectionId}
            />
          ))
        ) : (
          <div className="grid h-96 place-items-center text-center text-xl text-neutral-500">
            {t("search.noResults")}
          </div>
        )
      ) : (
        Array.from({ length: 3 }).map((_, id) => <SkeletonSimulatedTestCard key={id} />)
      )}
      {loadMoreProps.hasNextPage && <LoadMore {...loadMoreProps} />}
    </div>
  );
}
