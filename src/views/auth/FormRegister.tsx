import { useForm } from "react-hook-form";
import { RegisterForm } from "../../types";
import { MessageError } from "../../components/ui/MessageError";

export const FormRegister = () => {
  const initialValues: RegisterForm = {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: initialValues });

  const password = watch("password");

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
          className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Nombre"
          {...register("name", {
            required: {
              value: true,
              message: "El nombre es requerido",
            },
            maxLength: 50,
          })}
        />
        <MessageError message={errors?.name?.message?.toString() || null}/>
      </div>
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="lastname">Apellido</label>
        <input
          id="lastname"
          className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
          type="text"
          placeholder="Apellido"
          {...register("lastname", {
            required: {
              value: true,
              message: "El apellido es requerido",
            },
            maxLength: 50,
          })}
        />
        <MessageError message={errors?.lastname?.message?.toString() || null}/>
      </div>
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="username">Usuario</label>
        <input
          id="username"
          className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Usuario"
          {...register("username", {
            required: {
              value: true,
              message: "El usuario es requerido",
            },
            maxLength: 20,
          })}
        />
      <MessageError message={errors?.username?.message?.toString() || null}/>
      </div>
      
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="email">Correo Electronico</label>
        <input
          id="email"
          className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Correo Electronico"
          {...register("email", {
            required: {
              value: true,
              message: "El email es requerido",
            },
          })}
        />
        <MessageError message={errors?.email?.message?.toString() || null}/>
      </div>
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="password">Contraseña</label>
        <input
          id="password"
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: {
              value: true,
              message: "El password es requerido",
            },
            maxLength: 20,
          })}
        />
       <MessageError message={errors?.password?.message?.toString() || null}/>
      </div>
      <div>
      <label className="text-sm font-semibold text-slate-500 ml-1" htmlFor="passwordRepeat">Repetir Contraseña</label>
        <input
          id="passwordRepeat"
          className="w-full   px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
          type="password"
          placeholder="Repetir Contraseña"
          {...register("passwordRepeat", {
            required: {
              value: true,
              message: "El password es requerido",
            },
            validate: (value) =>
              value === password || "Los Passwords no son iguales",
            maxLength: 20,
          })}
        />
       <MessageError message={errors?.passwordRepeat?.message?.toString() || null}/>
      </div>
      <button className="max-h-14 mt-8 py-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full md:row-span-4 md:col-span-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
        <svg
          className="w-6 h-6 -ml-2"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
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
