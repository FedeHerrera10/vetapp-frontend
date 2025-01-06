type CardProp = {
    title:string,
    imgsrc:React.ReactNode
}


export const CardService = ({title,imgsrc} : CardProp) => {
  return (
    <div className='bg-slate-50  p-4  flex flex-col  h-80 cursor-pointer hover:border-l-indigo-400 
    hover:border-r-indigo-400 hover:border-t-indigo-400 hover:border-b-indigo-400 
    hover:shadow-lg group relative  overflow-hidden border rounded border-gray-100   px-12 py-3 text-sm font-medium text-slate-800 hover:text-indigo-400 focus:outline-none focus:ring active:bg-indigo-600 active:text-white
    '>
    <h2 className='text-zinc-700 text-xl font-semibold uppercase lg:text-2xl'>{title}</h2>
    {imgsrc}
   
	<span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-indigo-400 transition-all duration-200 group-hover:w-full"></span>
	<span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-indigo-400 transition-all duration-200 group-hover:h-full"></span>
	<span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-indigo-400 transition-all duration-200 group-hover:w-full"></span>
	<span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-indigo-400 transition-all duration-200 group-hover:h-full"></span>
	

</div>
  )
}
