import { ArrowRight, Loader2 } from "lucide-react";
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

export default function CollectionPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("navigation.practice")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Road to IELTS</BreadcrumbPage>
          </BreadcrumbItem>
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
                  description
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 rounded-2xl bg-white p-5">
        <div className="flex flex-col gap-5">
          <p className="text-lg font-bold">Test</p>
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
            <Button className="w-fit gap-2 px-0" variant="ghost">
              Xem lich su
              <ArrowRight size="16" />
            </Button>
          </div>
        </div>
        <div className="flex flex-1 gap-4">
          <div className="flex w-full flex-row items-center justify-between rounded-lg border border-neutral-100 px-3">
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold">Listening</span>
              <div>
                <div className="text-xs text-neutral-100">Correct Answer:</div>
                <div className="font-semibold">--/40</div>
              </div>
            </div>
            <div>
              <AnimatedCircularProgressBar value={75} />
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between rounded-lg border border-neutral-100 px-3">
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold">Listening</span>
              <div>
                <div className="text-xs text-neutral-100">Correct Answer:</div>
                <div className="font-semibold">--/40</div>
              </div>
            </div>
            <div>
              <AnimatedCircularProgressBar value={75} />
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between rounded-lg border border-neutral-100 px-3">
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold">Listening</span>
              <div>
                <div className="text-xs text-neutral-100">Correct Answer:</div>
                <div className="font-semibold">--/40</div>
              </div>
            </div>
            <div>
              <AnimatedCircularProgressBar value={75} />
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between rounded-lg border border-neutral-100 px-3">
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold">Listening</span>
              <div>
                <div className="text-xs text-neutral-100">Correct Answer:</div>
                <div className="font-semibold">--/40</div>
              </div>
            </div>
            <div>
              <AnimatedCircularProgressBar value={75} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
