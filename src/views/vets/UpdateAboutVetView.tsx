import { updateAboutVet } from "@/api/VetAPI";
import FullScreenModal from "@/components/ui/modal";
import { FormAboutVet } from "@/components/vets/FormAboutVet";
import { VetAboutSchema } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateAboutVetView = () => {

    const params = useParams();
    const idUser = Number(params.id);

    const navigate = useNavigate(); 

  const { mutate } = useMutation({
    mutationFn: updateAboutVet,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate(-1);
    },
  });

  const initialValues = {
    descripcion: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VetAboutSchema>({
    defaultValues: initialValues,
  });

  watch("descripcion");

  const onSubmit = handleSubmit((data) => {
    mutate({formData: data, idUser});
  });

  return (
    <>
    <FullScreenModal isOpen={true} onClose={() => {}} title="Acerca de mi" isBack={true}>
      <form onSubmit={onSubmit}>
        <FormAboutVet register={register} errors={errors} status={status} />
      </form>
    </FullScreenModal>
    </>
  )
}
