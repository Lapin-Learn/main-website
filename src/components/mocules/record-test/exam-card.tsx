import { ArrowRight } from "lucide-react";

import ExamItemInProgressIcon from "@/assets/icons/exam/inprogress";
import { TestRecordStatus } from "@/lib/enums";
import { cn } from "@/lib/utils";

import { Separator } from "../../ui/separator";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "@/components/ui";

export type TestRecordProps = {
  id: number;
  test_id: number;
  learner_id: number;
  score: number | null;
  status: TestRecordStatus;
};

export type TestProps = {
  id: number;
  collection_id: number;
  order: string;
  test_name: string;
  keyword: string;
  record: TestRecordProps;
};

export type ExamCardProps = {
  id: number;
  thumbnail_id: string;
  name: string;
  tags: string[];
  keyword: string;
  description: string;
  tests: TestProps[];
};

export const ExamCard = ({ name, description, tags, tests }: ExamCardProps) => {
  const totalQuestions = tests.length;
  const completedQuestions = tests.reduce((acc, test) => {
    if (test.record.status === TestRecordStatus.Completed && test.record.score !== null) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return (
    <div className="flex flex-row gap-5 overflow-hidden rounded-2xl border bg-white shadow-sm hover:cursor-pointer hover:shadow-[0px_9px_24.1px_0px_rgba(101,105,115,0.1)]">
      <Skeleton className="w-72 rounded-none" />
      <div className="flex w-full flex-col gap-6 py-4">
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
            <span className="text-nowrap text-sm text-[#A9421C]">{`${completedQuestions}/${totalQuestions} đề`}</span>
          </div>
        </div>
        <div
          className={cn(
            "grid grid-cols-2 items-center justify-between gap-x-8 gap-y-1.5 pr-10",
            tests.length % 2 == 0
              ? "[&>*:nth-last-child(-n+2)>span]:hidden"
              : "[&>*:nth-last-child(-n+1)>span]:hidden"
          )}
        >
          {tests.map((test, index) => (
            <TestItem key={index} {...test} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const TestItem = ({ test_name, record }: TestProps) => {
  const handleExam = () => {
    console.log("exam clicked");
  };
  return (
    <div>
      <Button variant="ghost" className="w-full p-0" onClick={handleExam}>
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-row items-center justify-between gap-2 py-1">
            <p className="text-small grow-0 truncate text-neutral-900">{test_name}</p>
            <ExamItemScore score={record.score ?? null} status={record.status} />
          </div>
        </div>
      </Button>
      <span>
        <Separator className="mt-1.5" />
      </span>
    </div>
  );
};

export const ExamItemScore = ({ score, status }: Pick<TestRecordProps, "score" | "status">) => {
  return (
    <div className="items-center justify-center text-center">
      {status === TestRecordStatus.InProgress ? (
        <ExamItemInProgressIcon />
      ) : status === TestRecordStatus.NotStarted ? (
        <ArrowRight className="text-neutral-400" size={16} />
      ) : (
        <span className="text-blue-600">{score}</span>
      )}
    </div>
  );
};
