import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useGetCollectionInfo } from "@/hooks/react-query/use-simulated-test";
import { MAPPED_SIMULATED_TEST_TAGS } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";
import { SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { formatTime } from "@/lib/utils";

import { PracticeBreadcrumb } from "../molecules/practice-breadcrumb";
import TagsList from "../molecules/tags-list";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export function CollectionDetailHeader({
  collectionId,
  session,
}: {
  collectionId: number;
  session?: SimulatedTestSession;
  skill?: EnumSkill;
}) {
  const { t } = useTranslation(["practice", "collection"]);
  const { collection, isLoading: collectionLoading } = useGetCollectionInfo(collectionId);

  if (collectionLoading || !collection) {
    return <SkeletonCollectionDetailHeader />;
  }

  const { name, description, tags, thumbnail } = collection;

  const totalQuestions = session?.skillTest.partsDetail.reduce((acc, part) => {
    const { startQuestionNo, endQuestionNo } = part;
    return acc + (endQuestionNo - startQuestionNo + 1);
  }, 0);

  return (
    <>
      <PracticeBreadcrumb collection={collection} session={session} />
      <div className="mb-2 flex h-fit flex-row gap-5 md:h-60">
        {thumbnail ? (
          <img
            src={thumbnail}
            className="h-40 w-60 overflow-hidden rounded-lg object-cover md:h-60 md:w-72"
          />
        ) : (
          <Skeleton className="h-40 w-60 overflow-hidden rounded-lg md:h-60 md:w-72" />
        )}
        <div className="flex h-fit w-full flex-col gap-y-3">
          <span className="mr-2 text-lg font-bold md:text-xl md:leading-8">
            {session ? session.skillTest.simulatedIeltsTest.testName : name}
          </span>
          <TagsList
            tags={tags}
            format={(tag) =>
              t("collection-list.tags." + MAPPED_SIMULATED_TEST_TAGS[tag.trim()], {
                ns: "practice",
              })
            }
          />
          {session ? (
            <>
              <span className="text-sm font-normal text-neutral-200">
                {t("finished-on")}: {new Date(session.updatedAt || "").toLocaleString()}
              </span>
              <div className="flex flex-row items-center gap-5 pt-3">
                {session.estimatedBandScore && (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-neutral-200">Band</span>
                      <span className="text-2xl font-semibold text-green-500">
                        {session.estimatedBandScore}
                      </span>
                    </div>
                    <Separator orientation="vertical" className="flex h-full min-h-12" />
                  </>
                )}
                {session.results && (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-neutral-200">
                        {t("correctAnswer", { ns: "collection" })}
                      </span>
                      <div className="flex flex-row items-center gap-2">
                        <Check className="text-green-500" />
                        <span className="text-2xl font-semibold">
                          {session.results.filter((res) => res).length}
                          <span className="text-sm font-normal text-neutral-200">
                            / {totalQuestions}
                          </span>
                        </span>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="flex h-full min-h-12" />
                  </>
                )}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-neutral-200">
                    {t("timeSpent", { ns: "collection" })}
                  </span>
                  <span className="text-2xl font-semibold">
                    {formatTime(session.elapsedTime || 0)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="line-clamp-1 truncate text-wrap text-sm font-normal text-neutral-400 sm:line-clamp-2 md:line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export function SkeletonCollectionDetailHeader() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <Skeleton className="h-5 w-52" />
      <div className="mb-2 flex h-40 flex-row gap-5 md:h-60">
        <Skeleton className="h-40 w-60 md:h-60 md:w-72" />
        <div className="flex w-full flex-col gap-6 py-4">
          <div className="flex h-fit w-full flex-row items-start justify-between gap-8">
            <div className="flex w-full flex-col gap-y-3">
              <span className="mr-2 h-8 w-52 bg-neutral-50 text-lg font-bold md:text-xl md:leading-8" />
              <span className="inline-flex flex-wrap items-center gap-2 align-text-bottom">
                <div className="h-6 w-20 rounded-md bg-neutral-50" />
              </span>
              <p className="line-clamp-1 truncate text-wrap text-sm font-normal text-neutral-400 sm:line-clamp-2 md:line-clamp-3">
                <div className="h-12 w-full bg-neutral-50" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
