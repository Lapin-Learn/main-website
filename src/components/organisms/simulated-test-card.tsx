import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { EnumSkill } from "@/lib/enums";
import { SimulatedTest } from "@/lib/types/simulated-test.type";

import TestSkillCard from "../mocules/simulated-tests/test-skill-card";
import { Button, Separator } from "../ui";
import useSelectModeDialog from "./select-mode-dialog/use-select-mode-dialog";

export function SimulatedTestCard({
  testName,
  skillTests,
  order,
  id,
  collectionId,
}: SimulatedTest & {
  collectionId: number;
}) {
  const { t } = useTranslation(["collection", "practice"]);
  const { setOpen, setData } = useSelectModeDialog();
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="mb-4 truncate text-lg font-bold">{testName}</p>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-8 lg:items-center">
        <div className="flex min-w-36 flex-col justify-between gap-4">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-200">Band</span>
              <span className="text-sm font-semibold">--</span>
            </div>
            <Separator orientation="vertical" className="flex h-full min-h-12" />
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-200">{t("timeSpent")}</span>
              <span className="text-sm font-semibold">44:11</span>
            </div>
          </div>
          <Button
            className="size-fit gap-2 p-0 text-primary hover:bg-transparent hover:text-primary-700"
            variant="ghost"
          >
            {t("viewHistory")}
            <ArrowRight size="16" />
          </Button>
        </div>

        <div className="grid w-full flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
          {Object.values(EnumSkill)
            .filter((s) => s !== EnumSkill.allSkills)
            .map((skill) => {
              const skillTest = skillTests.find((st) => st.skill === skill);
              return (
                <button
                  key={`${testName}-${skill}`}
                  onClick={() => {
                    if (skillTest) {
                      setData({
                        skill: skill,
                        test: {
                          id,
                          collectionId,
                          order,
                          testName,
                        },
                      });
                      setOpen(true);
                    }
                  }}
                  className="w-full"
                >
                  <TestSkillCard skill={skill} isSupport={!!skillTest} />
                </button>
              );
            })}{" "}
        </div>
      </div>
    </div>
  );
}

export function SkeletonSimulatedTestCard() {
  return (
    <div className="animate-pulse rounded-2xl border bg-white p-5">
      <div className="mb-4 inline-block h-7 w-52 rounded bg-neutral-50" />
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
        <div className="flex max-w-60 flex-col justify-between gap-4">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2">
              <div className="inline-block h-5 w-10 rounded bg-neutral-50" />
              <div className="inline-block h-5 w-8 rounded bg-neutral-50" />
            </div>
            <Separator orientation="vertical" className="flex h-full min-h-12" />
            <div className="flex flex-col gap-2">
              <div className="inline-block h-5 w-20 rounded bg-neutral-50" />
              <div className="inline-block h-5 w-8 rounded bg-neutral-50" />
            </div>
          </div>
          <div className="size-fit h-5 w-28 gap-2 bg-neutral-50 p-0" />
        </div>
        <div className="grid w-full flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
          {Object.keys(EnumSkill)
            .filter((key) => key !== "allSkills")
            .map(() => (
              <div className="h-24 bg-neutral-50" />
            ))}
        </div>
      </div>
    </div>
  );
}
