import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { historiaC } from "@/types/index";
import { HistoriaClinicaTable } from "@/components/ui/historia-clinica/HistoriaClinicaTable";
import { HistoriaClinicaForm } from "@/components/ui/historia-clinica/HistoriaClinicaForm";
import { HistoriaClinicaDetail } from "@/components/ui/historia-clinica/HistoriaClinicaDetail";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FullScreenModal from "@/components/ui/modal";
import { useAuth } from "@/hooks/UseAuth";
import { getAllHistoriasClinicas } from "@/api/HistoriaClinicaApi";

export function HistoriaClinica() {
  const [search, setSearch] = useState("");
  const [selectedHistoria, setSelectedHistoria] = useState<historiaC | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const { data: user } = useAuth();

  // Usar datos de ejemplo en lugar de la llamada a la API
  const { data: historias } = useQuery({
    queryKey: ["historiaClinica"],
    queryFn: () => getAllHistoriasClinicas(user!), // Simular llamada a la API
    enabled: !!user,
    refetchOnMount: true, // Asegurar que se ejecute al montar el componente
    retry: false,
  });

  const filteredHistorias = historias?.filter(
    (historia) =>
      historia.mascota.nombre.toLowerCase().includes(search.toLowerCase()) ||
      historia.tratamientos.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewHistoria = (historia: historiaC | undefined) => {
    setSelectedHistoria(historia || null);
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
          historias={filteredHistorias || []}
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
        {selectedHistoria && (
          <HistoriaClinicaDetail historia={selectedHistoria} />
        )}
      </FullScreenModal>

      {/* Modal de Formulario */}
      <FullScreenModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title="Nueva Historia Clínica"
        isBack={false}
      >
        <div className="p-6">
          <HistoriaClinicaForm onClose={handleCloseFormModal} user={user} />
        </div>
      </FullScreenModal>
    </div>
  );
}
