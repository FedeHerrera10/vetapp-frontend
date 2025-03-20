
import { PetSchema } from '@/types/index'
import { CardPets } from './CardPets'
export const ListPets = ({pets}: {pets: PetSchema[]}) => {
   

  return (
    <div className="relative px-8 py-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-slate-50">
      Mascotas Registradas
    </h2>
    {(pets.length > 0 ) ? <h2 className='text-gray-600 dark:text-slate-50/80'>No tienes mascotas registradas</h2> 
    : pets.map((pet: PetSchema) => <CardPets key={pet.id} pet={pet}/>)}
  </div>

  )
}
