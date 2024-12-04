import { ArrowRight } from "lucide-react";

import ExamItemInProgressIcon from "@/assets/icons/exam/inprogress";
import { TestRecordStatus } from "@/lib/enums";
import { splitTextSpace } from "@/lib/utils";

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

export const ExamCard = ({ name, description, tags, tests, ...props }: ExamCardProps) => {
  const totalQuestions = tests.length;
  const completedQuestions = tests.reduce((acc, test) => {
    if (test.record.status === TestRecordStatus.Completed && test.record.score !== null) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return (
    <div className="flex flex-row gap-5 overflow-hidden rounded-2xl border bg-white shadow-sm">
      <Skeleton className="w-72" />
      <div className="flex w-full flex-col gap-6 py-4">
        <div className="flex h-fit w-full flex-row items-start justify-between gap-8">
          <div className="flex flex-col gap-y-2">
            <span className="flex flex-row flex-wrap items-center gap-x-4">
              <h3 className="flex-row text-lg font-semibold">{splitTextSpace(name)}</h3>
              <span className="flex gap-2">
                {tags.map((skill, index) => (
                  <span
                    key={index}
                    className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium text-blue-500"
                  >
                    {skill}
                  </span>
                ))}
              </span>
            </span>
            <p className="line-clamp-1 truncate text-wrap text-sm font-normal text-neutral-400 sm:line-clamp-2 md:line-clamp-3">
              {description}
            </p>
          </div>
          <div className="clip-custom bg-[#FCE3B4] p-2 pl-7 pr-3.5">
            <span className="text-nowrap text-sm text-[#A9421C]">{`${completedQuestions}/${totalQuestions} đề`}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 flex-wrap items-center justify-between gap-x-8 gap-y-3 pr-10">
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
    <Button variant="ghost" className="p-0" onClick={handleExam}>
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-center justify-between gap-2 py-1">
          <p className="grow-0 truncate text-small text-neutral-900">{test_name}</p>
          <ExamItemScore score={record.score ?? null} status={record.status} />
        </div>
        <Separator />
      </div>
    </Button>
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
