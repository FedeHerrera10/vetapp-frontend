import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { historiaC } from "@/types/index";
import { HistoriaClinicaTable } from "@/components/ui/historia-clinica/HistoriaClinicaTable";
import { HistoriaClinicaForm } from "@/components/ui/historia-clinica/HistoriaClinicaForm";
import { HistoriaClinicaDetail } from "@/components/ui/historia-clinica/HistoriaClinicaDetail";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import FullScreenModal from "@/components/ui/modal";
import { useAuth } from "@/hooks/UseAuth";

// Datos de ejemplo
const historiasEjemplo: historiaC[] = [
  {
    id: 1,
    mascota: {
      id: 1,
      nombre: "Luna",
    },
    notas: "Revisión general. Estado saludable.",
    tratamientos: "Vacuna anual y desparasitación",
    recetasMedicas: "Antiparasitario oral - 1 comprimido",
    fecha: "2025-03-24",
  },
  {
    id: 2,
    mascota: {
      id: 2,
      nombre: "Max",
    },
    notas: "Presenta cojera en pata trasera derecha",
    tratamientos: "Radiografía y antiinflamatorios",
    recetasMedicas: "Carprofeno 100mg - 1 comprimido cada 12 horas por 5 días",
    fecha: "2025-03-23",
  },
  {
    id: 3,
    mascota: {
      id: 3,
      nombre: "Simba",
    },
    notas: "Control post-operatorio de castración",
    tratamientos: "Limpieza de herida y antibióticos",
    recetasMedicas: "Amoxicilina 250mg - 1 comprimido cada 12 horas por 7 días",
    fecha: "2025-03-22",
  },
];

export function HistoriaClinica() {
  const [search, setSearch] = useState("");
  const [selectedHistoria, setSelectedHistoria] = useState<historiaC | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const { data: user } = useAuth();

  // Usar datos de ejemplo en lugar de la llamada a la API
  const { data: historias = historiasEjemplo } = useQuery({
    queryKey: ["historias-clinicas"],
    queryFn: () => Promise.resolve(historiasEjemplo), // Simular llamada a la API
    enabled: !!user,
    retry: false,
  });

  const filteredHistorias = historias.filter(
    (historia) =>
      historia.mascota.nombre.toLowerCase().includes(search.toLowerCase()) ||
      historia.tratamientos.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewHistoria = (historia: historiaC) => {
    setSelectedHistoria(historia);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHistoria(null);
  };

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    // TODO: Implementar la lógica para guardar la historia clínica
    console.log(data);
    handleCloseFormModal();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Historia Clínica
        </h1>
        <Button onClick={handleOpenFormModal}>Nueva Historia Clínica</Button>
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar historias clínicas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      {/* Tabla */}
      <div className="bg-white shadow rounded-lg dark:bg-gray-800">
        <HistoriaClinicaTable
          historias={filteredHistorias}
          onView={handleViewHistoria}
        />
      </div>

      {/* Modal de Vista */}
      <FullScreenModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Detalle de Historia Clínica"
        isBack={false}
      >
        {selectedHistoria && <HistoriaClinicaDetail historia={selectedHistoria} />}
      </FullScreenModal>

      {/* Modal de Formulario */}
      <FullScreenModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title="Nueva Historia Clínica"
        isBack={false}
      >
        <div className="p-6">
          <HistoriaClinicaForm onSubmit={handleSubmit} />
        </div>
      </FullScreenModal>
    </div>
  );
}
