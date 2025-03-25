import { handleAPIError } from "@/utils/handleAPIError";
import { PetRegisterSchema } from "../types";
import api from "@/lib/apiaxios";

const BASE_URL = import.meta.env.VITE_URL_BASE;

export async function registerPet({formData,userid}: {formData: PetRegisterSchema, userid: number}) {
    try {
      const url = `${BASE_URL}/api/mascota/${userid}`;
      console.log(url);
      const { data } = await api.post<string>(url, formData);
      return data;
    } catch (error) {
      handleAPIError(error);
    }
  }


  export async function getPets() {
    try {
      const url = `${BASE_URL}/api/mascota`;
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      handleAPIError(error);
    }
  }

  export async function getPet({idMascota}: {idMascota: number}) {
    try {
      const url = `${BASE_URL}/api/mascota/${idMascota}`;
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      handleAPIError(error);
    }
  }