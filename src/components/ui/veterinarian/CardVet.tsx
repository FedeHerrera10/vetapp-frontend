import { ChevronRight, User } from "lucide-react";
import { CardType } from "@/types/index";
import { useNavigate } from "react-router-dom";
import profile from "@/assets/img/profile.png";

export const CardVet = ({ vet }: CardType) => {
  const navigate = useNavigate();
  // Handle view details click
  const handleViewDetails = (id: number) => {
    navigate(location.pathname + `/${id}`, { state: { veterinarian: vet } });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
        <div className="relative h-48 bg-gray-200 ">
          {vet.name ? (
            <img
              src={vet.imageData}
              alt={vet.name}
              className="w-full h-full object-cover "
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = profile;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <User className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
            {vet.name}
          </h3>
          <p className="text-gray-600 mb-4 dark:text-gray-200">
            {/* {vet.specialty} */}
            Aca va la especialidad
          </p>
          <button
            onClick={() => handleViewDetails(vet.id)}
            className="flex items-center justify-center w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <span>Ver turnos disponibles</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};
