import ImgHero from '../../assets/img/hero.png';

export const Hero = () => {
  return (
    <div className='p-4 flex flex-col items-center justify-center' id="inicio">
    
    <div className='flex flex-col justify-center items-center bg-indigo-400 md:flex-row md:justify-between md:items-start rounded-xl '>
        <div className='md:w-2/5 p-6 my-3 leading-snug flex flex-col'>
        <h1 className='text-3xl font-bold text-slate-50 md:text-5xl'> <span className='text-zinc-900'>En VetApp</span> , agenda tu turno y dale a tu mascota la atención que necesita.</h1>
        <p className='mt-5 text-slate-50 md:text-lg md:mt-10 lg:mt-16'>Profesionales en cuidado animal con servicios personalizados.
        Atendemos emergencias, consultas, vacunación y mucho más
        </p>
        <button className='hidden md:block p-2 max-w-[200px] mt-10 bg-zinc-900 rounded-full text-slate-50 hover:bg-zinc-800 transition-colors lg:mt-16'>Reservar Turno</button>
        </div>
        
        <img src={ImgHero} alt='img-hero' className='h-60  md:w-3/5 md:h-screen object-contain xl:h-[80vh]'/>
    </div>
    
    <button className=' block md:hidden p-2 w-full max-w-sm mx auto mt-2 bg-zinc-900 rounded-full text-slate-50 hover:bg-zinc-800 transition-colors'>Reservar Turno</button>
    
    </div>
  )
}
