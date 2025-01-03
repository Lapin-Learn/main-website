import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { PracticeBreadcrumb } from "@/components/molecules/practice-breadcrumb";
import TestHeaderLayout from "@/components/templates/test-header-layout";
import {
  useGetCollectionInfo,
  useGetSTSessionsHistoryByST,
} from "@/hooks/react-query/use-simulated-test";
import { MAPPED_SIMULATED_TEST_TAGS } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";
import { SimulatedTest } from "@/lib/types/simulated-test.type";

type SimulatedTestDetailHeaderProps = {
  simulatedTest?: SimulatedTest;

  filter?: {
    skill?: EnumSkill;
  };
};

export function SimulatedTestDetailHeader({
  simulatedTest,
  filter,
}: SimulatedTestDetailHeaderProps) {
  const { t } = useTranslation(["practice", "collection"]);
  const { collection, isLoading: collectionLoading } = useGetCollectionInfo(
    simulatedTest?.collectionId || 0
  );
  const { data } = useGetSTSessionsHistoryByST(simulatedTest?.id ?? 0, {
    offset: 0,
    limit: 1,
    ...filter,
  });

  const latestSessionTest = useMemo(() => {
    if (!data) return null;
    if (!data.items.length) return null;
    return data.items[0];
  }, [data, simulatedTest]);

  if (collectionLoading || !collection || !simulatedTest) {
    return <TestHeaderLayout.Skeleton />;
  }

  const { tags, thumbnail } = collection;

  return (
    <>
      <PracticeBreadcrumb collection={collection} simulatedTest={simulatedTest} />
      <TestHeaderLayout
        title={simulatedTest.testName}
        tags={tags}
        description={
          latestSessionTest &&
          `${t("finished-on", { context: "latest" })}: ${new Date(latestSessionTest.createdAt || "").toLocaleString()}`
        }
        imageSrc={thumbnail ?? undefined}
      >
        <TestHeaderLayout.ContentWrapper>
          <TestHeaderLayout.Image />
          <div className="flex w-full flex-col">
            <div className="flex h-fit flex-col gap-y-3">
              <TestHeaderLayout.Title />
              <TestHeaderLayout.TagList
                format={(tag) =>
                  t("collection-list.tags." + MAPPED_SIMULATED_TEST_TAGS[tag.trim()], {
                    ns: "practice",
                  })
                }
              />
              <TestHeaderLayout.Description />
            </div>
            <TestHeaderLayout.AchievementList>
              <TestHeaderLayout.Achievement
                title={t("latest-band", { ns: "practice" })}
                description={latestSessionTest?.estimatedBandScore ?? "--"}
              />
              <TestHeaderLayout.Achievement
                title={t("total-time-practice", { ns: "practice" })}
                description={data?.total ?? 0}
              />
              <TestHeaderLayout.Achievement
                title={t("timeSpent", { ns: "collection" })}
                description="1:24:45"
              />
            </TestHeaderLayout.AchievementList>
          </div>
        </TestHeaderLayout.ContentWrapper>
      </TestHeaderLayout>
    </>
  );
}
