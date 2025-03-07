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
      href: "appointments",
    },
  ];


const getMenu = (rol : string)=>{
    if(rol === "ROLE_ADMIN"){
        return navItemsAdmin;
    }else{
        return navItemsUser;
    }
}

export {getMenu};