import React,{ useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

interface FullScreenModalProps {
  
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  isBack: boolean;
}



const FullScreenModal: React.FC<FullScreenModalProps> = ({ isOpen,onClose, children ,title ,isBack }) => {
const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleToBackUrl = () => {
    setIsVisible(false);
    onClose();
    if(isBack){
      navigate(-1);
    }
  };

  if (!isVisible) return null;

  
if (!open) return null; // No renderizar si está cerrado
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[90] overflow-auto h-screen w-full"
      onClick={() => handleToBackUrl()} // Cierra al hacer clic fuera
    >
      {/* Contenedor del Modal */}
      <div
        className="bg-white w-full max-w-md lg:max-w-xl  md:w-3/4 h-auto max-h-[90vh]  rounded-lg shadow-lg flex flex-col p-6 "
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
          <button
            onClick={() => handleToBackUrl()}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Contenido Dinámico */}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default FullScreenModal;
