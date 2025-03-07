import { useForm } from "react-hook-form";
import {  UserUpdateSchema } from "../../types";
import { MessageError } from "../ui/MessageError";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MESSAGE_EMAIL_IS_REQUIRED, MESSAGE_LASTNAME_IS_REQUIRED, MESSAGE_LASTNAME_MAX_LENGTH, MESSAGE_LASTNAME_MIN_LENGTH, MESSAGE_NAME_IS_REQUIRED, MESSAGE_NAME_MAX_LENGTH, MESSAGE_NAME_MIN_LENGTH } from "../../messages";
import { Spinner } from "../ui/Spinner";


export const FormEditSystem = ({data,iduser} : {data : UserUpdateSchema, iduser : number}) => {
  

const navigate = useNavigate();
  
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateSchema>({ defaultValues: data });
  
  const {mutate,status} = useMutation({
    mutationFn:(editUser),
    onError:(error)=>{
      toast.error(error.message);
    },
    onSuccess :(data)=>{
      toast.success(data);
      navigate('/app/security');
    }
  })


  

  const onSubmit = handleSubmit((dataUpdate : UserUpdateSchema) => {
    const data = {
      formData:dataUpdate,
      id:iduser
    }
    mutate(data);
  });

  if(data)
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xs flex flex-col place-content-center px-2 gap-3"
    >
      <div>
      <label className="text-sm font-medium text-slate-700 ml-1" htmlFor="name">Nombre</label>
        <input
          id="name"
          className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Nombre"
          {...register("name", {
            required: {
              value: true,
              message: MESSAGE_NAME_IS_REQUIRED
            },
            minLength: {value: 4, message: MESSAGE_NAME_MIN_LENGTH},
            maxLength: {value: 50, message: MESSAGE_NAME_MAX_LENGTH},
          })}
        />
        <MessageError message={errors?.name?.message?.toString() || null}/>
      </div>
      <div>
      <label className="text-sm font-medium text-slate-700 ml-1" htmlFor="lastname">Apellido</label>
        <input
          id="lastname"
          className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
          type="text"
          placeholder="Apellido"
          {...register("lastname", {
            required: {
              value: true,
              message: MESSAGE_LASTNAME_IS_REQUIRED
            },
            minLength:{value: 4, message: MESSAGE_LASTNAME_MIN_LENGTH},
            maxLength: {value: 50, message: MESSAGE_LASTNAME_MAX_LENGTH},
          })}
        />
        <MessageError message={errors?.lastname?.message?.toString() || null}/>
      </div>
      <div>
      <label className="text-sm font-medium text-slate-700 ml-1" htmlFor="email">Correo Electronico</label>
        <input
          id="email"
          className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Correo Electronico"
          {...register("email", {
            required: {
              value: true,
              message: MESSAGE_EMAIL_IS_REQUIRED
            },
          })}
        />
        <MessageError message={errors?.email?.message?.toString() || null}/>
      </div>
      <div className="flex items-center mb-4">
    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  {...register("enabled")}/>
    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Habilitar</label>
</div>
      {
        status == 'pending' ? (<div className="w-full flex justify-center items-center  md:col-span-2"><Spinner/></div>
          
        ) :
        (
          <button className="max-h-12 mt-4 py-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full  md:col-span-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
        <svg
          className="w-6 h-6 -ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M20 8v6M23 11h-6" />
        </svg>
        <span className="ml-3">Actualizar datos</span>
      </button>
        )
      }
    </form>
  );
};
