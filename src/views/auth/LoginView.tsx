import { Link } from "react-router-dom";
import { BrandLink } from "../../components/ui/BrandLink";
import { FormLogin } from "../../components/auth/FormLogin";

export const LoginView = () => {
  return (
    <div className="min-h-screen bg-gray-100  place-content-center p-5 overflow-hidden lg:h-screen">
      <div className=" flex flex-col  justify-center items-stretch  lg:flex-row lg:max-w-screen-lg lg:mx-auto xl:max-w-screen-xl sm:max-w-xl sm:mx-auto">
        <div className="w-full bg-white sm:p-8  max-w-md mx-auto rounded-lg lg:w-1/2 lg:pb-4 lg:max-w-full lg:rounded-none lg:rounded-l-lg p-5">
          <div className="mt-3 lg:mt-6 ">
            <BrandLink />
            <h1 className="dark:text-gray-700 text-center my-5 text-2xl xl:text-3xl font-extrabold">
              Iniciar Sesión
            </h1>
          </div>
          <FormLogin />
          <div className="mt-5">
            <Link
              to="/auth/register"
              className="block text-center  text-gray-500 hover:text-gray-600 text-sm"
            >
              ¿No tienes usuario? Registrate
            </Link>
            <Link
              to="/auth/reset-password"
              className="block text-center mt-3 text-gray-500 hover:text-gray-600 text-sm"
            >
              Recuperar Contraseña
            </Link>
          </div>
        </div>
        <div
          className="hidden lg:inline  w-1/2 bg-slate-200 text-center relative max-h-full bg-contain bg-bottom bg-no-repeat rounded-r-lg"
          style={{ backgroundImage: "url('/img/img-login.png')" }}
        ></div>
      </div>
    </div>
  );
};
