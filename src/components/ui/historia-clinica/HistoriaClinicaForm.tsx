import { createHC, FormInputs } from "@/types/index";
import { useForm } from "react-hook-form";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getMascotas } from "@/api/VetApi";
import { formatISO, format } from "date-fns";
import { createHistoriaClinica } from "@/api/HistoriaClinicaApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
  user;
}

export const HistoriaClinicaForm = ({ onClose, user }: Props) => {
  const queryClient = useQueryClient();

  const { data: mascotas } = useQuery({
    queryKey: ["vetModalMascotas"],
    queryFn: () => getMascotas(null),
    enabled: !!user,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      mascota: 0,
      notas: "",
      tratamientos: "",
      recetasMedicas: "",
    },
  });

  const navigate = useNavigate();

  const { mutate: createHC } = useMutation({
    mutationFn: createHistoriaClinica,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["historiaClinica"],
      });
      toast.success("Historia clinica creada exitosamente");
      reset();
      onClose();
      navigate("/app/historias-clinicas");
    },
    onError: (error) => {
      toast.error("Error al crear la historia clinica");
      console.error("Error:", error);
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const dataForm: createHC = {
      ...data,
      fecha: formatISO(new Date(), { representation: "date" }),
      horario: format(new Date(), "HH:mm"),
      veterinario: { id: user.id },
      mascota: { id: data.mascota },
    };
    createHC(dataForm);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="mascotaId"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Mascota
        </label>
        <select
          {...register("mascota", {
            required: "Debe seleccionar una mascota",
            valueAsNumber: true,
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Seleccione una mascota</option>
          {mascotas?.map((mascota) => (
            <option key={mascota.id} value={mascota.id}>
              {mascota.nombre}
            </option>
          ))}
        </select>
        {errors.mascota && (
          <p className="mt-1 text-sm text-red-600">{errors.mascota.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="notas"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Notas
        </label>
        <textarea
          {...register("notas", { required: "Este campo es requerido" })}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2"
        />
        {errors.notas && (
          <p className="mt-1 text-sm text-red-600">{errors.notas.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="tratamientos"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Tratamientos
        </label>
        <textarea
          {...register("tratamientos", { required: "Este campo es requerido" })}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2"
        />
        {errors.tratamientos && (
          <p className="mt-1 text-sm text-red-600">
            {errors.tratamientos.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="recetasMedicas"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Recetas Médicas
        </label>
        <textarea
          {...register("recetasMedicas", {
            required: "Este campo es requerido",
          })}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2"
        />
        {errors.recetasMedicas && (
          <p className="mt-1 text-sm text-red-600">
            {errors.recetasMedicas.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};
