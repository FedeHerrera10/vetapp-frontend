import { useEffect, FC } from "react";
import { Search } from "lucide-react";
import { SeachType } from "@/types/index";

export const SearchVet: FC<SeachType> = ({
  initialVeterinarians,
  setFilteredVets,
  searchTerm,
  setSearchTerm,
}) => {
  // Filter veterinarians based on search term
  useEffect(() => {
    const results = initialVeterinarians.filter(
      (vet) =>
        vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVets(results);
  }, [searchTerm]);

  return (
    <>
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o especialidad..."
          className="pl-10 pr-4 py-2 w-full md:w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:border-gray-600 dark:bg-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
};
