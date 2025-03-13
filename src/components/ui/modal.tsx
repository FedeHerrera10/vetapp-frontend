import { X } from "lucide-react";
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
      className="fixed inset-0 dark:bg-gray-900/95 flex justify-center items-center z-[90] overflow-hidden h-screen w-full bg-gray-600/80 "
      onClick={() => handleToBackUrl()} // Cierra al hacer clic fuera
    >
      {/* Contenedor del Modal */}
      <div
        className="bg-white w-full max-w-sm   md:w-3/4 h-auto max-h-[90vh]  rounded-lg shadow-lg flex flex-col 
        dark:bg-gray-800 dark:text-gray-100 sm:max-w-[525px] md:max-w-[650px]"
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
      >
        {/* Header */}
        <div className="flex justify-between items-center  p-6 bg-gray-900 rounded-tl-md rounded-tr-md dark:bg-slate-600">
          <h2 className="text-2xl font-medium  text-slate-200 ">{title}</h2>
          <button
            onClick={() => handleToBackUrl()}
            className="text-slate-200 hover:text-slate-400 text-xl dark:text-slate-200 dark:hover:text-slate-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido Dinámico */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4">{children}</div>
      </div>
    </div>
  );
};

export default FullScreenModal;
