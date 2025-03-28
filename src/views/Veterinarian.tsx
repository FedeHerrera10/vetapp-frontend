import { useEffect, useState } from "react";
import { CardVet } from "@/components/ui/veterinarian/CardVet";
import { SearchVet } from "@/components/ui/veterinarian/SearchVet";
import { VeterinarianType, VetType } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { listVeterinarios } from "@/api/VetApi";

export const Veterinarian = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [initialVeterinarians, setInitialVeterinarians] =
    useState<VeterinarianType>([]);
  const [filteredVets, setFilteredVets] =
    useState<VetType[]>(initialVeterinarians);

  const {
    data: vets,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["listVeterinarian"],
    queryFn: listVeterinarios,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setInitialVeterinarians(vets || []);
    }
  }, [isSuccess, vets, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2 ">
      {/* Search */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
          Veterinarios
        </h2>
        <SearchVet
          initialVeterinarians={initialVeterinarians}
          setFilteredVets={setFilteredVets}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Veterinarians grid */}
      {filteredVets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVets.map((vet) => (
            <CardVet key={vet.id} vet={vet} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No veterinarios encontrados.</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </div>
  );
};
