import { isAxiosError } from "axios";
import api from "../lib/apiaxios";
import { authenticationResponseSchema, ConfirmToken, RegisterForm, userAndGroupSchema, UserEmail, UserLoginForm  } from "../types";

export async function authenticateUser(formData : UserLoginForm) {
    try {
        const url = 'http://localhost:8080/login';
        const {data} = await api.post(url,formData);
        const response = authenticationResponseSchema.safeParse(data);
        if(response.success){
            console.log('ok')
            localStorage.setItem('vetapp',response.data.token);
            return response.data.token
        }
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }else{
            throw new Error('Error de red o servidor');
        }
    }
}

export async function registerUser(formData : RegisterForm){
    try {
        const {name,lastname,username,email,password,admin,cliente,veterinario} = formData;
        const dataForApi = {
            name,
            lastname,
            username,
            email,
            password,
            admin,
            cliente,
            veterinario
        }
        const url = 'http://localhost:8080/api/user/register';
        const {data} = await api.post<string>(url,dataForApi);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response ){
            throw new Error(error.response.data);
        }else{
            throw new Error('Error de red o servidor');
        }
    }
}

export async function resetPassword(formData : UserLoginForm) {
    try {
        const url = 'http://localhost:8080/api/auth/reset-password';
        const {data} = await api.put(url,formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }else{
            throw new Error('Error de red o servidor');
        }
    }
}

export async function confirmAccount(formData : ConfirmToken) {
    try {
        const url = `http://localhost:8080/api/auth/confirm-account/${formData.token}`;
        const {data} = await api.put(url);
        return data;
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }else{
            throw new Error('Error de red o servidor');
        }
    }
}

export async function newCode(formData : UserEmail){
    try {
        const url = 'http://localhost:8080/api/auth/new-code';
        const {data} = await api.post<string>(url,formData);
        return data;
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response ){
            throw new Error(error.response.data.message);
        }else{
            throw new Error('Error de red o servidor');
        }
    }
}

export async function getUser(){
    try {
        const url = 'http://localhost:8080/api/user/';
        const {data} = await api.get(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response ){
            throw new Error(error.response.data.message);
        }else{
            throw new Error('Error de red o servidor');
        }
    }
}

export async function getAllUser(){
    try {
        const url = 'http://localhost:8080/api/user/list';
        const {data} = await api.get(url);
        const response = userAndGroupSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }else{
            throw new Error('Error de red o servidor');
        }
    }
}