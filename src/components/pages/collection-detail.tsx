import { useLocation, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useGetCollectionDetail } from "@/hooks/react-query/use-simulated-test";
import { MAPPED_SIMULATED_TEST_TAGS } from "@/lib/consts";
import { Route } from "@/routes/_authenticated/practice/$collectionId";

import FilteredSkillCard from "../mocules/simulated-test/filtered-skill-card";
import SelectModeDialog from "../organisms/select-mode-dialog";
import useSelectModeDialog from "../organisms/select-mode-dialog/use-select-mode-dialog";
import SimulatedTestCard from "../organisms/simulated-test-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";

export default function CollectionDetailPage() {
  const location = useLocation();
  const { collectionId } = Route.useParams();
  const { collection, isLoading } = useGetCollectionDetail(Number(collectionId));
  const { t } = useTranslation();
  const { setData, setOpen } = useSelectModeDialog();
  const navigate = useNavigate();

  if (!isLoading && !collection) {
    navigate({ to: "/practice" });
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/practice">{t("navigation.practice")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {location.searchStr ? (
            <>
              <BreadcrumbLink href={location.pathname}>{collection?.name}</BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="capitalize">{location.search.skill}</BreadcrumbPage>
            </>
          ) : (
            <BreadcrumbPage>{collection?.name}</BreadcrumbPage>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <div className="mb-2 flex h-40 flex-row gap-5 md:h-60">
          {collection?.thumbnail ? (
            <img src={collection?.thumbnail} className="h-40 w-60 object-cover md:h-60 md:w-72" />
          ) : (
            <Skeleton className="h-40 w-60 md:h-60 md:w-72" />
          )}
          <div className="flex w-full flex-col gap-6 py-4">
            <div className="flex h-fit w-full flex-row items-start justify-between gap-8">
              <div className="flex flex-col gap-y-3">
                <span className="mr-2 text-lg font-bold md:text-xl md:leading-8">
                  {collection?.name}
                </span>
                <span className="inline-flex flex-wrap items-center gap-2 align-text-bottom">
                  {collection?.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium text-blue-500"
                    >
                      {t("collection-list.tags." + MAPPED_SIMULATED_TEST_TAGS[tag.trim()], {
                        ns: "practice",
                      })}
                    </span>
                  ))}
                </span>
                <p className="line-clamp-1 truncate text-wrap text-sm font-normal text-neutral-400 sm:line-clamp-2 md:line-clamp-3">
                  {collection?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SelectModeDialog />
      {location.searchStr ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <FilteredSkillCard
              onClick={(skill, test) => {
                console.log(skill, test);
                setData({ skill, test });
                setOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        [1, 2, 3, 4].map(() => <SimulatedTestCard />)
      )}
    </div>
  );
}
