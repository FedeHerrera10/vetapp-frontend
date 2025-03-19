import { FormRegisterPet } from "@/components/pets/FormRegisterPet";
import FullScreenModal from "@/components/ui/modal";
import { PetRegisterSchema } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerPet } from "@/api/PetApi";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/UseAuth";
import { UseImageToBase64 } from "@/hooks/UseImageToBase64";

export const RegisterPetView = () => {
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

  const navigate = useNavigate();
  const { data } = useAuth();

  const {
    base64Image,
    error: errorimage,
    handleImageChange,
  } = UseImageToBase64();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetRegisterSchema>({ defaultValues: initialValues });

  const { mutate, status } = useMutation({
    mutationFn: registerPet,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("");
      navigate(-1);
    },
  });

  if (!data) return <Navigate to="/auth/login" />;

  const onSubmit = handleSubmit((datapet) => {
    const formdata = datapet;
    formdata.imagePet = base64Image;
    mutate({ formData: formdata, userid: data.id });
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
          action="add"
        />
      </form>
    </FullScreenModal>
  );
};
