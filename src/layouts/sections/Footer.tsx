import BrandIcon from '../../assets/img/brand.svg';
const date = new Date();

export const Footer = () => {
  return (
<footer className=" m-4 mt-20 lg:mt-32">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={BrandIcon} alt='brand-icon' className='size-8'/>
                <p className='self-center text-2xl font-semibold whitespace-nowrap'>
                    Vet<span className='text-indigo-500'>App</span>
                </p>
            </a>
            <ul className="flex flex-wrap items-center my-10 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#inicio" className="hover:underline me-4 md:me-6">Inicio</a>
                </li>
                <li>
                    <a href="#servicios" className="hover:underline me-4 md:me-6">Servicios</a>
                </li>
                <li>
                    <a href="#step" className="hover:underline me-4 md:me-6">¿Como me registro?</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Ingresar</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {date.getFullYear()} VetApp. Todos los derechos reservados.</span>
    </div>
</footer>


  )
}
