import { useForm } from "react-hook-form";
import { MessageError } from "../../components/ui/MessageError";
import { UserLoginForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  MESSAGE_PASSWORD_IS_REQUIRED,
  MESSAGE_USER_IS_REQUIRED,
  MESSAGE_PASSWORD_MAX_LENGTH,
  MESSAGE_PASSWORD_MIN_LENGTH,
  MESSAGE_SUCCESS,
} from "../../messages";
import { Spinner } from "../../components/ui/Spinner";
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

  

  const { mutate, status } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(MESSAGE_SUCCESS);
      navigate("/app");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="px-3 flex flex-col mt-6 lg:px-10">
      <label
        className="text-sm font-semibold text-slate-500 ml-1"
        htmlFor="username"
      >
        Usuario
      </label>
      <input
        id="username"
        type="text"
        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        placeholder="Usuario"
        autoComplete="off"
        maxLength={20}
        {...register("username", {
          required: {
            value: true,
            message: MESSAGE_USER_IS_REQUIRED,
          },
        })}
      />

      <MessageError message={errors?.username?.message?.toString() || null} />

      <label
        className="text-sm font-semibold text-slate-500 ml-1 mt-2"
        htmlFor="password"
      >
        Contraseña
      </label>
      <input
        id="password"
        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
        type="password"
        placeholder="Contraseña"
        {...register("password", {
          required: {
            value: true,
            message: MESSAGE_PASSWORD_IS_REQUIRED,
          },
          minLength: { value: 4, message: MESSAGE_PASSWORD_MIN_LENGTH },
          maxLength: { value: 20, message: MESSAGE_PASSWORD_MAX_LENGTH },
        })}
      />
      <MessageError message={errors?.password?.message?.toString() || null} />
      {status === "pending" ? (
        <Spinner />
      ) : (
        <button
          className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          type="submit"
        >
          <svg
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5m9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
          </svg>
          <span className="ml-3">Ingresar</span>
        </button>
      )}
    </form>
  );
};
