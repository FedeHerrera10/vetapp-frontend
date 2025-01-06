import ImgHero from '../../assets/img/hero.png';

export const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center' id="inicio">
      <div className='flex flex-col justify-center items-center bg-indigo-400 lg:flex-row lg:justify-between lg:items-start rounded-xl '>
        <div className='lg:w-2/5 p-6 my-3 leading-snug flex flex-col'>
        <h1 className='text-3xl font-bold text-slate-50 md:text-5xl'> <span className='text-zinc-900'>En VetApp</span> , agenda tu turno y dale a tu mascota la atención que necesita.</h1>
        <p className='mt-5 text-slate-50 md:text-lg md:mt-10 lg:mt-16'>Profesionales en cuidado animal con servicios personalizados.
        Atendemos emergencias, consultas, vacunación y mucho más
        </p>
        <button className='hidden lg:block p-2 max-w-[200px] mt-10 bg-zinc-900 rounded-full text-slate-50 hover:bg-zinc-800 transition-colors lg:mt-16'>Reservar Turno</button>
        </div>
        
        <img src={ImgHero} alt='img-hero' className='h-60  lg:w-3/5 lg:h-screen object-contain xl:h-[80vh]'/>
      </div>
      <button className=' block lg:hidden p-2 w-full max-w-sm mx auto mt-2 bg-zinc-900 rounded-full text-slate-50 hover:bg-zinc-800 transition-colors'>Reservar Turno</button>
    </div>
  )
}
