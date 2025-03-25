import { AboutVet } from "@/components/vets/AboutVet";
import { Highlighter, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { findAbout } from "@/api/VetAPI";
import { Spinner } from "@/components/ui/Spinner";

type PropsDashboardVets = {
  id: number;
};

export const DashboardVets = ({ id }: PropsDashboardVets) => {

  const { data, isLoading } = useQuery({
    queryKey: ["aboutUser", id],
    queryFn: () => findAbout(id),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if(isLoading) return (
    <div className="h-[70vh] flex flex-col justify-center items-center w-full">
      <Spinner />
    </div>
  );

  return (
    <div className="rounded-xl mt-10 bg-slate-200/40 text-gray-800 p-8 dark:bg-gray-800 dark:text-slate-50">
      <h4 className="text-2xl my-5 font-bold dark:text-slate-100">
        Completa tu perfil
      </h4>
      <div className="bg-gray-50 rounded-xl p-6 mb-6 dark:bg-gray-600 ">
        <div className="">
          {
            data ? 
              <Link
                to={`/app/vets/update-about/${id}`}
                className="bg-indigo-500/80 hover:bg-indigo-600 px-4 py-2 flex rounded-lg items-center transition text-md  w-48 text-white"
              ><Highlighter className="size-6 inline-block mr-2" />
            <span>Actualizar perfil</span>
          </Link> : 
           <Link
           to={`/app/vets/about/${id}`}
           className="bg-indigo-500/80 hover:bg-indigo-600 px-4 py-2 flex rounded-lg items-center transition text-md  w-40 text-white"
         ><Highlighter className="size-6 inline-block mr-2" />
           <span>Acerca de mi</span>
         </Link>
         
        }
          
          <AboutVet data={data} />
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 mb-6 dark:bg-gray-600 ">
        <Link
          to={`/app/vets/add`}
          className="bg-indigo-500/80 hover:bg-indigo-600 px-4 py-2 flex rounded-lg items-center transition text-md  w-72 text-white"
        >
          <Microscope className="size-6 inline-block mr-2" />
          <span>Añadir Especialidad o Titulo</span>
        </Link>
      </div>
    </div>
  );
};
