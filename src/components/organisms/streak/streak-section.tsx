import { endOfWeek, format, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import Lottie from "react-lottie";

import flame from "@/assets/lotties/streak-flame.json";
import { useGetStreakHistory } from "@/hooks/react-query/useGamification";
import { cn } from "@/lib/utils";

import DayItem from "./day-item";
import { DayProps, generateCalendar, parseActiveDays } from "./utils";
import WeekHeader from "./week-header";

const StreakSection = () => {
  const [startDay, setStartDay] = useState(new Date());
  const [isCollapsed, setIsCollapsed] = useState(false);

  const changeMonth = (direction: number) => {
    const newDate = new Date(startDay.setMonth(startDay.getMonth() + direction));
    setStartDay(new Date(newDate));
  };
  const originalDays = generateCalendar(startDay);

  const { data: activeDays, isSuccess } = useGetStreakHistory({
    startDate: format(subMonths(startOfMonth(startDay), 1), "yyyy-MM-dd"),
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: flame,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getCurrentWeekDays = (days: DayProps[]) => {
    const startOfWeekDate = startOfWeek(new Date());
    const endOfWeekDate = endOfWeek(new Date());
    return days.filter((day) => day.day >= startOfWeekDate && day.day <= endOfWeekDate);
  };

  const daysToShow = isCollapsed ? getCurrentWeekDays(originalDays) : originalDays;

  const parsedActiveDays = useMemo(
    () =>
      parseActiveDays(
        daysToShow,
        isSuccess && activeDays ? activeDays.map((day) => new Date(day.date)) : []
      ),
    [activeDays, daysToShow, isSuccess]
  );

  return (
    <div className="relative w-96 rounded-md bg-[#E7F4FE] p-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-blue mb-2 text-5xl font-bold">27</h1>
          <h2 className="text-blue text-xl font-semibold">Ngày Streak!</h2>
          <p className="mb-6 mt-1 font-medium">Đây là streak dài nhất bạn đạt được!</p>
        </div>
        <Lottie options={defaultOptions} height={80} width={56} />
      </div>
      <div
        className="flex flex-col gap-2 rounded-sm bg-white p-3 transition-all duration-500"
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <div
          className={cn(
            "flex items-center justify-between overflow-hidden transition-all duration-100",
            isCollapsed ? "max-h-0" : "max-h-8"
          )}
        >
          <button
            className="text-muted-foreground hover:cursor-pointer hover:text-neutral-900"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-md font-semibold">
            {startOfMonth(startDay).toLocaleString("default", { month: "long" })}{" "}
            {startDay.getFullYear()}
          </span>
          <button
            className="text-muted-foreground hover:cursor-pointer hover:text-neutral-900"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <WeekHeader />
        <div className="grid grid-cols-7 justify-between text-center text-sm font-semibold">
          {parsedActiveDays.map((day) => (
            <DayItem
              key={day.key}
              dayNumber={day.day.getDate()}
              position={day.outside ? "outside" : "default"}
              active={day.active}
              today={day.day.toDateString() === new Date().toDateString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default StreakSection;
