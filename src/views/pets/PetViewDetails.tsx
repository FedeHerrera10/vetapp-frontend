import FullScreenModal from "@/components/ui/modal"
import { PetSchema } from "@/types/index"
import { Fingerprint, Info, Rainbow, Weight } from "lucide-react"

export const PetViewDetails = ({pet, onClose}: {pet: PetSchema, onClose: () => void}) => {
  return (
    <FullScreenModal isOpen={true} title="Informacion Mascota" onClose={onClose} isBack={false}>
        <div className="flex flex-col  gap-10 md:flex-row">
        <div className=" flex items-center justify-center w-full flex-col md:w-1/2">
        <img src={pet?.imagePet} alt="" className=" size-32 border-2 border-gray-400 rounded-full" />
        <p className="mt-3 capitalize font-normal text-sm md:text-md block text-gray-600 dark:text-slate-50">
            {pet.nombre} {"-"} {pet.edad} {"años"} 
        </p>
        
        </div>
        
        <div className="w-full">
          
          <div className="mt-5 flex items-center bg-slate-100 w-full gap-4 rounded-md p-2 dark:bg-slate-600 dark:text-slate-50">
          <Fingerprint className="size-6 ml-4 inline-block text-gray-600 dark:text-slate-50" />
          <p className="text-md font-semibold  w-full capitalize">
            <span className=" font-normal text-sm block text-gray-600 dark:text-slate-50 ">Raza-Especie</span>
            {pet.especie}{" - "}{pet.raza} 
          </p>
          </div>
          <div className="mt-5 flex items-center bg-slate-100 w-full gap-4 rounded-md p-2 dark:bg-slate-600 dark:text-slate-50">
          <Rainbow className="size-6 ml-4 inline-block text-gray-600 dark:text-slate-50" />
          <p className="text-md font-semibold w-full capitalize">
            <span className=" font-normal text-sm block text-gray-600 dark:text-slate-50">Color</span>
            {pet.color}
          </p>
          </div>

          <div className="mt-5 flex items-center bg-slate-100 w-full gap-4 rounded-md p-2 dark:bg-slate-600 dark:text-slate-50">
          <Weight className="size-6 ml-4 inline-block text-gray-600 dark:text-slate-50" />
          <p className="text-md font-semibold capitalize w-full ">  
            <span className=" font-normal text-sm block text-gray-600 dark:text-slate-50">Peso</span>
            {pet.peso}{" kg."}
          </p>
          </div>

          <div className="mt-5 flex items-center bg-slate-100 w-full gap-4 rounded-md p-2 dark:bg-slate-600 dark:text-slate-50">
          <Info  className="size-6 ml-4 inline-block text-gray-600 dark:text-slate-50" />
          <p className="text-md font-semibold  w-full">
            <span className=" font-normal text-sm block text-gray-600 dark:text-slate-50">Oberservaciones</span>
            {pet.caracteristicas}
          </p>
          </div>

          


          
        </div>
        </div>
      </FullScreenModal>
  )
}
