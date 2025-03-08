import { useTranslation } from "react-i18next";

import { MAPPED_SIMULATED_TEST_TAGS } from "@/lib/consts";
import { SimulatedTestCollection, SimulatedTestSimple } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import { Skeleton } from "../../ui/skeleton";
import TagsList from "../tags-list";
import { TestItem } from "./test-item";

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
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm hover:cursor-pointer hover:shadow-[0px_9px_24.1px_0px_rgba(101,105,115,0.1)] md:rounded-2xl">
      <div className="grid min-h-36 max-w-full grid-cols-[2fr_5fr] gap-3 md:min-h-60 md:gap-5">
        {thumbnail ? (
          <img src={thumbnail} className="h-36 w-72 object-cover md:h-60" />
        ) : (
          <Skeleton className="rounded-none" />
        )}
        <div className="flex w-full flex-col justify-between gap-2 py-2 md:gap-6 md:py-4">
          <div className="flex h-fit w-full flex-row items-start justify-between gap-1 md:gap-8">
            <div className="flex flex-col gap-y-2">
              <div>
                <span className="mr-2 text-lg font-semibold leading-8">{name}</span>
                <TagsList
                  tags={tags}
                  format={(tag) =>
                    t("collection-list.tags." + MAPPED_SIMULATED_TEST_TAGS[tag.trim()], {
                      ns: "practice",
                    })
                  }
                />
              </div>

              <p className="line-clamp-3 truncate text-wrap text-sm font-normal text-neutral-400 max-md:hidden">
                {description}
              </p>
            </div>
            <div className="clip-custom bg-[#FCE3B4] p-1 pl-5 pr-3 md:p-2 md:pl-7">
              <span className="text-nowrap text-xs text-[#A9421C] md:text-sm">
                {t("collection-list.numberOfTest", {
                  ns: "practice",
                  number: 0,
                  total: totalTests,
                  context: simulatedIeltsTests[0].id ? "private" : "public",
                })}
              </span>
            </div>
          </div>
          <p className="line-clamp-3 truncate text-wrap pr-2 text-sm font-normal text-neutral-400 md:hidden">
            {description}
          </p>
          <TestList tests={simulatedIeltsTests} className="hidden md:grid" />
        </div>
      </div>
      <TestList tests={simulatedIeltsTests} className="p-4 md:hidden" />
    </div>
  );
};

const TestList = ({
  tests,
  className,
}: {
  tests: Partial<SimulatedTestSimple>[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 items-center justify-between gap-x-4 md:gap-x-8 gap-y-1.5 pr-10",
        className,
        tests.length % 2 == 0
          ? "[&>*:nth-last-child(-n+2)>span]:hidden"
          : "[&>*:nth-last-child(-n+1)>span]:hidden"
      )}
    >
      {tests.map((test, index) => (
        <TestItem key={index} {...test} />
      ))}
    </div>
  );
};

export const SkeletonCollectionCard = () => {
  return (
    <div className="grid h-64 w-full animate-pulse grid-cols-[2fr_5fr] gap-5 overflow-hidden rounded-2xl border bg-white shadow-sm">
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
          <div className="h-8 bg-neutral-50" />
          <div className="h-8 bg-neutral-50" />
          <div className="h-8 bg-neutral-50" />
          <div className="h-8 bg-neutral-50" />
        </div>
      </div>
    </div>
  );
};
