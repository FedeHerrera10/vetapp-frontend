import BrandIcon from '../../assets/img/brand.svg';

export const Navbar = () => {
  const handleClick = () => {
    const el = document.querySelector("#navbar-hamburger");
    el?.classList.toggle("hidden");
  };

  return (
    <nav className="border-gray-200 bg-gray-50">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4 md:justify-evenly">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={BrandIcon} alt='brand-icon' className='size-8'/>
          <p className='self-center text-2xl font-semibold whitespace-nowrap'>
          Vet<span className='text-indigo-500'>App</span>
          </p>
        </a>
        <button
          onClick={() => handleClick()}
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:flex md:w-3/4" id="navbar-hamburger">
          <ul className="flex flex-col font-medium mt-4 rounded-lg  w-full  md:flex-row md:mt-0 md:justify-end">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-indigo-500 hover:text-white"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#servicios"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-indigo-500 hover:text-white"
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#step"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-indigo-500 hover:text-white"
              >
                ¿Como me registro?
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-indigo-500 hover:text-white"
              >
                Ingresar
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
