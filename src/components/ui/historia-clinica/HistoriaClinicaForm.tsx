import { historiaC } from "@/types/index";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getPets } from "@/api/PetApi";
import { useAuth } from "@/hooks/UseAuth";
import { PetType } from "@/types";

interface FormInputs {
  notas: string;
  tratamientos: string;
  recetasMedicas: string;
  mascotaId: number;
}

interface Props {
  onSubmit: (data: FormInputs) => void;
  initialData?: historiaC;
}

export const HistoriaClinicaForm = ({ onSubmit, initialData }: Props) => {
  const { data: user } = useAuth();
  
  const { data: mascotas = [] } = useQuery<PetType[]>({
    queryKey: ["mascotas"],
    queryFn: () => getPets(user!),
    enabled: !!user,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      mascotaId: initialData?.mascota.id || 0,
      notas: initialData?.notas || "",
      tratamientos: initialData?.tratamientos || "",
      recetasMedicas: initialData?.recetasMedicas || "",
    },
  });

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
          {...register("mascotaId", { 
            required: "Debe seleccionar una mascota",
            valueAsNumber: true,
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Seleccione una mascota</option>
          {mascotas.map((mascota: PetType) => (
            <option key={mascota.id} value={mascota.id}>
              {mascota.nombre}
            </option>
          ))}
        </select>
        {errors.mascotaId && (
          <p className="mt-1 text-sm text-red-600">{errors.mascotaId.message}</p>
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
          <p className="mt-1 text-sm text-red-600">{errors.tratamientos.message}</p>
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
          {...register("recetasMedicas", { required: "Este campo es requerido" })}
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
