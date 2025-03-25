import { handleAPIError } from "@/utils/handleAPIError";
import api from "../lib/apiaxios";
import { VetAboutSchema } from "../types";

const BASE_URL = "http://localhost:8080";

export async function createAboutVet({formData, idUser}: {formData: VetAboutSchema , idUser: number}) {
  try {
    console.log(formData)
    const url = `${BASE_URL}/api/user/about/${idUser}`;
    const { data } = await api.post(url, formData);
    return data;
    
  } catch (error) {
        handleAPIError(error);
  }
}


export async function findAbout(idUser : number) {
    try {
      const url = `${BASE_URL}/api/user/about/${idUser}`;
      const { data } = await api.get(url);
      return data;
      
    } catch (error) {
          handleAPIError(error);
    }
  }

  export async function updateAboutVet({formData, idUser}: {formData: VetAboutSchema , idUser: number}) {
    try {
      console.log(formData)
      const url = `${BASE_URL}/api/user/about/${idUser}`;
      const { data } = await api.put(url, formData);
      return data;
      
    } catch (error) {
          handleAPIError(error);
    }
  }