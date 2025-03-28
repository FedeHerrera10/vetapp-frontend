import { ServiciosObject } from "@/types/index";
import { useForm } from "react-hook-form";
import FullScreenModal from "../modal";

interface Props {
  service?: ServiciosObject;
  onSubmit: (data: ServiciosObject) => void;
  onClose: () => void;
  isFormOpen: boolean;
}

export const ServicesForm = ({
  service,
  onSubmit,
  onClose,
  isFormOpen,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiciosObject>({
    defaultValues: service || {
      nombre: "",
      descripcion: "",
    },
  });

  return (
    <FullScreenModal
      isOpen={isFormOpen}
      onClose={onClose}
      title={service ? "Editar Servicio" : "Nuevo Servicio"}
      isBack={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              {...register("nombre", { required: "El nombre es requerido" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 bg-gray-100 border-2 p-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows={3}
              {...register("descripcion", {
                required: "La descripción es requerida",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 border-2 p-2 bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.descripcion && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.descripcion.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {service ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </FullScreenModal>
  );
};
