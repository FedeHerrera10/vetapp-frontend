import api from "../lib/apiaxios";
import { handleAPIError } from "../utils/handleAPIError";
import {
  authenticationResponseSchema,
  ConfirmToken,
  RegisterForm,
  UploadImageProfileSchema,
  userAndGroupSchema,
  UserEmail,
  UserLoginForm,
  UserUpdateSchema,
} from "../types";

const BASE_URL = "http://localhost:8080";

export async function authenticateUser(formData: UserLoginForm) {
  try {
    console.log(formData)
    const url = `${BASE_URL}/login`;
    const { data } = await api.post(url, formData);
    const response = authenticationResponseSchema.safeParse(data);
    if (response.success) {
      localStorage.setItem("vetapp", response.data.token);
      return response.data.token;
    }
  } catch (error) {
    handleAPIError(error);
  }
}

export async function registerUser(formData: RegisterForm) {
  try {
    const {
      name,
      lastname,
      username,
      email,
      password,
      admin,
      cliente,
      veterinario,
    } = formData;
    const dataForApi = {
      name,
      lastname,
      username,
      email,
      password,
      admin,
      cliente,
      veterinario,
    };
    const url = `${BASE_URL}/api/user/register`;
    const { data } = await api.post<string>(url, dataForApi);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
}

export async function resetPassword(formData: UserLoginForm) {
  try {
    const url = `${BASE_URL}/api/auth/reset-password`;
    const { data } = await api.put(url, formData);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = `${BASE_URL}/api/auth/confirm-account/${formData.token}`;
    const { data } = await api.put(url);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
}

export async function newCode(formData: UserEmail) {
  try {
    const url = `${BASE_URL}/api/auth/new-code`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    console.log(error);
    handleAPIError(error);
  }
}

export async function getUser() {
  try {
    const url = `${BASE_URL}/api/user/`;
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
}

export async function getAllUser() {
  try {
    const url = `${BASE_URL}/api/user/list`;
    const { data } = await api.get(url);
    const response = userAndGroupSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleAPIError(error);
  }
}

export async function getUserById(id: number) {
  try {
    const url = `${BASE_URL}/api/user/${id}`;
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
}
export async function editUser({formData ,id }: {formData: UserUpdateSchema ,id: number}) {
  try {
    console.log(formData)
    const url = `${BASE_URL}/api/user/${id}`;
    const { data } = await api.put(url, formData);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
}

export async function uploadImage(formData: UploadImageProfileSchema) {
  try {
    console.log(formData)
    const url = `${BASE_URL}/api/images/upload`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    console.log(error)
    handleAPIError(error);
  }
}