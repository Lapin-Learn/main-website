import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import FilteredSkillCard from "../mocules/simulated-test/filtered-skill-card";
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
  const { t } = useTranslation();

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
              <BreadcrumbLink href={location.pathname}>Road to IELTS</BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="capitalize">{location.search.skill}</BreadcrumbPage>
            </>
          ) : (
            <BreadcrumbPage>Road to IELTS</BreadcrumbPage>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <div className="flex h-48 flex-row gap-5">
          <Skeleton className="w-36 rounded-lg" />
          <div className="flex w-full flex-col gap-6 py-4">
            <div className="flex h-fit w-full flex-row items-start justify-between gap-8">
              <div className="flex flex-col gap-y-3">
                <span className="mr-2 text-xl font-bold leading-8">Road to IELTS</span>
                <span className="inline-flex items-center gap-2 align-text-bottom">
                  {["Academic", "De du doan"].map((skill, index) => (
                    <span
                      key={index}
                      className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium text-blue-500"
                    >
                      {skill}
                    </span>
                  ))}
                </span>
                <p className="line-clamp-1 truncate text-wrap text-sm font-normal text-neutral-400 sm:line-clamp-2 md:line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {location.searchStr ? (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <FilteredSkillCard />
          ))}
        </div>
      ) : (
        [1, 2, 3, 4].map(() => <SimulatedTestCard />)
      )}
    </div>
  );
}
