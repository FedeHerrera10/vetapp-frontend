import {z} from 'zod';

// Define the Veterinarian type
export type VetType = {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  availability?: string[]; // Array of dates in ISO format
};

export type CardType = {
  vet: VetType;
};

export type AppointmentFormData = {
  date: string;
  time: string;
  pet: string;
  service: string;
  symptoms: string;
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
    veterinario:z.boolean(),
    imageProfile:z.string()
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

const uploadImageProfileSchema =z.object({
  userId:z.number(),
  imageBase64:z.string()
})

export  enum Roles{
  ROLE_ADMIN="admin",
  ROLE_CLIENTE="cliente",
  ROLE_VETERINARIO="veterinary"
}

export enum RolesBackend{
  ROLE_ADMIN="ROLE_ADMIN",
  ROLE_CLIENTE="ROLE_CLIENTE",
  ROLE_VETERINARIO="ROLE_VETERINARIO"
}

type User = z.infer<typeof userSchema>;
export type UserLoginForm = Pick<User,'username' | 'password'>;
export type RegisterForm = Omit<User,"id" | 'token'>;
export type ConfirmToken = Pick<User,'token'>;
export type AuthResponseSchema = z.infer<typeof authenticationResponseSchema>;
export type UserEmail = z.infer<typeof UserEmailSchema>;
export type TableColumnSchema = z.infer<typeof userAndGroupSchema>;
export type UserUpdateSchema = z.infer<typeof updateUserSchema>;
export type UploadImageProfileSchema = z.infer<typeof uploadImageProfileSchema>