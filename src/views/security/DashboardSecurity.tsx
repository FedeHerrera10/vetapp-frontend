
import { useQuery } from '@tanstack/react-query';
import { Edit, Eye, Stethoscope, UserRoundCog } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAllUser } from '../../api/AuthAPI';
import { Link } from 'react-router-dom';
import { Roles } from '@/types/index';

const columns = [
  {
    name: 'Nombre y Apellido',
    selector: row => row.name + " " + row.lastname,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Roles',
    selector: row => row.roles.map((role : any) => role.name).join(', '),
    cell: (row) => (
      <div className='flex items-center'>
        {row.roles.map((role : any) => (
          <div key={role.id} className='mr-2'>
            <span 
            className=
            {role.name ==="ROLE_ADMIN" ? "bg-orange-200 text-orange-800 p-1 rounded-lg text-[11px]" : 
              role.name ==='ROLE_VETERINARIO' ? "bg-violet-200 text-violet-800 p-1 rounded-lg text-[11px]" :
              role.name ==='ROLE_CLIENTE' ? "bg-green-200 text-green-800 p-1 rounded-lg text-[11px]" : ""}
            >
              {role.name.replace("ROLE_", "")}</span>
          </div>
        ))}
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Acciones',
    selector: row => row.action,
    maxWidth: '10%',
    cell: (props) => (
      <div className='flex items-center '>
        <Link to={`/app/security/user/view/${props.id}`}><Eye size={22} className='text-indigo-800 hover:text-indigo-700'/> </Link>
        <Link to={`/app/security/user/edit/${props.id}?backUrl=1`} className='ml-2'><Edit size={18} className='text-indigo-800 hover:text-indigo-700'/> </Link>
      </div>
    )
  },
];


export const DashboardSecurity = () => {
  const {data,error} = useQuery({
     queryKey: ['listUser'],
       queryFn : ()=> getAllUser(),
       retry:false
   })  
   
   const [filterText, setFilterText] = useState(''); // Estado para el texto del filtro
   const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados
 
   useEffect(() => {
     setFilteredData(data);
   }, [data]);

   // Función para filtrar los datos
   const handleFilter = (e) => {
     const searchText = e.target.value.toLowerCase();
     console.log(searchText)
     setFilterText(searchText);
    const filtered = data.filter((item) =>
       item.lastname.toLowerCase().includes(searchText)
     );
     setFilteredData(filtered);
   };

   if(error)return (
     <>
     <h2 className=' ml-2 text center mt-2'>upps!! No se pudo recuperar los usuarios</h2>
     </>
   )
   
  
  
  if(data)
    return (
    <div className="p-2 md:p-6">
     
      <h1 className="text-2xl font-bold mb-4 dark:text-slate-100">Usuarios del Sistema</h1>
      <div className='w-full flex flex-col gap-1 my-3 items-center md:justify-between md:flex-row  md:gap-4 '>
       <div className='w-full md:w-1/2 mb-2 md:mb-0'>
       <input
          id="filterText"
          className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Buscar" 
          value={filterText}
          onChange={handleFilter}
        />
       </div>
       <div className='w-full flex gap-1 md:w-1/2 md:justify-end'>
       <button className='flex items-center gap-1 font-medium p-2 md:p-2 rounded-md bg-green-600 text-slate-100 hover:bg-green-700 hover:transition-colors text-sm '> <Stethoscope size={20}/><Link to={`/app/security/add-user/${Roles.ROLE_VETERINARIO}`} className=''>Alta Veterinario </Link></button>
       <button className='flex items-center gap-1 font-medium p-2 md:p-2 rounded-md bg-violet-600 text-slate-100 hover:bg-violet-700 hover:transition-colors text-sm'><UserRoundCog size={20}/><Link to={`/app/security/add-user/${Roles.ROLE_ADMIN}`} className=''> Alta Usuario Sistema</Link></button>
       </div>
      </div>     
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        className="border rounded-lg shadow-sm w-full bg-slate-400"
        
      />
    </div>
  );
}   