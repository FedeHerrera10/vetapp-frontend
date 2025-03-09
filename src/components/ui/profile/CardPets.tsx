import { Calendar } from 'lucide-react'

export const CardPets = () => {
  return (
    
<div className="bg-gray-50 rounded-xl p-6 mb-6 dark:bg-gray-700 ">
    <div className="flex items-center gap-6">
    <img 
      src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&q=80&w=400"
      alt="Max"
      className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
    />
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-50">Max</h3>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Active</span>
      </div>
      <p className="text-gray-600 dark:text-slate-50/80">Golden Retriever • 4 years old</p>
    </div>
    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 dark:text-slate-50">
      <Calendar className="w-4 h-4" />
      Turnos
    </button>
  </div>
  </div>
  )
}
