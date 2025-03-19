import { isBefore, parseISO, startOfDay, subDays, format } from "date-fns";
import { HorariosType } from "../types";



// Generate next 30 days for availability
export const generateAvailableDays = (fechas: string[]) => {
  const today = startOfDay(new Date()); // Establecer hoy a medianoche

  const availableDays = fechas.filter((fecha) => {
    const date = startOfDay(new Date(fecha)); // Establecer la fecha a medianoche
    return date.getDay() !== 5 && !isBefore(date, subDays(today, 1)); // Excluir domingos y fechas anteriores
  });

  return availableDays;
};

export const transformAvailableSlots = (horarios: HorariosType) => {
  return horarios.map(horario => {
      const hour = parseISO(`${horario.fecha}T${horario.horaInicio}:00`); // Crear un objeto Date
      const formattedHour = format(hour, "hh:mm a"); // Formato "hh:mm AM/PM"
      return {
          horaInicio: horario.horaInicio,
          label: formattedHour // "10:00 AM", "11:00 AM", etc.
      };
  });
};