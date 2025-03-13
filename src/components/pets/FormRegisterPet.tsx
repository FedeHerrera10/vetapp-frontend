import { PetRegisterSchema } from "@/types/index";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MessageError } from "../ui/MessageError";
import {
  MESSAGE_ESPECIE_IS_REQUIRED,
  MESSAGE_NAME_IS_REQUIRED,
  MESSAGE_NAME_MAX_LENGTH,
  MESSAGE_NAME_MIN_LENGTH,
} from "../../messages";
import { UserPlus } from "lucide-react";
import { Spinner } from "../ui/Spinner";

type PropsFormRegisterPet = {
  register: UseFormRegister<PetRegisterSchema>;
  errors: FieldErrors<PetRegisterSchema>;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  status: string;
  action: string;
};

export const FormRegisterPet = ({
  register,
  errors,
  handleImageChange,
  error,
  status,
  action,
}: PropsFormRegisterPet) => {
  return (
    <>
      <div className="mb-3 flex flex-col sm:flex-row gap-3 justify-between  ">
        <div className="w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-slate-700  dark:text-slate-200"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            id="nombre"
            className="custom-input"
            type="text"
            placeholder="Nombre"
            {...register("nombre", {
              required: {
                value: true,
                message: MESSAGE_NAME_IS_REQUIRED,
              },
              minLength: { value: 4, message: MESSAGE_NAME_MIN_LENGTH },
              maxLength: { value: 50, message: MESSAGE_NAME_MAX_LENGTH },
            })}
          />
          <MessageError message={errors?.nombre?.message?.toString() || null} />
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-slate-700  dark:text-slate-200"
            htmlFor="especie"
          >
            Especie
          </label>
          <input
            id="especie"
            className="custom-input"
            type="text"
            placeholder="Especie"
            {...register("especie", {
              required: {
                value: true,
                message: MESSAGE_ESPECIE_IS_REQUIRED,
              },
              minLength: { value: 4, message: MESSAGE_NAME_MIN_LENGTH },
              maxLength: { value: 50, message: MESSAGE_NAME_MAX_LENGTH },
            })}
          />
          <MessageError
            message={errors?.especie?.message?.toString() || null}
          />
        </div>
      </div>

      <div className="mb-3 flex flex-col sm:flex-row gap-3 justify-between  ">
        <div className="w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-slate-700  dark:text-slate-200"
            htmlFor="raza"
          >
            Raza
          </label>
          <input
            id="raza"
            className="custom-input"
            type="text"
            placeholder="Raza"
            {...register("raza")}
          />
          <MessageError message={errors?.raza?.message?.toString() || null} />
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-slate-700  dark:text-slate-200"
            htmlFor="edad"
          >
            Edad
          </label>
          <input
            id="edad"
            className="custom-input"
            type="number"
            placeholder="Edad"
            {...register("edad")}
          />
          <MessageError message={errors?.edad?.message?.toString() || null} />
        </div>
      </div>
      <div className="mb-3 flex flex-col sm:flex-row gap-3 justify-between  ">
        <div className="w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-slate-700  dark:text-slate-200"
            htmlFor="peso"
          >
            Peso
          </label>
          <input
            id="peso"
            className="custom-input"
            type="text"
            placeholder="Peso"
            {...register("peso")}
          />
          <MessageError message={errors?.edad?.message?.toString() || null} />
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-slate-700  dark:text-slate-200"
            htmlFor="color"
          >
            Color
          </label>
          <input
            id="color"
            className="custom-input"
            type="text"
            placeholder="Color"
            {...register("color")}
          />
          <MessageError message={errors?.edad?.message?.toString() || null} />
        </div>
      </div>
      <div className="w-full">
        <label
          className="text-sm font-medium text-slate-700  dark:text-slate-200"
          htmlFor="caracteristicas"
        >
          Observaciones
        </label>
        <input
          id="caracteristicas"
          className="custom-input"
          type="text"
          placeholder="Características"
          {...register("caracteristicas")}
        />
        <MessageError message={error?.toString() || null} />
      </div>
      <div className="w-full">
        <label
          className="text-sm font-medium text-slate-700  dark:text-slate-200 mb-4"
          htmlFor="imagePet"
        >
          Foto de la mascota
        </label>
        <input
          id="imagePet"
          className="py-[9px] w-full  px-8  rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 dark:border-gray-600 dark:placeholder-slate-200 dark:text-gray-100
 "
          type="file"
          accept="image/jpeg, image/png, image/gif, image/webp"
          onChange={(e) => handleImageChange(e)}
          placeholder="Imagen de la mascota"
        />
        <MessageError message={error?.toString() || null} />
      </div>
      {status == "pending" ? (
        <div className="w-full flex justify-center items-center  md:col-span-2">
          <Spinner />
        </div>
      ) : (
        <button className="custom-buttom" type="submit">
          <UserPlus className="size-6 mx-2 inline-block" />
          {action === "add" ? "Registrar" : "Actualizar"}
        </button>
      )}
    </>
  );
};
