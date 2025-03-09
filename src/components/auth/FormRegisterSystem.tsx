import { useForm } from "react-hook-form";
import { RegisterForm } from "../../types";
import { MessageError } from "../../components/ui/MessageError";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MESSAGE_EMAIL_IS_REQUIRED, MESSAGE_LASTNAME_IS_REQUIRED, MESSAGE_LASTNAME_MAX_LENGTH, MESSAGE_LASTNAME_MIN_LENGTH, MESSAGE_NAME_IS_REQUIRED, MESSAGE_NAME_MAX_LENGTH, MESSAGE_NAME_MIN_LENGTH, MESSAGE_USER_REGISTERED, MESSAGE_USERNAME_IS_REQUIRED } from "../../messages";
import { Spinner } from "../../components/ui/Spinner";
import { generarPassword } from "../../utils/GeneratePassword";


export const FormRegisterSystem = () => {
  
 const params = useParams()
  const paramRole =params.role;
  
  let ROLE_ADMIN =false;
  let ROLE_VETERINARY =false;
  let URL_NAVIGATE ='';

  if(paramRole === 'admin') ROLE_ADMIN = true;
  if(paramRole === 'veterinary') ROLE_VETERINARY = true;
  
  URL_NAVIGATE = (ROLE_ADMIN || ROLE_VETERINARY) ? '/app/security' : '/auth/confirm-account';

  const passwordGenerate = generarPassword();
  
  const initialValues: RegisterForm = {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: passwordGenerate,
    passwordRepeat: passwordGenerate,
    admin: ROLE_ADMIN,
    cliente : false,
    veterinario : ROLE_VETERINARY
  };

  const navigate = useNavigate();
  
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: initialValues });
  
  const {mutate,status} = useMutation({
    mutationFn:(registerUser),
    onError:(error)=>{
      toast.error(error.message);
    },
    onSuccess :()=>{
      toast.success(MESSAGE_USER_REGISTERED);
      navigate(URL_NAVIGATE);
    }
  })

  if(!ROLE_ADMIN && !ROLE_VETERINARY) return  <Navigate to="/app/security" />;

  

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xs flex flex-col place-content-center px-2 gap-3"
    >
      <div>
      <label className="text-sm font-medium text-slate-700 ml-1 dark:text-slate-200" htmlFor="name">Nombre</label>
        <input
          id="name"
          className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 dark:border-gray-600 dark:placeholder-slate-200 dark:text-gray-100"
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
      <label className="text-sm font-medium text-slate-700 ml-1 dark:text-slate-200" htmlFor="lastname">Apellido</label>
        <input
          id="lastname"
          className="w-full  px-8 py-3 rounded-lg font-medi um bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 dark:border-gray-600 dark:placeholder-slate-200 dark:text-gray-100"
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
      <label className="text-sm font-medium text-slate-700 ml-1 dark:text-slate-200" htmlFor="username">Usuario</label>
        <input
          id="username"
          className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 dark:border-gray-600 dark:placeholder-slate-200 dark:text-gray-100"
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
      <label className="text-sm font-medium text-slate-700 ml-1 dark:text-slate-200" htmlFor="email">Correo Electronico</label>
        <input
          id="email"
          className="w-full  px-8 py-3 rounded-lg font-medium bg-gray-100  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 dark:border-gray-600 dark:placeholder-slate-200 dark:text-gray-100"
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
        <span className="ml-3">Crear Usuario</span>
      </button>
        )
      }
    </form>
  );
};
