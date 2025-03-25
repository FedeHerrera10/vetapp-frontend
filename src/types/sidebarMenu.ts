import { NavItem } from "./index";
const navItemsAdmin: NavItem[] = [
    {id: "usuarios" ,title : "Usuarios", icon : "UserRound", href:"security"},
  ];

const navItemsUser: NavItem[] = [

  { id: "vets", title: "Veterinarians", icon: "Users", href: "vets" },
    {
      id: "appointments",
      title: "Appointments",
      icon: "Calendar",
      href: "turnos",
    },
    { id: "pets", title: "Pets", icon: "PawPrint", href: "pets" },
    
  ];

const navItemsVet: NavItem[]= [
    
{ id: "historias-clinicas", title: "Historias Clínicas", icon: "ClipboardList", href: "historias-clinicas" }]


const getMenu = (rol : string)=>{

  switch(rol){
    case "ROLE_ADMIN":
      return navItemsAdmin;
    case "ROLE_CLIENTE":
      return navItemsUser;
    case "ROLE_VETERINARIO":
      return [...navItemsUser, ...navItemsVet];
    default:
      return [];
  }
}

export {getMenu};