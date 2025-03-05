import { useState} from "react";
import { CardVet } from "@/components/ui/veterinarian/CardVet";
import { SearchVet } from "@/components/ui/veterinarian/SearchVet";
import { VetType } from "@/types/index";

// Sample data for veterinarians
const initialVeterinarians: VetType[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Small Animal Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=8",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Surgery",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Cardiology",
    imageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Neurology",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 6,
    name: "Dr. Robert Garcia",
    specialty: "Oncology",
    imageUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 7,
    name: "Dr. Amanda Lee",
    specialty: "Emergency Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 8,
    name: "Dr. David Kim",
    specialty: "Ophthalmology",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
];

export const Veterinarian = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVets, setFilteredVets] =
    useState<VetType[]>(initialVeterinarians);

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
