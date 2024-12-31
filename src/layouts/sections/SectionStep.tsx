export const SectionStep = () => {
  return (
    <section className="flex flex-col p-4 justify-center md:flex-row gap-20" id="step">
        <h2 className="text-2xl font-normal text-center mb-5 lg:text-3xl">¿Como usar nuestro servicio?</h2>
        
        <div className="w-full md:w-1/2">
        
        <div className="mt-8 md:mt-0">
            <div className="mb-4">
                <p className="text-lg font-medium text-indigo-500 inline lg:text-xl">01</p>
                <h3 className="text-lg font-medium  inline ml-3 lg:text-xl">Completa el formuario</h3>
            </div>
            <p className="text-md  text-slate-600 lg:text-lg">Ingresa en la seccion ingresa, completa los datos del formulario</p>
        </div>

        <div className="mt-8">
            <div className="mb-4">
                <p className="text-lg font-medium text-indigo-500 inline lg:text-xl">02</p>
                <h3 className="text-lg font-medium  inline ml-3 lg:text-xl">Valida tu cuenta</h3>
            </div>
            <p className="text-md  text-slate-600 lg:text-lg">Ingresa a tu casilla de correo  donde te enviaremos un codigo para confirmar tu cuenta</p>
        </div>


        <div className="mt-8">
            <div className="mb-4">
                <p className="text-lg font-medium text-indigo-500 inline lg:text-xl" >03</p>
                <h3 className="text-lg font-medium  inline ml-3 lg:text-xl">Agenda tus turnos</h3>
            </div>
            <p className="text-md  text-slate-600 lg:text-lg ">Si todos los pasos estan correctos, ya puedes agendar turnos con nuestros profesionales</p>
        </div>
        
        </div>
    </section>
  )
}
