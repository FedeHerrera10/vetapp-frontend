import { Link } from "react-router-dom";
import { BrandLink } from "../../components/ui/BrandLink";
import ImgLogin from "../../assets/img/img-login.png";
import { FormLogin } from "./FormLogin";

export const LoginView = () => {
  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
      <div className="max-w-screen-md m-6 sm-10 bg-white shadow rounded-lg flex justify-center flex-1 md:max-w-screen-lg xl:max-w-screen-xl">
        <div className="lg:w-1/2 xl:w-5/12 p-12 flex flex-col items-center justify-center">
          <BrandLink />
          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Iniciar Sesión
            </h1>
            <div className="w-full flex-1 mt-8 items-center">
              <div className="mx-auto max-w-xs">
                <FormLogin />
                <div className="">
                  <Link
                    to="/auth/register"
                    className="block text-center mt-5 text-gray-500 hover:text-gray-600 text-sm"
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
            </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-200 text-center hidden lg:flex relative">
          <img
            src={ImgLogin}
            alt="img-login"
            className="h-5/6 object-fill brightness-90 opacity-85 absolute bottom-0 left-0 right-0 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};
