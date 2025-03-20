import { FormRegisterPet } from "@/components/pets/FormRegisterPet";
import FullScreenModal from "@/components/ui/modal";
import { PetRegisterSchema } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPet, updatePet } from "@/api/PetApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UseImageToBase64 } from "@/hooks/UseImageToBase64";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { MESSAGE_PET_EDIT_SUCCESS } from "../../messages";

export const EditPetView = () => {
  const navigate = useNavigate();

  const params = useParams();
  const idMascota = params.id;

  const initialValues: PetRegisterSchema = {
    nombre: "",
    especie: "",
    raza: "",
    edad: 0,
    peso: 0,
    caracteristicas: "",
    color: "",
    imagePet: "",
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pet", idMascota],
    queryFn: () => getPet({ idMascota: Number(idMascota) }),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const {
    base64Image,
    error: errorimage,
    handleImageChange,
  } = UseImageToBase64();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PetRegisterSchema>({ defaultValues: initialValues });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const { mutate, status } = useMutation({
    mutationFn: updatePet,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(MESSAGE_PET_EDIT_SUCCESS);
      navigate(-1);
    },
  });

  if (isLoading) return <Spinner />;

  if (!data || isError) {
    return <Navigate to="/app/pets" replace />;
  }

  const onSubmit = handleSubmit((datapet) => {
    const formdata = datapet;
    formdata.imagePet = base64Image || data.imagePet;
    mutate({ formData: formdata, petId: Number(idMascota) });
  });

  return (
    <FullScreenModal
      isOpen={true} 
      onClose={() => {}}
      title="Agregar Mascota"
      isBack={true}
    >
      <form
        onSubmit={onSubmit}
        className="mx-auto flex flex-col place-content-center  px-2 gap-3"
      >
        <FormRegisterPet
          register={register}
          errors={errors}
          handleImageChange={handleImageChange}
          error={errorimage}
          status={status}
          action="edit"
        />
      </form>
    </FullScreenModal>
  );
};
