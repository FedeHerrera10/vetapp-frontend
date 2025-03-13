import { useForm } from "react-hook-form";
import { UserUpdateSchema } from "../../types";
import { MessageError } from "../ui/MessageError";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  MESSAGE_EMAIL_IS_REQUIRED,
  MESSAGE_LASTNAME_IS_REQUIRED,
  MESSAGE_LASTNAME_MAX_LENGTH,
  MESSAGE_LASTNAME_MIN_LENGTH,
  MESSAGE_NAME_IS_REQUIRED,
  MESSAGE_NAME_MAX_LENGTH,
  MESSAGE_NAME_MIN_LENGTH,
} from "../../messages";
import { Spinner } from "../ui/Spinner";
import { UserRoundCheck } from "lucide-react";

export const FormEditSystem = ({
  data,
  iduser,
}: {
  data: UserUpdateSchema;
  iduser: number;
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateSchema>({ defaultValues: data });

  const { mutate, status } = useMutation({
    mutationFn: editUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate(-1);
    },
  });

  const onSubmit = handleSubmit((dataUpdate: UserUpdateSchema) => {
    const data = {
      formData: dataUpdate,
      id: iduser,
    };
    mutate(data);
  });

  if (data)
    return (
      <form
        onSubmit={onSubmit}
        className="mx-auto flex flex-col place-content-center px-2 gap-3"
      >
        <div className="mb-3 flex flex-col sm:flex-row gap-3 justify-between  ">
          <div className="w-full sm:w-1/2">
            <label
              className="text-sm font-medium text-slate-700 ml-1 dark:text-slate-200"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              id="name"
              className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 dark:border-gray-600 dark:placeholder-slate-200 dark:text-gray-100"
              type="text"
              placeholder="Nombre"
              {...register("name", {
                required: {
                  value: true,
                  message: MESSAGE_NAME_IS_REQUIRED,
                },
                minLength: { value: 4, message: MESSAGE_NAME_MIN_LENGTH },
                maxLength: { value: 50, message: MESSAGE_NAME_MAX_LENGTH },
              })}
            />
            <MessageError message={errors?.name?.message?.toString() || null} />
          </div>
          <div className="w-full sm:w-1/2">
            <label
              className="text-sm font-medium text-slate-700 dark:text-slate-200 ml-1"
              htmlFor="lastname"
            >
              Apellido
            </label>
            <input
              id="lastname"
              className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 dark:border-gray-600 dark:placeholder-slate-200 dark:text-gray-100"
              type="text"
              placeholder="Apellido"
              {...register("lastname", {
                required: {
                  value: true,
                  message: MESSAGE_LASTNAME_IS_REQUIRED,
                },
                minLength: { value: 4, message: MESSAGE_LASTNAME_MIN_LENGTH },
                maxLength: { value: 50, message: MESSAGE_LASTNAME_MAX_LENGTH },
              })}
            />
            <MessageError
              message={errors?.lastname?.message?.toString() || null}
            />
          </div>
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700 dark:text-slate-200 ml-1"
            htmlFor="email"
          >
            Correo Electronico
          </label>
          <input
            id="email"
            className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 dark:border-gray-600 dark:placeholder-slate-200 dark:text-gray-100"
            type="email"
            placeholder="Correo Electronico"
            {...register("email", {
              required: {
                value: true,
                message: MESSAGE_EMAIL_IS_REQUIRED,
              },
            })}
          />
          <MessageError message={errors?.email?.message?.toString() || null} />
        </div>
        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none focus:outline-none"
            {...register("enabled")}
            disabled={true}
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900  dark:text-slate-200 "
          >
            Habilitar
          </label>
        </div>
        {status == "pending" ? (
          <div className="w-full flex justify-center items-center  md:col-span-2">
            <Spinner />
          </div>
        ) : (
          <button className="custom-buttom">
            <UserRoundCheck className="size-6 mx-2 inline-block" />
            Actualizar
          </button>
        )}
      </form>
    );
};
