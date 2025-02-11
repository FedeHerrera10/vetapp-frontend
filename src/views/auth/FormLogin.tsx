import { useForm } from "react-hook-form";
import { MessageError } from "../../components/ui/MessageError";
import { UserLoginForm } from "../../types";
import { useAuth } from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const FormLogin = () => {
  const initialValues: UserLoginForm = {
    username: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  
  const navigate = useNavigate();
  
  const {login} = useAuth();

  const {mutate} = useMutation({
    mutationFn:(authenticateUser),
    onError:(error)=>{
      toast.error(error.message);
    },
    onSuccess :(data)=>{
      login(data.token);
      toast.success('Usuario Registrado , verifica tu correco electronico');
      navigate('/app');
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="px-3 flex flex-col mt-6 lg:px-10">
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="username">Usuario</label>
      <input
        id="username"
        type="text"
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        placeholder="Usuario"
        {...register("username", {
          required: {
            value: true,
            message: "El usuario es requerido",
          },
          minLength: 4,
          maxLength: 20,
        })}
      />

      <MessageError message={errors?.username?.message?.toString() || null}/>
      
      <label className="text-sm font-semibold text-slate-500 ml-1 mt-5" htmlFor="password">Contraseña</label> 
      <input
        id="password"
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
        type="password"
        placeholder="Contraseña"
        {...register("password", {
          required: {
            value: true,
            message: "La contraseña es requerida",
          },
          minLength: 4,
          maxLength: 20,
        })}
      />
     <MessageError message={errors?.password?.message?.toString() || null}/>
      <button
        className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        type="submit"
      >
        <svg width="24px" height="24px" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5m9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
        </svg>
        <span className="ml-3">Ingresar</span>
      </button>
    </form>
  );
};
