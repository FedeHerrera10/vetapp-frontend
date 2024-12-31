type CardProp = {
    title:string,
    imgsrc:React.ReactNode
}


export const CardService = ({title,imgsrc} : CardProp) => {
  return (
    <div className='bg-slate-100  p-4 rounded-xl flex flex-col  h-80 cursor-pointer hover:border-l-indigo-400 
    hover:border-r-indigo-500 hover:border-t-indigo-500 hover:border-b-indigo-500  border-2
    hover:shadow-lg
    '>
    <h2 className='text-zinc-800 text-xl font-medium lg:text-2xl'>{title}</h2>
    {imgsrc}
</div>
  )
}
