import { Appointment } from "@/types/index";
import { format } from "date-fns";
import { Clock, MapPin, User, AlertCircle } from "lucide-react";
import FullScreenModal from "./modal";
import { toCamelCase } from "../../utils/FormaterString";
import { es } from "date-fns/locale";

interface DayPopupProps {
  date: Date;
  appointments: Appointment[];
  isOpen: boolean;
  onClose: () => void;
}

export const TurnoModal = ({
  date,
  appointments,
  isOpen,
  onClose,
}: DayPopupProps) => {
  return (
    <>
      <FullScreenModal
        isOpen={isOpen}
        title="Turnos"
        isBack={false}
        onClose={onClose}
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            {toCamelCase(format(date, "EEEE, MMMM d, yyyy", { locale: es }))}
          </h3>
          {appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-lg border border-gray-200 p-3  hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {apt.servicioNombre}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 flex items-center dark:text-gray-100">
                    <Clock className="w-4 h-4 mr-1" />
                    {apt.horario}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 flex items-center dark:text-gray-100">
                    <MapPin className="w-4 h-4 mr-1" />
                    Veterinario: {apt.veterinarioNombre}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 flex items-center dark:text-gray-100">
                    <User className="w-4 h-4 mr-1" />
                    Mascota: {apt.mascotaNombre}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 flex items-center dark:text-gray-100">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Estado: {apt.estado}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No hay turnos programados para este día.
            </p>
          )}
        </div>
      </FullScreenModal>
    </>
  );
};
