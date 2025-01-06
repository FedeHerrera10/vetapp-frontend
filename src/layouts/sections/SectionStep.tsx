export const SectionStep = () => {
  return (
    <section className="flex flex-col  justify-center md:flex-row md:gap-20 md:mt-28 xl:mt-40" id="step">
        <h2 className="my-20 md:my-0 text-2xl font-normal text-center  lg:text-3xl xl:text-4xl">¿Como usar nuestro servicio?</h2>
        <div className="w-full md:w-1/2">
        
        <div className="">
            <div className="mb-4">
                <p className="text-lg font-medium text-indigo-500 inline lg:text-xl xl:text-2xl">01</p>
                <h3 className="text-lg font-medium  inline ml-3 lg:text-xl xl:text-2xl">Completa el formuario</h3>
            </div>
            <p className="text-md  text-slate-600 lg:text-lg xl:text-xl">Ingresa en la seccion ingresa, completa los datos del formulario</p>
        </div>

        <div className="mt-8">
            <div className="mb-4">
                <p className="text-lg font-medium text-indigo-500 inline lg:text-xl xl:text-2xl">02</p>
                <h3 className="text-lg font-medium  inline ml-3 lg:text-xl xl:text-2xl">Valida tu cuenta</h3>
            </div>
            <p className="text-md  text-slate-600 lg:text-lg xl:text-xl">Ingresa a tu casilla de correo  donde te enviaremos un codigo para confirmar tu cuenta</p>
        </div>


        <div className="mt-8">
            <div className="mb-4">
                <p className="text-lg font-medium text-indigo-500 inline lg:text-xl xl:text-2xl" >03</p>
                <h3 className="text-lg font-medium  inline ml-3 lg:text-xl xl:text-2xl">Agenda tus turnos</h3>
            </div>
            <p className="text-md  text-slate-600 lg:text-lg  xl:text-xl">Si todos los pasos estan correctos, ya puedes agendar turnos con nuestros profesionales</p>
        </div>
        
        </div>
    </section>
  )
}
