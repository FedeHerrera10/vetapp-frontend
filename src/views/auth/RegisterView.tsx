import { Link } from "react-router-dom";
import { BrandLink } from "../../components/ui/BrandLink";
import ImgRegister from "../../assets/img/img-register.png";
import { FormRegister } from "./FormRegister";
export const RegisterView = () => {
  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex justify-center items-center  ">
      <div className="max-w-screen-md m-6 sm-10  bg-white shadow rounded-lg flex justify-center flex-1 md:max-w-screen-lg xl:max-w-screen-xl">
        <div className="lg:w-1/2 xl:w-5/12 p-12  flex-col items-center justify-center hidden lg:flex bg-slate-200 relative">
          <img
            src={ImgRegister}
            alt="img-login"
            className="max-h-full opacity-85  absolute -bottom-1 left-0 right-0 mx-auto"
          />
        </div>
        <div className="mt-8 flex flex-1">
          <div className="w-full  mt-8 place-content-center">
            <BrandLink />
            <h1 className="mt-8 text-2xl text-center  xl:text-3xl font-extrabold">
              Registrate
            </h1>
            <FormRegister />
            <div className="my-4">
              <Link
                to="/auth/login"
                className="block text-center mt-5 text-gray-500 hover:text-gray-600 text-sm"
              >
                ¿Tienes usuario? Inicia Sesión
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
  );
};
