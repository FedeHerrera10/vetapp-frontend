import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/AuthAPI";
import { Spinner } from "../../components/ui/Spinner";
import { Ban, Pencil, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfileView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    retry: 1,
    // staleTime: Infinity, // No se vuelve a refetch automáticamente
    // gcTime: 8 * 60 * 1000, // Garbage Collection después de 8 minutos
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
      <div className=" w-full bg-slate-100 rounded-2xl shadow-xl overflow-hidden dark:bg-gray-800 dark:text-slate-50">
        {/* Owner Information */}
        <div className="bg-slate-200/40 text-gray-800 p-8 dark:bg-gray-700 dark:text-slate-50">
          <div className="flex flex-col md:flex-row items-center gap-6 ">
            <div className="relative">
             <Link to={`/app/profile/${data.id}/upload-image`}>
             <img
                src={data.imageProfile}
                alt="Owner Profile"
                className="w-24 h-24 rounded-full border-4 border-white/30 object-cover"
              />
             </Link>
              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold capitalize" >{data.lastname}{" "}{data.name}</h1>{" "}
                    <Link to={`/app/security/user/edit/${data.id}?backUrl=1`}>
                      <Pencil className="w-4 h-4 text-gray-900 hover:text-indigo-700 dark:text-slate-50 dark:hover:text-indigo-400" />
                    </Link>
                  </div>
                  <p className="text-gray-600 dark:text-slate-50/80">
                    {data.email}
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-3 mt-4 md:mt-0 ml-5">
                  <button className="bg-green-500/80 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                    <Shield className="w-4 h-4" />
                    <span>Activar Cuenta</span>
                  </button>
                  <button className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 transition text-white">
                    <Ban className="w-4 h-4" />
                    <span>Desactivar Cuenta</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
};
