import { useState } from "react";
import { ServicesTable } from "@/components/ui/services/ServicesTable";
import { ServicesForm } from "@/components/ui/services/ServicesForm";
import { Search, Plus } from "lucide-react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/api/ServicesApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ServiciosObject } from "../types";

export const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<
    ServiciosObject | undefined
  >();
  const queryClient = useQueryClient();

  // Fetch services query
  const { data: services, isLoading } = useQuery({
    queryKey: ["ser"],
    queryFn: getServices,
    retry: false,
    refetchOnMount: true,
  });

  // Create service mutation
  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ser"] });
      toast.success("Servicio creado exitosamente");
      handleCloseForm();
    },
    onError: () => {
      toast.error("Error al crear el servicio");
    },
  });

  // Update service mutation
  const { mutate: updateServiceMutation } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ServiciosObject }) =>
      updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ser"] });
      toast.success("Servicio actualizado exitosamente");
      handleCloseForm();
    },
    onError: () => {
      toast.error("Error al actualizar el servicio");
    },
  });

  // Delete service mutation
  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ser"] });
      toast.success("Servicio eliminado exitosamente");
    },
    onError: () => {
      toast.error("Error al eliminar el servicio");
    },
  });

  // Filter services based on search term
  const filteredServices = services?.filter(
    (service: ServiciosObject) =>
      service.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (data: ServiciosObject) => {
    if (selectedService) {
      updateServiceMutation({ id: selectedService.id, data });
    } else {
      createMutation.mutate(data as Omit<ServiciosObject, "id">);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Está seguro que desea eliminar este servicio?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (service: ServiciosObject) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedService(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
          Nuevo Servicio
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <ServicesTable
          services={filteredServices || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isFormOpen && (
        <ServicesForm
          service={selectedService}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isFormOpen={isFormOpen}
        />
      )}
    </div>
  );
};
