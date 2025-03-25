import { historiaC } from "@/types/index";
import { Cat, Calendar, FileText, Stethoscope, Pill } from "lucide-react";

interface Props {
  historia: historiaC;
}

export const HistoriaClinicaDetail = ({ historia }: Props) => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Cat className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Mascota: {historia.mascota.nombre}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Fecha: {historia.fecha}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h4 className="font-medium text-gray-900 dark:text-white">Notas</h4>
        </div>
        <p className="mt-1 text-gray-600 dark:text-gray-300 pl-7">
          {historia.notas}
        </p>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Stethoscope className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h4 className="font-medium text-gray-900 dark:text-white">
            Tratamientos
          </h4>
        </div>
        <p className="mt-1 text-gray-600 dark:text-gray-300 pl-7">
          {historia.tratamientos}
        </p>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Pill className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h4 className="font-medium text-gray-900 dark:text-white">
            Recetas Médicas
          </h4>
        </div>
        <p className="mt-1 text-gray-600 dark:text-gray-300 pl-7">
          {historia.recetasMedicas}
        </p>
      </div>
    </div>
  );
};
