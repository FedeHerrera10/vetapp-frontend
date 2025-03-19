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
import { UserPlus } from "lucide-react";


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
    veterinario : ROLE_VETERINARY,
    imageProfile: "",
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
      className="mx-auto flex flex-col place-content-center  px-2 gap-3"
    >
      <div className="mb-3 flex flex-col sm:flex-row gap-3 justify-between  ">
      <div className="w-full sm:w-1/2">
      <label className="text-sm font-medium text-slate-700  dark:text-slate-200" htmlFor="name">Nombre</label>
        <input
          id="name"
          className="custom-input"
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
      <div className="w-full sm:w-1/2">
      <label className="text-sm font-medium text-slate-700  dark:text-slate-200" htmlFor="lastname">Apellido</label>
        <input
          id="lastname"
          className="custom-input"
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
      </div>


      
     <div className="mb-3 flex flex-col sm:flex-row gap-3 justify-between  ">
     <div className="w-full sm:w-1/2">
      <label className="text-sm font-medium text-slate-700  dark:text-slate-200" htmlFor="username">Usuario</label>
        <input
          id="username"
          className="custom-input"
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
      
      <div className="w-full sm:w-1/2">
      <label className="text-sm font-medium text-slate-700  dark:text-slate-200" htmlFor="email">Correo Electronico</label>
        <input
          id="email"
          className="custom-input"
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
     </div>
        
      {
        status == 'pending' ? (<div className="w-full flex justify-center items-center  md:col-span-2"><Spinner/></div>
          
        ) :
        (
          <button className="custom-buttom">
            <UserPlus className="size-6 mx-2 inline-block" />
            Registrar
          </button>
        )
      }
    </form>
  );
};
