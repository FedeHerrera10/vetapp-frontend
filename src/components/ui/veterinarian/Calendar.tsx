import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  isSameMonth,
  parseISO,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

import { es } from "date-fns/locale";
import { toCamelCase } from "../../../utils/FormaterString";
import { FC, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  availableDates: string[];
  onSelectDate: (date: string) => void;
  selectedDate: string | null;
}

const Calendar: FC<CalendarProps> = ({
  availableDates,
  onSelectDate,
  selectedDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(new Date());

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setCurrentDay(addMonths(currentDay, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setCurrentDay(subMonths(currentDay, 1));
  };

  const today = currentDay;
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const days = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const dayOfWeekOfFirstDay = getDay(firstDayOfMonth);

  console.log(selectedDate);

  const weekDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

  const isDateAvailable = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return availableDates.includes(dateString);
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return isSameDay(date, parseISO(selectedDate));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200 dark:bg-slate-800 dark:border dark:border-gray-700 sm:p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-2 sm:mb-4 ">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
          {toCamelCase(format(today, "MMMM yyyy", { locale: es }))}
        </h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-center text-indigo-500 hover:text-indigo-700 hover:scale-105 hover:bg-indigo-50 hover:rounded-md transition duration-200 flex items-center dark:text-white dark:hover:text-gray-800"
        >
          <ChevronLeft className="mr-1" /> {/* Icono de izquierda */}
        </button>
        <button
          onClick={handleNextMonth}
          className="text-center text-indigo-500 hover:text-indigo-700 hover:scale-105 hover:bg-indigo-50 hover:rounded-md transition duration-200 flex items-center dark:text-white dark:hover:text-gray-800"
        >
          <ChevronRight className="ml-1" /> {/* Icono de derecha */}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 min-w-[280px]">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-100"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 min-w-[280px]">
        {Array.from({ length: dayOfWeekOfFirstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8 sm:h-10"></div>
        ))}

        {days.map((day) => {
          const isAvailable = isDateAvailable(day);
          const isSelected = isDateSelected(day);

          return (
            <button
              key={day.toString()}
              onClick={() =>
                isAvailable ? onSelectDate(format(day, "yyyy-MM-dd")) : null
              }
              disabled={!isAvailable}
              className={`
                h-8 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm
                ${
                  isToday(day)
                    ? "font-bold text-black bg-green-200 dark:bg-green-800"
                    : ""
                }
                ${!isSameMonth(day, today) ? "text-gray-300" : ""}
                ${
                  isAvailable && !isSelected
                    ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-600 dark:text-indigo-200 dark:hover:bg-gray-700"
                    : ""
                }
                ${isSelected ? "bg-indigo-600 text-white" : ""}
                ${
                  !isAvailable
                    ? "text-gray-400 cursor-not-allowed dark:text-gray-200"
                    : "cursor-pointer"
                }
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
