import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

import { Appointment } from "../types";
import { TurnoModal } from "@/components/ui/TurnoModal";
import { es } from "date-fns/locale";
import { toCamelCase } from "../utils/FormaterString";
import { useQuery } from "@tanstack/react-query";
import { getAllTurnos } from "@/api/TurnoApi";
import { useAuth } from "@/hooks/UseAuth";
import { parseISO } from "date-fns";

export function Turnos() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useState<Appointment | null>(null);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getDayAppointments = (date: Date) => {
    return turnos?.filter((turno) => isSameDay(date, parseISO(turno.fecha)));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const { data: user } = useAuth();

  const { data: turnos } = useQuery({
    queryKey: ["turnos"],
    queryFn: () => getAllTurnos(user!),
    enabled: !!user,
    staleTime: 0, // Forzar refresco inmediato
    refetchOnMount: true, // Asegurar que se ejecute al montar el componente
    retry: false,
  });

  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 p-4 dark:text-white">
        Turnos pendientes
      </h1>

      <div className="bg-white rounded-xl shadow-xl relative dark:bg-gray-800 dark:text-gray-100 ">
        {/* Calendar Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {toCamelCase(format(currentDate, "MMMM yyyy", { locale: es }))}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 "
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 "
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
          {["Lun", "Mar", "Mier", "Jue", "Vie", "Sab", "Dom"].map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-100"
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayAppointments = getDayAppointments(day) || [];
            const hasAppointments = dayAppointments.length > 0;

            return (
              <div
                key={day.toString()}
                onClick={() => handleDayClick(day)}
                className={`
                bg-white min-h-[120px] p-2 relative cursor-pointer hover:bg-gray-50 transition-colors dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-gray-100
                ${
                  !isSameMonth(day, currentDate) &&
                  "bg-gray-50 text-gray-500 dark:bg-gray-700 dark:text-gray-100 "
                }
                ${hasAppointments && "hover:bg-blue-50"}
              `}
              >
                <div
                  className={`
                  font-medium text-sm
                  ${hasAppointments && "text-blue-600 dark:text-blue-300"}
                `}
                >
                  {format(day, "d")}
                </div>
                <div className="mt-2">
                  {dayAppointments.slice(0, 2).map((apt) => (
                    <div
                      key={apt.id}
                      className="text-xs mb-1 p-1 rounded bg-blue-100 text-blue-700 truncate dark:bg-blue-500 dark:text-gray-100"
                    >
                      {apt.horario} - {apt.mascotaNombre}
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-100">
                      +{dayAppointments.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Day Popup */}
        {selectedDate && (
          <TurnoModal
            date={selectedDate}
            appointments={getDayAppointments(selectedDate) || []}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
}
