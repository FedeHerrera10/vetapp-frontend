import {z} from 'zod';

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
    token: z.string()
});

export const authenticationResponseSchema = z.object({
    message:z.string(),
    token:z.string()
})

const UserEmailSchema = z.object({
    email: z.string().email(),
});

type User = z.infer<typeof userSchema>;



export type UserLoginForm = Pick<User,'username' | 'password'>;
export type RegisterForm = Omit<User,"id" | 'token'>;
export type ConfirmToken = Pick<User,'token'>;
export type AuthResponseSchema = z.infer<typeof authenticationResponseSchema>;
export type UserEmail = z.infer<typeof UserEmailSchema>;