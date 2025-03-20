import { handleAPIError } from "@/utils/handleAPIError";
import { PetRegisterSchema } from "../types";
import api from "@/lib/apiaxios";

const BASE_URL = "http://localhost:8080";

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


  export async function getPets({id}: {id: number}) {
    try {
      const url = `${BASE_URL}/api/mascota/list/${id}`;
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

  export async function updatePet({formData,petId}: {formData: PetRegisterSchema, petId: number}) {
    try {
      const url = `${BASE_URL}/api/mascota/${petId}`;
      console.log(url);
      const { data } = await api.put<string>(url, formData);
      return data;
    } catch (error) {
      handleAPIError(error);
    }
  }

  export async function changeStatus({formData,petId}: {formData: string, petId: number}) {
    try {
      const url = `${BASE_URL}/api/mascota/change-status/${petId}/${formData}`;
      console.log(formData);
      const { data } = await api.put<string>(url);
      return data;
    } catch (error) {
      handleAPIError(error);
    }
  }