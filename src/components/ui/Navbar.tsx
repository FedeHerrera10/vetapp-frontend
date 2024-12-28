export const Navbar = () => {
  const handleClick = () => {
    const el = document.querySelector("#navbar-hamburger");
    el?.classList.toggle("hidden");
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:justify-evenly">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            className="h-10"
            fill="#000000"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>cat_statues</title>{" "}
              <path d="M22.002 17.448c0.897-0.978 1.75-1.889 1.885-3.28 0-0.121 0.171-0.26 0.157-0.386l-1.068-2.508c-2.271-1.072-4.209-2.562-6.453-3.545-0.171 0.179-0.48 0.354-0.516 0.574-0.153 0.924-0.969 1.234-1.597 1.413-0.449 0.13-0.897 0.337-1.346 0.449-2.54 0.534-4.595 1.898-6.412 3.693-0.449 0.449-0.736 1.055-1.153 1.557-1.070 1.329-1.737 3.023-1.795 4.869l-0 0.013c-0.139 2.459-0.193 4.936-0.193 7.404 0 0.103 0 0.206 0 0.301v3.998h11.442v-9.791l1.571-2.32c0.118 0.664 0.37 1.254 0.727 1.764l-0.009-0.014c0.085 0.283 0.090 0.637-0.067 0.642-0.009 0.176-0.014 0.382-0.014 0.59 0 0.558 0.036 1.107 0.106 1.646l-0.007-0.064c0.022 1.431 0.628 2.796 0.399 4.236 0.006 0.223 0.050 0.433 0.126 0.628l-0.004-0.013c0.157 1.023 0.785 1.795 1.216 2.692h3.361v-1.261c-0.328-1.185-1.494-0.857-2.051-1.656 0.256-2.136-0.368-4.424 0.368-6.623-0.224-0.947 0.301-1.795 0.386-2.715 0.083-0.88 0.425-1.668 0.948-2.3l-0.006 0.007z"></path>{" "}
              <path d="M28.49 7.527c-0.26 0.26-0.417 0.359-0.489 0.498-0.307 0.667-0.969 1.121-1.738 1.121-0.112 0-0.222-0.010-0.329-0.028l0.011 0.002c-1.229-0.112-2.387 0.027-3.231 1.162l-5.887-3.321c1.189-2.087 2.437-3.877 4.788-4.344 0.817-0.758 0.713-1.988 1.638-2.598 0.072-0.045 0.211 0 0.323 0 0.247 0.224 0.058 0.529 0.139 0.781 0.274 0.862 0.287 1.701 1.579 2.042 2.203 0.624 2.894 2.562 3.195 4.685zM25.726 5.108c-0.031 0.749 0.583 1.203 1.032 0.942-0.036-0.175-0.063-0.772-0.094-0.942z"></path>{" "}
            </g>
          </svg>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            VetApp
          </span>
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
          <ul className="flex flex-col font-medium mt-4 rounded-lg  w-full dark:bg-gray-800 dark:border-gray-700 md:flex-row md:mt-0 md:justify-end">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
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