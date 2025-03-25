import { VetAboutSchema } from "@/types/index"

export const AboutVet = ({data } : {data: VetAboutSchema}) => {
  
  if(data) return (
    <div className="text-gray-800 dark:text-slate-50 mt-6">
      <h2 className="text-2xl font-bold underline">Sobre mi</h2>
      <p className='mt-2'>{data.descripcion}</p>
    </div>
  )
}
