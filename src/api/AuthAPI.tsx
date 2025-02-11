import { isAxiosError } from "axios";
import api from "../lib/apiaxios";
import { authenticationResponseSchema, RegisterForm, UserLoginForm  } from "../types";

export async function authenticateUser(formData : UserLoginForm) {
    try {
        const url = 'http://localhost:8080/login';
        const {data} = await api.post(url,formData);
        const response = authenticationResponseSchema.safeParse(data);
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response ){
            throw new Error(error.response.data);
        }
    }
}

export async function registerUser(formData : RegisterForm){
    try {
        const {name,lastname,username,email,password} = formData;
        const dataForApi = {
            name,
            lastname,
            username,
            email,
            password
        }
        const url = 'http://localhost:8080/api/user/register';
        const {data} = await api.post<string>(url,dataForApi);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response ){
            console.log(error);
            throw new Error(error.response.data);
        }
    }
}
