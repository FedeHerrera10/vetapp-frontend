import ImgCard1 from '../../assets/img/card1.png';
import ImgCard2 from '../../assets/img/card2.png';
import ImgCard3 from '../../assets/img/card3.png';
import ImgCard4 from '../../assets/img/card4.png';
import ImgCard5 from '../../assets/img/card5.png';
import { CardService } from '../../components/ui/CardService';

export const SectionServices = () => {
  return (
    <section className="my-10 p-4 md:my-24 lg:mt-32" id='servicios'>
        <p className="text-xl font-normal leading-relaxed md:leading-normal md:text-2xl text-zinc-800 lg:text-3xl lg:leading-relaxed"> En VetApp podes encontrar una amplia gama de <span className="text-indigo-500">
        servicios diseñados para cubrir todas las necesidades</span>, desde chequeos rutinarios hasta tratamientos especializados , con los mejores profesionales.</p>

       <div className="flex flex-col gap-3 md:grid md:grid-cols-3 grid-rows-2 mt-20">
       <div className="bg-indigo-400 p-4 rounded-xl text-slate-50 h-80 flex flex-col justify-between ">
            <div>
                <h2 className="text-3xl mb-5">Servicios</h2>
                <p className="text-md mb-5 leading-normal"> Contamos con un equipo de profesionales apasionados y experimentados que trabajan para garantizar el bienestar y la salud de tus compañeros de vida. </p>
            </div>
            <button className='  p-2 w-40 mx auto mt-2 bg-zinc-900 rounded-full text-slate-50 hover:bg-zinc-800 transition-colors'>Reservar Turno</button>
        </div>
        
        
        <CardService title='Neurologia' imgsrc={<img src={ImgCard1} alt='img-card-1' className='h-64  object-contain'/>}/>
        <CardService title='Oftalmologia' imgsrc={<img src={ImgCard2} alt='img-card-2' className='h-64  object-contain'/>}/>
        <CardService title='Cirugia' imgsrc={<img src={ImgCard3} alt='img-card-3' className='h-64  object-contain'/>}/>
        <CardService title='Consulta' imgsrc={<img src={ImgCard4} alt='img-card-4' className='h-64  object-contain'/>}/>
        <CardService title='Cardiologia' imgsrc={<img src={ImgCard5} alt='img-card-5' className='h-64  object-contain'/>}/>
        
       
       </div>

    </section>
  )
}
