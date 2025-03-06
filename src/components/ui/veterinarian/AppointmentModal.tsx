import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { AppointmentFormData } from "@/types/index";
import { format, parseISO } from "date-fns";

// Set the app element for accessibility
Modal.setAppElement("#root");

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AppointmentFormData) => void;
  selectedDate: string | null;
  veterinarianName: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  veterinarianName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      date: selectedDate || "",
      symptoms: "",
    },
  });

  const formattedDate = selectedDate
    ? format(parseISO(selectedDate), "MMMM d, yyyy")
    : "No date selected";

  console.log(formattedDate);
  // Ejemplos de datos para los select
  const times = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM"];
  const pets = ["Perro", "Gato", "Loro"];
  const services = ["Consulta", "Vacunación", "Revisión"];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-lg w-full mx-auto my-8 bg-white rounded-lg shadow-xl outline-none overflow-auto max-h-[90vh] sm:max-h-[80vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      style={{
        content: {
          maxWidth: "90%",
          width: "100%",
        },
      }}
    >
      <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Request Appointment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-2">
            <span className="font-medium text-indigo-700">Veterinarian:</span>{" "}
            {veterinarianName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-indigo-700">Date:</span>{" "}
            {formattedDate}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            {...register("date", { required: "Please select a date" })}
            value={selectedDate || ""}
          />

          <div className="mb-4">
            <label htmlFor="time" className="block mb-2">
              Seleccionar Horario:
            </label>
            <select
              id="time"
              {...register("time", { required: "Selecciona un horario" })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione un horario</option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="text-red-500">{errors.time.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="pet" className="block mb-2">
              Seleccionar Mascota:
            </label>
            <select
              id="pet"
              {...register("pet", { required: "Selecciona una mascota" })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.pet ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione una mascota</option>
              {pets.map((pet, index) => (
                <option key={index} value={pet}>
                  {pet}
                </option>
              ))}
            </select>
            {errors.pet && <p className="text-red-500">{errors.pet.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="service" className="block mb-2">
              Seleccionar Servicio:
            </label>
            <select
              id="service"
              {...register("service", { required: "Selecciona un servicio" })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.service ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione un servicio</option>
              {services.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-red-500">{errors.service.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6 sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedDate}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white w-full sm:w-auto ${
                !selectedDate
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 transition-colors"
              }`}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
