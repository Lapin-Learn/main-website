import { useTranslation } from "react-i18next";

import { useGetCollectionInfo } from "@/hooks/react-query/use-simulated-test";
import useBreakPoint from "@/hooks/use-screen-size";
import { MAPPED_SIMULATED_TEST_TAGS } from "@/lib/consts";

import { PracticeBreadcrumb } from "../molecules/practice-breadcrumb";
import TestHeaderLayout from "../templates/test-header-layout";
import { LatestTestSection } from "./latest-test-section";

type CollectionDetailHeaderProps = {
  collectionId: number;
};

export function CollectionDetailHeader({ collectionId }: CollectionDetailHeaderProps) {
  const { t } = useTranslation(["practice", "collection"]);
  const { collection, isLoading: collectionLoading } = useGetCollectionInfo(collectionId);
  const isMobile = useBreakPoint() === "xs";

  if (collectionLoading || !collection) {
    return <TestHeaderLayout.Skeleton />;
  }

  const { name, description, tags, thumbnail } = collection;

  return (
    <>
      <PracticeBreadcrumb collection={collection} />
      <TestHeaderLayout
        title={name}
        tags={tags}
        description={description}
        imageSrc={thumbnail ?? undefined}
      >
        {isMobile && (
          <div className="mb-3 flex flex-row flex-wrap gap-2">
            <TestHeaderLayout.Title />
            <TestHeaderLayout.TagList
              format={(tag) =>
                t("collection-list.tags." + MAPPED_SIMULATED_TEST_TAGS[tag.trim()], {
                  ns: "practice",
                })
              }
            />
          </div>
        )}
        <TestHeaderLayout.ContentWrapper>
          <TestHeaderLayout.Image />
          <div className="flex w-full flex-col justify-between">
            <div className="flex h-fit flex-col gap-y-3">
              {!isMobile && (
                <>
                  <TestHeaderLayout.Title />
                  <TestHeaderLayout.TagList
                    format={(tag) =>
                      t("collection-list.tags." + MAPPED_SIMULATED_TEST_TAGS[tag.trim()], {
                        ns: "practice",
                      })
                    }
                  />
                </>
              )}
              <TestHeaderLayout.Description />
            </div>
          </div>
          <LatestTestSection collectionId={collectionId} />
        </TestHeaderLayout.ContentWrapper>
      </TestHeaderLayout>
    </>
  );
}
