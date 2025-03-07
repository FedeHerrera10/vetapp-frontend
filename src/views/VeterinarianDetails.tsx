import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AppointmentFormData } from "@/types/index";
import Calendar from "@/components/ui/veterinarian/Calendar";
import { AppointmentModal } from "@/components/ui/veterinarian/AppointmentModal";
import { veterinarian } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

export const VeterinarianDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRequestAppointment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitAppointment = (data: AppointmentFormData) => {
    // In a real app, this would send the data to an API
    console.log("Appointment requested:", data);
    alert(`Appointment requested for ${data.date} with ${veterinarian.name}`);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center mb-4 sm:mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span className="dark:text-white dark:hover:text-gray-300">
            Volver
          </span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm  border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src={veterinarian.imageUrl}
              alt={veterinarian.name}
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-indigo-100"
            />
          </div>

          <div className="md:w-2/3 md:pl-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 dark:text-white">
              {veterinarian.name}
            </h1>
            <p className="text-indigo-600 font-medium mb-4 dark:text-indigo-400">
              {veterinarian.specialty}
            </p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2 dark:text-white">
                About
              </h2>
              <p className="text-gray-600 text-sm sm:text-base dark:text-white">
                Dr. Johnson is a dedicated veterinarian with over 10 years of
                experience in small animal medicine. She specializes in
                preventive care, internal medicine, and geriatric pet care.
              </p>
            </div>

            <button
              onClick={handleRequestAppointment}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Request Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-4 dark:text-white">
          Disponibilidad
        </h2>
        <p className="text-gray-600 mb-4 text-sm sm:text-base dark:text-white">
          Selecciona una fecha para solicitar un turno a {veterinarian.name}.
        </p>

        <Calendar
          availableDates={veterinarian.availability}
          onSelectDate={handleDateSelect}
          selectedDate={selectedDate}
        />
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAppointment}
        selectedDate={selectedDate}
        veterinarianName={veterinarian.name}
      />
    </>
  );
};
