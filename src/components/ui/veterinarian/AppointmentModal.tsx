import { useForm } from "react-hook-form";
import { AppointmentFormData, DataApi } from "@/types/index";
import { format, parseISO } from "date-fns";
import FullScreenModal from "../modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getHorariosDisponibles,
  getMascotas,
  getServicios,
} from "@/api/VetApi";
import { useAuth } from "@/hooks/UseAuth";
import { transformAvailableSlots } from "@/data/mockData";
import { createTurno } from "@/api/TurnoApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Set the app element for accessibility
// Modal.setAppElement("#root");

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
  veterinarianName: string;
  veterinarianId: number;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  veterinarianName,
  veterinarianId,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      fecha: selectedDate || undefined,
      horario: "",
      mascota: 0,
      servicio: 0,
      veterinario: veterinarianId,
    },
    mode: "onBlur", // Validar al perder el foco
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createTurnoMutation } = useMutation({
    mutationFn: createTurno,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vetModal", [veterinarianId]],
      });
      queryClient.invalidateQueries({ queryKey: ["vetModalMascotas"] });
      queryClient.invalidateQueries({ queryKey: ["vetModalServicios"] });
      toast.success("Turno creado exitosamente");
      reset();
      onClose();
      navigate("/app/turnos");
    },
    onError: (error) => {
      toast.error("Error al crear el turno");
      console.error("Error:", error);
    },
  });

  function Submit(data: AppointmentFormData) {
    if (!selectedDate) {
      toast.error("Debe seleccionar una fecha");
      return;
    }

    data.fecha = selectedDate;
    const { mascota, servicio, veterinario, ...rest } = data;
    const dataApi: DataApi = {
      ...rest,
      mascota: { id: Number(mascota) },
      servicio: { id: Number(servicio) },
      veterinario: { id: Number(veterinario) },
    };

    createTurnoMutation(dataApi);
  }

  const { data: user } = useAuth();
  const formattedDate = selectedDate
    ? format(parseISO(selectedDate), "MMMM d, yyyy")
    : "No date selected";

  const { data: horarios } = useQuery({
    queryKey: ["vetModal", [veterinarianId]],
    queryFn: () =>
      getHorariosDisponibles({ id: veterinarianId, fecha: selectedDate || "" }),
    enabled: isOpen,
    retry: false,
  });

  const { data: mascotas } = useQuery({
    queryKey: ["vetModalMascotas"],
    queryFn: () => getMascotas(user.id),
    enabled: isOpen,
    retry: false,
  });

  const { data: servicios } = useQuery({
    queryKey: ["vetModalServicios"],
    queryFn: () => getServicios(),
    enabled: isOpen,
    retry: false,
  });

  return (
    <FullScreenModal
      isOpen={isOpen}
      title="Request Appointment"
      isBack={false}
      onClose={onClose}
    >
      <div className="px-6 py-4">
        <div className="mb-6 bg-indigo-50 p-4 rounded-lg dark:bg-gray-600">
          <p className="text-gray-700 mb-2 dark:text-white">
            <span className="font-medium text-indigo-700 dark:text-indigo-300">
              Veterinarian:
            </span>{" "}
            {veterinarianName}
          </p>
          <p className="text-gray-700 dark:text-white">
            <span className="font-medium text-indigo-700 dark:text-indigo-300">
              Date:
            </span>{" "}
            {formattedDate}
          </p>
        </div>

        <form onSubmit={handleSubmit(Submit)}>
          <div className="mb-4 ">
            <label htmlFor="time" className="block mb-2">
              Seleccionar Horario:
            </label>
            <select
              id="time"
              {...register("horario", {
                required: "Selecciona un horario",
                validate: (value) => {
                  if (!value) return "El horario es requerido";
                  return true;
                },
              })}
              className={`w-full dark:bg-gray-600 dark:text-white dark:border-gray-300 px-3 py-2 border rounded-md ${
                errors.horario ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione un horario</option>
              {transformAvailableSlots(horarios || []).map((t, index) => (
                <option key={index} value={t.horaInicio}>
                  {t.label}
                </option>
              ))}
            </select>
            {errors.horario && (
              <p className="text-red-500">{errors.horario.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="pet" className="block mb-2">
              Seleccionar Mascota:
            </label>
            <select
              id="pet"
              {...register("mascota", {
                required: "Selecciona una mascota",
                validate: (value) => {
                  if (!value || value === 0)
                    return "Debe seleccionar una mascota";
                  return true;
                },
              })}
              className={`w-full dark:bg-gray-600 dark:text-white dark:border-gray-300 px-3 py-2 border rounded-md ${
                errors.mascota ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione una mascota</option>
              {mascotas?.map((pet, index) => (
                <option key={index} value={pet.id}>
                  {pet.nombre}
                </option>
              ))}
            </select>
            {errors.mascota && (
              <p className="text-red-500">{errors.mascota.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="service" className="block mb-2">
              Seleccionar Servicio:
            </label>
            <select
              id="service"
              {...register("servicio", {
                required: "Selecciona un servicio",
                validate: (value) => {
                  if (!value || value === 0)
                    return "Debe seleccionar un servicio";
                  return true;
                },
              })}
              className={`w-full dark:bg-gray-600 dark:text-white dark:border-gray-300 px-3 py-2 border rounded-md ${
                errors.servicio ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione un servicio</option>
              {servicios?.map((service, index) => (
                <option key={index} value={service.id}>
                  {service.nombre}
                </option>
              ))}
            </select>
            {errors.servicio && (
              <p className="text-red-500">{errors.servicio.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6  bg-white py-4 border-t border-gray-200 dark:bg-gray-800 dark:border-white-800">
            <button
              type="submit"
              disabled={!selectedDate}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white w-full sm:w-auto ${
                !selectedDate
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 transition-colors"
              }`}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </FullScreenModal>
  );
};
