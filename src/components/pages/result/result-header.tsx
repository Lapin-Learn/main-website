import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PracticeBreadcrumb } from "@/components/molecules/practice-breadcrumb";
import TestHeaderLayout from "@/components/templates/test-header-layout";
import { useGetCollectionInfo } from "@/hooks/react-query/use-simulated-test";
import useBreakPoint from "@/hooks/use-screen-size";
import { MAPPED_SIMULATED_TEST_TAGS } from "@/lib/consts";
import { SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { formatTime } from "@/lib/utils";

type CollectionDetailHeaderProps = {
  collectionId: number;
  session?: SimulatedTestSession;
};

export function ResultHeader({ collectionId, session }: CollectionDetailHeaderProps) {
  const { t } = useTranslation(["practice", "collection"]);
  const breakpoint = useBreakPoint();
  const { collection, isLoading: collectionLoading } = useGetCollectionInfo(collectionId);

  if (collectionLoading || !collection) {
    return <TestHeaderLayout.Skeleton />;
  }

  const { tags, thumbnail } = collection;

  const totalQuestions = session?.skillTest.partsDetail.reduce((acc, part) => {
    const { startQuestionNo, endQuestionNo } = part;
    return acc + (endQuestionNo - startQuestionNo + 1);
  }, 0);

  const AchievementList = () =>
    session ? (
      <TestHeaderLayout.AchievementList>
        {session.estimatedBandScore && (
          <TestHeaderLayout.Achievement title="Band" description={session.estimatedBandScore} />
        )}
        {session.results && (
          <TestHeaderLayout.Achievement
            title={t("correctAnswer", { ns: "collection", context: "plural" })}
            description={
              <>
                <Check className="text-green-500" />
                <span className="text-2xl font-semibold">
                  {session.results.filter((res) => res).length}
                  <span className="text-sm font-normal text-neutral-300">/ {totalQuestions}</span>
                </span>
              </>
            }
          />
        )}
        <TestHeaderLayout.Achievement
          title={t("timeSpent", { ns: "collection" })}
          description={
            <span className="text-2xl font-semibold">{formatTime(session.elapsedTime || 0)}</span>
          }
        />
      </TestHeaderLayout.AchievementList>
    ) : null;

  return (
    <>
      <PracticeBreadcrumb collection={collection} session={session} />
      <TestHeaderLayout
        title={session?.skillTest.simulatedIeltsTest.testName}
        tags={tags}
        description={
          session && `${t("finished-on")}: ${new Date(session.updatedAt || "").toLocaleString()}`
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
            {breakpoint !== "xs" && <AchievementList />}
          </div>
        </TestHeaderLayout.ContentWrapper>
        {breakpoint === "xs" && (
          <div className="flex flex-row justify-center">
            <AchievementList />
          </div>
        )}
      </TestHeaderLayout>
    </>
  );
}
