import {z} from 'zod';


//Schema veterinario
export const veterinarioSchema =z.array(z.object({
  id: z.number(),
  name:z.string(),
  lastname:z.string(),
  //specialty: z.string(),
  //imageUrl: string;
  //availability?: string[];
}))


//Schema veterinario horarios
export const horariosSchema =z.array(z.object({
  fecha: z.string (),
  horaInicio:z.string(),
  horaFin:z.string(),
}))

//Type cargar turno 
export type turnosFormData = {
  fecha: string,
  horaInicio:string,
  mascota:number,
  servicio:number,
  veterinario:number,
}

//Schema mascota
  export const MascotaSchema = z.array(z.object({
  id: z.number(),
  nombre: z.string(),
  raza: z.string(),
  especie: z.string(),
}))

//Schema Servicios
export const serviciosSchema = z.array(z.object({
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
}))


// Define the Veterinarian type
export type VetType = {
  id: number;
  name: string;
  lastname: string;
  // specialty: string;
  // imageUrl: string;
  //availability?: string[]; // Array of dates in ISO format
};

export type CardType = {
  vet: VetType;
};

export type AppointmentFormData = {
  fecha: string;
  horario: string;
  mascota: number;
  servicio: number;
  veterinario: number;
};

export type DataApi = {
  fecha: string;
  horario: string;
  mascota: {id: number};
  servicio: {id: number};
  veterinario: {id: number};
};

export type SeachType = {
  initialVeterinarians: VetType[];
  setFilteredVets: (vets: VetType[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};


/** Navbar dash y sidebar */
export type NavItem = {
    id: string;
    title: string;
    icon: string;
    href: string;
  };
  
  export type UserMenuOption = {
    id: string;
    label: string;
    icon: string;
    action: () => void;
  };

/** auth & users */

const userSchema = z.object({
    id:z.number(),
    name:z.string(),
    lastname:z.string(),
    username:z.string(),
    email:z.string().email(),
    password:z.string(),
    passwordRepeat:z.string(),
    token: z.string(),
    admin:z.boolean(),
    cliente:z.boolean(),
    veterinario:z.boolean()
});


export const authenticationResponseSchema = z.object({
    message:z.string(),
    token:z.string()
})

const UserEmailSchema = z.object({
    email: z.string().email(),
});

export const userAndGroupSchema = z.array(z.object({
    id:z.number(),
    name:z.string(),
    lastname:z.string(),
    email:z.string().email(),
    roles:z.array(z.object({
      id:z.number(),
      name:z.string()
    }))
}))

const updateUserSchema =z.object({
  name:z.string(),
  lastname:z.string(),
  email:z.string().email(),
  enabled:z.boolean()
})

export  enum Roles{
  ROLE_ADMIN="admin",
  ROLE_CLIENTE="cliente",
  ROLE_VETERINARIO="veterinary"
}

type User = z.infer<typeof userSchema>;
export type UserLoginForm = Pick<User,'username' | 'password'>;
export type RegisterForm = Omit<User,"id" | 'token'>;
export type ConfirmToken = Pick<User,'token'>;
export type AuthResponseSchema = z.infer<typeof authenticationResponseSchema>;
export type UserEmail = z.infer<typeof UserEmailSchema>;
export type TableColumnSchema = z.infer<typeof userAndGroupSchema>;
export type UserUpdateSchema = z.infer<typeof updateUserSchema>;
export type ServiciosType = z.infer<typeof serviciosSchema>;
export type MascotaType = z.infer<typeof MascotaSchema>;
export type HorariosType = z.infer<typeof horariosSchema>;
export type VeterinarianType = z.infer<typeof veterinarioSchema>;


