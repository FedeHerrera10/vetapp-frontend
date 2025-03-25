import { MessageError } from "../ui/MessageError";
import { Spinner } from "../ui/Spinner";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { VetAboutSchema } from "@/types/index";

interface PropsFormAboutVet {
  register: UseFormRegister<VetAboutSchema>;
  errors: FieldErrors<VetAboutSchema>;
  status: string;
}
export const FormAboutVet = ({
  register,
  errors,
  status
}: PropsFormAboutVet) => {

  return (<>
        <div className="w-full ">
          <label
            className="text-sm font-medium text-slate-700  dark:text-slate-200"
            htmlFor="descripcion"
          >
           Mi perfil
          </label>
          <textarea
            id="descripcion"
            className="custom-input"
            placeholder="Escriba una un breve perfil de ti..."
            
            {...register("descripcion", {
              required: {
                value: true,
                message: "El perfil es obligatorio"
              }
            })}
          />
          <MessageError
            message={errors?.descripcion?.message?.toString() || null}
          />
        </div>
        {
        status == 'pending' ? (<div className="w-full flex justify-center items-center  md:col-span-2"><Spinner/></div>
          
        ) :
        (
          <button className="max-h-12 mt-8 py-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full  md:col-span-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
        <svg
          className="w-6 h-6 -ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M20 8v6M23 11h-6" />
        </svg>
        <span className="ml-3">Guardar Perfil</span>
      </button>
        )
      }
      </>
  );
};
