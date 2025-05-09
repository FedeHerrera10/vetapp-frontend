import { Ban, Calendar, Shield, Pencil, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import { PetSchema } from "../../../types";
import { PetViewDetails } from "../../../views/pets/PetViewDetails";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus } from "@/api/PetApi";
import { toast } from "react-toastify";

export const CardPets = ({ pet }: { pet: PetSchema }) => {
  const[showPet , setIsShowPet] = useState(false)
 
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: changeStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const handleStatus = (status: boolean) => {
    let statusMascota = "disabled";
    if(status) {
      statusMascota = "active";
    } 
    console.log(statusMascota)
    mutate({ formData: statusMascota, petId: pet.id });
  };
  
  const handleOnClick = () => {
    setIsShowPet(!showPet)
  }
  
  return (

    <>
    <div className="bg-gray-50 rounded-xl p-6 mb-6 dark:bg-gray-600 ">
      <div className="flex items-center gap-6 flex-col lg:flex-row">
       {
        pet.imagePet ? (
          <img
            src={pet.imagePet}
            alt={pet.nombre}
            className="size-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        ) : <PawPrint className="size-24 rounded-full border-4 border-white shadow-lg object-cover" />
       }
        <div className="flex-1 flex-col items-center sm:flex-row">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl capitalize font-semibold text-gray-800 dark:text-slate-50 hover:cursor-pointer hover:opacity-80" onClick={handleOnClick}>
              {pet.nombre}
            </h3>
            {
              pet.enabled ? (
               <>
               <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-d">
                  Activo
                </span>
                <Link to={`/app/pets/edit/${pet.id}`}>
                <Pencil className="w-4 h-4 text-gray-900 hover:text-indigo-700 dark:text-slate-50 dark:hover:text-indigo-400" />
              </Link>
              </>
              ) : (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-d">
                  Inactivo
                </span>
              )
            }
            
          </div>
          <p className="text-gray-600 dark:text-slate-50/80 text-md">
            {pet.raza} • {pet.edad} año
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center mt-3">
          <button
          disabled={!pet.enabled ? true : false}
          className="disabled:bg-gray-400 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 dark:text-slate-50">
            <Calendar className="size-4" />
            Turnos
          </button>
          <button 
          disabled={pet.enabled ? true : false}
          className="disabled:bg-gray-400 bg-green-500/80 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          onClick={() => handleStatus(true)}
          >
            <Shield className="size-4" />
            <span>Activar</span>
          </button>
          <button 
          disabled={!pet.enabled ? true : false}
          className="disabled:bg-gray-400 bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 transition text-white" onClick={() => handleStatus(false)}>
            <Ban className="size-4" />
            <span>Desactivar</span>
          </button>
        </div>
      </div>
    </div>
    {showPet && <PetViewDetails pet={pet} onClose={() => setIsShowPet(false)} />}
    </>
  );
};
