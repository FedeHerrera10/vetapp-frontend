import { getUserById } from "../../api/AuthAPI";
import FullScreenModal from "../../components/ui/modal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";

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
        <div>
          <p className="text-md  capitalize">
            <span className="font-semibold">Apellido: </span>
            {data?.lastname}
          </p>
          <p className="text-md mt-3 capitalize">
            <span className="font-semibold">Nombre: </span>
            {data?.name}
          </p>
          <p className="text-md mt-3">
            <span className="font-semibold">Usuario: </span>
            {data?.username}
          </p>
          <p className="text-md mt-3 ">
            <span className="font-semibold">Email: </span>
            {data?.email}
          </p>
          <p className="text-md mt-3">
            <span className="font-semibold">Rol: </span>
            {data?.roles.map((role: any) => role.name).join(", ")}
          </p>
          <p className="text-md mt-3">
            <span className="font-semibold">Contraseña Expirada: </span>
            {data?.password_expired ? "Si" : "No"}
          </p>
          <p className="text-md mt-3">
            <span className="font-semibold">Habilitado: </span>
            {data?.enabled ? "Si" : "No"}
          </p>
        </div>
      </FullScreenModal>
    );
};
