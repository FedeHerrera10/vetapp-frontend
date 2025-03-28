import api from "@/lib/apiaxios";
import { handleAPIError } from "@/utils/handleAPIError";
import { createHC } from "../types/index";
import {
  historiaC,
  historiaClinicaSchema,
  TableColumnSchema,
} from "@/types/index";

const BASE_URL = import.meta.env.VITE_URL_BASE;

export const getAllHistoriasClinicas = async (
  user
): Promise<historiaC[] | undefined> => {
  try {
    const url = `${BASE_URL}/api/historial-medico/veterinario/${user.id}`;
    const { data } = await api.get<historiaC[]>(url);
    const response = historiaClinicaSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    handleAPIError(error);
  }
};

export const getHistoriaClinica = async (
  user: TableColumnSchema
): Promise<historiaC | undefined> => {
  try {
    const veterinarioId: number = user[0].id;
    const url = `${BASE_URL}/api/historia-clinica/${veterinarioId}`;
    const { data } = await api.get<historiaC>(url);
    const response = historiaClinicaSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleAPIError(error);
  }
};

export const createHistoriaClinica = async (
  historiaClinica: Omit<createHC, "id">
): Promise<createHC | null> => {
  try {
    const { data } = await api.post<createHC>(
      `${BASE_URL}/api/historial-medico`,
      historiaClinica
    );
    return data;
  } catch (error) {
    handleAPIError(error);
    return null;
  }
};

export const updateHistoriaClinica = async (
  id: number,
  historiaClinica: Partial<historiaC>
): Promise<historiaC | null> => {
  try {
    const { data } = await api.put<historiaC>(
      `${BASE_URL}/api/historia-clinica/${id}`,
      historiaClinica
    );
    return data;
  } catch (error) {
    handleAPIError(error);
    return null;
  }
};
