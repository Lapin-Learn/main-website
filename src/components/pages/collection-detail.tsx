import { ArrowRight } from "lucide-react";
import { Button, Separator } from "../ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";
import { AnimatedCircularProgressBar } from "../organisms/circular-progress";
import { useTranslation } from "react-i18next";
import { useLocation } from "@tanstack/react-router";
import { EnumSkill } from "@/lib/enums";
import ReadingIcon from "@/assets/icons/skills/reading";
import ListeningIcon from "@/assets/icons/skills/listening";
import WritingIcon from "@/assets/icons/skills/writing";
import SpeakingIcon from "@/assets/icons/skills/speaking";

const skillIconMap: Record<EnumSkill, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [EnumSkill.allSkills]: ReadingIcon,
  [EnumSkill.reading]: ReadingIcon,
  [EnumSkill.listening]: ListeningIcon,
  [EnumSkill.writing]: WritingIcon,
  [EnumSkill.speaking]: SpeakingIcon,
};

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
            <div className="flex flex-row gap-4 rounded-2xl bg-white p-5">
              <div className="flex max-w-64 flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="truncate text-lg font-bold">
                    Road to IELTS - Test 1 -{" "}
                    <span className="capitalize">{location.search.skill}</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <div className="text-sm text-neutral-200">
                        Band: <span className="text-sm font-semibold text-neutral-950">--</span>
                      </div>
                      <div className="text-sm text-neutral-200">
                        Time Spent:{" "}
                        <span className="text-sm font-semibold text-neutral-950">44:11</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-fit gap-2 px-0" variant="ghost" disabled>
                    Xem lich su
                    <ArrowRight size="16" />
                  </Button>
                </div>
              </div>
              <AnimatedCircularProgressBar
                value={0}
                icon={skillIconMap[location.search.skill as EnumSkill]}
              />
            </div>
          ))}
        </div>
      ) : (
        [1, 2, 3, 4].map(() => (
          <div className="flex flex-row gap-4 rounded-2xl bg-white p-5">
            <div className="flex max-w-40 flex-col gap-5">
              <p className="truncate text-lg font-bold">Road to IELTS - Test 1</p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-neutral-200">Band</span>
                    <span className="text-sm font-semibold">--</span>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-neutral-200">Time Spent</span>
                    <span className="text-sm font-semibold">44:11</span>
                  </div>
                </div>
                <Button className="w-fit gap-2 px-0" variant="ghost" disabled>
                  Xem lich su
                  <ArrowRight size="16" />
                </Button>
              </div>
            </div>
            <div className="flex flex-1 flex-wrap gap-4 xl:flex-nowrap">
              {Object.keys(EnumSkill)
                .filter((key) => key !== "allSkills")
                .map((skill) => (
                  <div
                    key={skill}
                    className="flex w-full flex-row items-center justify-between rounded-lg border border-neutral-100 p-3"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-semibold capitalize">{skill}</span>
                      <div>
                        <div className="text-xs text-neutral-100">Correct Answer:</div>
                        <div className="font-semibold">--/40</div>
                      </div>
                    </div>
                    <AnimatedCircularProgressBar
                      value={0}
                      icon={skillIconMap[skill as EnumSkill]}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
