import { useForm } from "react-hook-form";
import { RegisterForm } from "../../types";
import { MessageError } from "../../components/ui/MessageError";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MESSAGE_EMAIL_IS_REQUIRED, MESSAGE_LASTNAME_IS_REQUIRED, MESSAGE_LASTNAME_MAX_LENGTH, MESSAGE_LASTNAME_MIN_LENGTH, MESSAGE_NAME_IS_REQUIRED, MESSAGE_NAME_MAX_LENGTH, MESSAGE_NAME_MIN_LENGTH, MESSAGE_PASSWORD_IS_REQUIRED, MESSAGE_PASSWORD_MAX_LENGTH, MESSAGE_PASSWORD_MIN_LENGTH, MESSAGE_PASSWORDS_DO_NOT_MATCH, MESSAGE_SUCCESS, MESSAGE_USERNAME_IS_REQUIRED } from "../../messages";

export const FormRegister = () => {
  
  const initialValues: RegisterForm = {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: ""
  };
  
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: initialValues });
  
  const {mutate} = useMutation({
    mutationFn:(registerUser),
    onError:(error)=>{
      toast.error(error.message);
    },
    onSuccess :()=>{
      toast.success(MESSAGE_SUCCESS);
      navigate('/auth/confirm-account');
    }
  })


  const password = watch("password");

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xs flex flex-col place-content-center px-2 lg:max-w-xl lg:grid grid-cols-2 grid-rows-4 gap-3 "
    >
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="name">Nombre</label>
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
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="lastname">Apellido</label>
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
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="username">Usuario</label>
        <input
          id="username"
          className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Usuario"
          {...register("username", {
            required: {
              value: true,
              message: MESSAGE_USERNAME_IS_REQUIRED
            },
            minLength:4,
            maxLength: 20,
          })}
        />
      <MessageError message={errors?.username?.message?.toString() || null}/>
      </div>
      
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="email">Correo Electronico</label>
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
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="password">Contraseña</label>
        <input
          id="password"
          className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: {
              value: true,
              message: MESSAGE_PASSWORD_IS_REQUIRED,
            },
            minLength:8,
            maxLength: 20,
          })}
        />
       <MessageError message={errors?.password?.message?.toString() || null}/>
      </div>
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="passwordRepeat">Repetir Contraseña</label>
        <input
          id="passwordRepeat"
          className="w-full   px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
          type="password"
          placeholder="Repetir Contraseña"
          {...register("passwordRepeat", {
            required: {
              value: true,
              message: MESSAGE_PASSWORD_IS_REQUIRED
            },
            validate: (value) =>
              value === password || MESSAGE_PASSWORDS_DO_NOT_MATCH,
            minLength: {value: 8, message: MESSAGE_PASSWORD_MIN_LENGTH},
            maxLength: {value: 20, message: MESSAGE_PASSWORD_MAX_LENGTH},
          })}
        />
       <MessageError message={errors?.passwordRepeat?.message?.toString() || null}/>
      </div>
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
        <span className="ml-3">Registrarse</span>
      </button>
    </form>
  );
};
