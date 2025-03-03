import { Link } from "react-router-dom";
import { BrandLink } from "../../components/ui/BrandLink";
import { FormRegister } from "../../components/auth/FormRegister";
export const RegisterView = () => {
  return (
    <div className="min-h-screen  place-content-center lg:p-5 ">
          <div className=" flex flex-col justify-center items-stretch  p-3 lg:flex-row lg:max-w-screen-lg lg:mx-auto xl:max-w-screen-xl ">
          <div
              className="hidden lg:inline  w-1/2 bg-slate-200 text-center relative max-h-full    bg-contain bg-bottom bg-no-repeat rounded-l-lg"
              style={{ backgroundImage: "url('/img/img-register.png')" }}
            ></div>
            <div className="w-full bg-white p-7 max-w-md mx-auto rounded-lg lg:w-1/2 lg:pb-4 lg:max-w-full lg:rounded-none lg:rounded-r-lg ">
              <div className="mt-3">
                <BrandLink />
                <h1 className=" text-center my-5 text-2xl xl:text-3xl font-extrabold">
                  Registración
                </h1>
              </div>
              <FormRegister />
              <div className="mt-5 lg:mt-0">
                <Link
                  to="/auth/login"
                  className="block text-center  text-gray-500 hover:text-gray-600 text-sm"
                >
                  ¿Ya tienes usuario? Inicia Sesión
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
  );
};
