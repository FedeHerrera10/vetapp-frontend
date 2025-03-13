import { getUserById } from "../../api/AuthAPI";
import FullScreenModal from "../../components/ui/modal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { BookUser, Contact, Key, Mail } from "lucide-react";

export const UserDetailView = () => {
  const params = useParams();
  const IdUser = Number(params.id);

  const { data, isLoading } = useQuery({
    queryKey: ["user", IdUser],
    queryFn: () => getUserById(IdUser),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center w-full">
        <Spinner />
      </div>
    );

  if (data)
    return (
      <FullScreenModal isOpen={true} title="Informacion del usuario" onClose={() => {}} isBack={true}>
        <div className="flex flex-col  gap-10 md:flex-row">
        <div className=" flex items-center justify-center w-full flex-col md:w-1/2">
        <img src={data?.imageProfile} alt="" className=" size-32 border-2 border-gray-400 rounded-full" />
        <p className="mt-3 capitalize font-normal text-sm md:text-md block text-gray-600 dark:text-slate-50">
            {data?.lastname} {" "}{data?.name}
        </p>
        {
          (data.enabled) ? (
            <span className="mt-3 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Activada</span>
          ) : (
            <span className="mt-3 bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">Inactiva</span>
          )
        }
        </div>
        
        <div className="w-full">
          
          <div className="mt-5 flex items-center bg-slate-100 w-full gap-4 rounded-md p-2 dark:bg-slate-600 dark:text-slate-50">
          <Contact className="size-6 ml-4 inline-block text-gray-600 dark:text-slate-50" />
          <p className="text-md font-semibold  w-full">
            <span className=" font-normal text-sm block text-gray-600 dark:text-slate-50">Usuario</span>
            {data?.username}
          </p>
          </div>
          <div className="mt-5 flex items-center bg-slate-100 w-full gap-4 rounded-md p-2 dark:bg-slate-600 dark:text-slate-50">
          <Mail className="size-6 ml-4 inline-block text-gray-600 dark:text-slate-50" />
          <p className="text-md font-semibold w-full">
            <span className=" font-normal text-sm block text-gray-600 dark:text-slate-50">Email</span>
            {data?.email}
          </p>
          </div>

          <div className="mt-5 flex items-center bg-slate-100 w-full gap-4 rounded-md p-2 dark:bg-slate-600 dark:text-slate-50">
          <BookUser className="size-6 ml-4 inline-block text-gray-600 dark:text-slate-50" />
          <p className="text-md font-semibold capitalize w-full">
            <span className=" font-normal text-sm block text-gray-600 dark:text-slate-50">Rol</span>
            {data?.roles.map((role: any) => role.name).join(", ")}
          </p>
          </div>

          <div className="mt-5 flex items-center bg-slate-100 w-full gap-4 rounded-md p-2 dark:bg-slate-600 dark:text-slate-50">
          <Key className="size-6 ml-4 inline-block text-gray-600 dark:text-slate-50" />
          <p className="text-md font-semibold capitalize w-full">
            <span className=" font-normal text-sm block text-gray-600 dark:text-slate-50">Contraseña Expirada</span>
            {data?.password_expired ? "Si" : "No"}
          </p>
          </div>

          


          
        </div>
        </div>
      </FullScreenModal>
    );
};
