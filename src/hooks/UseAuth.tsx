import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/AuthAPI";

export const useAuth = ()=>{
    const { data, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        // staleTime: 1000 * 60 * 5, // 5 minutos sin refetch automático
        // gcTime: 1000 * 60 * 10, // Cacheado en memoria por 10 minutos
        retry: 1,
    });
    return {data,isError,isLoading};
}
