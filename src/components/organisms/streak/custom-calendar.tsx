import { endOfWeek, format, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { useGetStreakHistory } from "@/hooks/react-query/useGamification";
import { cn } from "@/lib/utils";

import DayItem from "./day-item";
import { DayProps, generateCalendar, getFreezeDays, parseActiveDays } from "./utils";
import WeekHeader from "./week-header";

const CustomCalendar = () => {
  const [startDay, setStartDay] = useState(new Date());
  const [isCollapsed, setIsCollapsed] = useState(true);

  const changeMonth = (direction: number) => {
    const newDate = new Date(startDay.setMonth(startDay.getMonth() + direction));
    setStartDay(new Date(newDate));
  };
  const originalDays = generateCalendar(startDay);

  const { data: activeDays, isSuccess } = useGetStreakHistory({
    startDate: format(subMonths(startOfMonth(startDay), 1), "yyyy-MM-dd"),
  });

  const daysToShow = isCollapsed ? getCurrentWeekDays(originalDays) : originalDays;

  const { parsedActiveDays, freezeDays } = useMemo(
    () => ({
      parsedActiveDays: parseActiveDays(
        daysToShow,
        isSuccess && activeDays ? activeDays.map((day) => new Date(day.date)) : []
      ),
      freezeDays: getFreezeDays(activeDays || []),
    }),
    [activeDays, daysToShow, isSuccess]
  );

  return (
    <div
      className="flex flex-col gap-2 rounded-lg bg-white p-3 transition-all duration-500"
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => {
        setIsCollapsed(true);
        setStartDay(new Date());
      }}
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
            freeze={freezeDays.includes(day.day.toDateString())}
          />
        ))}
      </div>
    </div>
  );
};
export default CustomCalendar;

const getCurrentWeekDays = (days: DayProps[]) => {
  const startOfWeekDate = startOfWeek(new Date());
  const endOfWeekDate = endOfWeek(new Date());
  return days.filter((day) => day.day >= startOfWeekDate && day.day <= endOfWeekDate);
};
