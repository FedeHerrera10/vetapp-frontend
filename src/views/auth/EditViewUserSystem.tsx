import { useLocation, useParams } from "react-router-dom";
import { FormEditSystem } from "../../components/auth/FormEditSystem";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/AuthAPI";
import { Spinner } from "../../components/ui/Spinner";
import FullScreenModal from "../../components/ui/modal";

export const EditViewUserSystem = () => {
  const params = useParams();
  const IdUser = Number(params.id);
  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask =  queryParams.get('backUrl');
    const isBackModal = modalTask ? true : false;

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
      <FullScreenModal isOpen={true} onClose={() => {}} title="Edicion de usuario" isBack={isBackModal}>
        <FormEditSystem data={data} iduser={IdUser} />
      </FullScreenModal>
    );
};
