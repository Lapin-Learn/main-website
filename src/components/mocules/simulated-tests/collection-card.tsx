import { cn } from "@/lib/utils";

import { Skeleton } from "../../ui/skeleton";
import { SimulatedTestCollection } from "@/lib/types/simulated-test.type";
import { TestItem } from "./test-item";
import { useTranslation } from "react-i18next";

export const CollectionCard = ({
  name,
  description,
  tags,
  thumbnail,
  simulatedIeltsTests,
}: SimulatedTestCollection) => {
  const totalTests = simulatedIeltsTests.length;
  const { t } = useTranslation();
  // const completedQuestions = simulatedIeltsTests.reduce((acc, test) => {
  //   if (test.record.status === EnumTestRecordStatus.Completed && test.record.score !== null) {
  //     return acc + 1;
  //   }
  //   return acc;
  // }, 0);
  return (
    <div className="grid max-h-64 grid-cols-[2fr_5fr] gap-5 overflow-hidden rounded-2xl border bg-white shadow-sm hover:cursor-pointer hover:shadow-[0px_9px_24.1px_0px_rgba(101,105,115,0.1)]">
      {thumbnail ? (
        <img src={thumbnail.url} className="max-h-64 w-72 object-cover" />
      ) : (
        <Skeleton className="w-72" />
      )}
      <div className="flex w-full flex-col justify-between gap-6 py-4">
        <div className="flex h-fit w-full flex-row items-start justify-between gap-8">
          <div className="flex flex-col gap-y-2">
            <div>
              <span className="mr-2 text-lg font-semibold leading-8">{name}</span>
              <span className="inline-flex items-center gap-2 align-text-bottom">
                {tags.map((skill, index) => (
                  <span
                    key={index}
                    className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium text-blue-500"
                  >
                    {skill}
                  </span>
                ))}
              </span>
            </div>

            <p className="line-clamp-1 truncate text-wrap text-sm font-normal text-neutral-400 sm:line-clamp-2 md:line-clamp-3">
              {description}
            </p>
          </div>
          <div className="clip-custom bg-[#FCE3B4] p-2 pl-7 pr-3.5">
            <span className="text-nowrap text-sm text-[#A9421C]">
              {t("collection-list.numberOfTest", {
                ns: "practice",
                number: 0,
                total: totalTests,
              })}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "grid grid-cols-2 items-center justify-between gap-x-8 gap-y-1.5 pr-10",
            simulatedIeltsTests.length % 2 == 0
              ? "[&>*:nth-last-child(-n+2)>span]:hidden"
              : "[&>*:nth-last-child(-n+1)>span]:hidden"
          )}
        >
          {simulatedIeltsTests.map((test, index) => (
            <TestItem key={index} {...test} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkeletonCollectionCard = () => {
  return (
    <div className="grid h-64 animate-pulse grid-cols-[2fr_5fr] gap-5 overflow-hidden rounded-2xl border bg-white shadow-sm">
      <Skeleton className="h-64 rounded-none bg-neutral-50" />
      <div className="flex w-full flex-col justify-between gap-6 py-4">
        <div className="flex h-fit w-full flex-row items-start justify-between gap-8">
          <div className="flex w-full flex-col gap-y-2">
            <div>
              <div className="inline-block h-6 w-40 rounded bg-neutral-50" />
              <div className="flex h-7 items-center gap-1">
                <div className="inline-block h-3 w-10 rounded bg-neutral-50" />
                <div className="inline-block h-3 w-10 rounded bg-neutral-50" />
                <div className="inline-block h-3 w-10 rounded bg-neutral-50" />
              </div>
            </div>
            <div>
              <div className="mb-2 h-4 w-full rounded bg-neutral-50" />
              <div className="h-4 w-2/3 rounded bg-neutral-50" />
            </div>
          </div>
          <div className="clip-custom bg-neutral-50 p-2 pl-7 pr-3.5">
            <div className="h-4 w-1/3 bg-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center justify-between gap-4 gap-x-8 gap-y-1.5 pr-10">
          <div className="h-10 bg-neutral-50" />
          <div className="h-10 bg-neutral-50" />
          <div className="h-10 bg-neutral-50" />
          <div className="h-10 bg-neutral-50" />
        </div>
      </div>
    </div>
  );
};
