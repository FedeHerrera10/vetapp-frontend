import { useState, useEffect, FC } from "react";
import { Search, ChevronRight, User } from "lucide-react";

// Define the Veterinarian type
interface Veterinarian {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
}

// Sample data for veterinarians
const initialVeterinarians: Veterinarian[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Small Animal Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
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

export const Veterinarian: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVets, setFilteredVets] =
    useState<Veterinarian[]>(initialVeterinarians);

  // Filter veterinarians based on search term
  useEffect(() => {
    const results = initialVeterinarians.filter(
      (vet) =>
        vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVets(results);
  }, [searchTerm]);

  // Handle view details click
  const handleViewDetails = (id: number) => {
    alert(`View details for veterinarian with ID: ${id}`);
    // In a real application, this would navigate to a detail page or open a modal
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Veterinarios</h2>

        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o especialidad..."
            className="pl-10 pr-4 py-2 w-full md:w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Veterinarians grid */}
      {filteredVets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVets.map((vet) => (
            <div
              key={vet.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gray-200">
                {vet.imageUrl ? (
                  <img
                    src={vet.imageUrl}
                    alt={vet.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{vet.name}</h3>
                <p className="text-gray-600 mb-4">{vet.specialty}</p>
                <button
                  onClick={() => handleViewDetails(vet.id)}
                  className="flex items-center justify-center w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
                >
                  <span>Ver turnos disponibles</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">
            No veterinarians found matching your search criteria.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};
