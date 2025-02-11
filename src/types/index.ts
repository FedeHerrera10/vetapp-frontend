import {z} from 'zod';

/** auth & users */

const userSchema = z.object({
    id:z.number(),
    name:z.string(),
    lastname:z.string(),
    username:z.string(),
    email:z.string().email(),
    password:z.string(),
    passwordRepeat:z.string()
});

export const authenticationResponseSchema = z.object({
    message:z.string(),
    token:z.string()
})


type User = z.infer<typeof userSchema>;



export type UserLoginForm = Pick<User,'username' | 'password'>;
export type RegisterForm = Omit<User,"id">;
 
export type AuthResponseSchema = z.infer<typeof authenticationResponseSchema>;
