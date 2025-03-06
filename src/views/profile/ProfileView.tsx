import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/AuthAPI";
import { Spinner } from "../../components/ui/Spinner";

export const ProfileView = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(),
        retry: 1,
        refetchOnWindowFocus: false,
      });
    
      if (isLoading)
        return (
          <div className="h-[70vh] flex flex-col justify-center items-center w-full">
            <Spinner />
          </div>
        );
    
      if (data)return (
    
    <div className="h-[80vh] w-full flex justify-center items-center">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    
    <div className="flex flex-col items-center pb-10 mt-10">
        
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white capitalize">{data?.name} {data?.lastname}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{data.email}</span>
        <p className="">Estado: {data?.enabled ? "Habilitado" : "Deshabilitado"}</p>
    </div>
</div>
    </div>





  )
}
