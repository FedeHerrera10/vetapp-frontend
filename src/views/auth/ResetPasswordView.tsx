import { Link } from "react-router-dom";
import { BrandLink } from "../../components/ui/BrandLink";
export const ResetPasswordView = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col place-content-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className=" w-full p-6 bg-white rounded-lg shadow dark:border mt-5 sm:max-w-md  sm:p-8">
          <BrandLink />
          <h2 className="mt-8 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Cambiar Contraseña
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <input
              className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="text"
              placeholder="Usuario"
            />
            <input
              className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              type="password"
              placeholder="Contraseña"
            />
            <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <svg
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10V7a5 5 0 1 1 10 0v3h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h2zm2 0h6V7a3 3 0 0 0-6 0v3zm-4 2v8h14v-8H5zm7 2a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1z" />
              </svg>
              <span className="ml-3">Cambiar Contraseña</span>
            </button>
          </form>
        </div>
        <div className="">
        <Link
            to="/auth/login"
            className="block text-center mt-3 text-gray-500 hover:text-gray-600 text-sm"
          >
            ¿Tienes usuario? Inicia Sesión
          </Link>
          <Link
            to="/auth/register"
            className="block text-center mt-5 text-gray-500 hover:text-gray-600 text-sm"
          >
            ¿No tienes usuario? Registrate
          </Link>
          
        </div>
      </div>
    </section>
  );
};
