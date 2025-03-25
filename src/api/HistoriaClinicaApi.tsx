import api from "@/lib/apiaxios";
import { handleAPIError } from "@/utils/handleAPIError";
import { historiaC } from "@/types/index";

const BASE_URL = import.meta.env.VITE_URL_BASE;

export const getAllHistoriasClinicas = async (): Promise<historiaC[]> => {
  try {
    const { data } = await api.get<historiaC[]>(
      `${BASE_URL}/api/historia-clinica`
    );
    return data;
  } catch (error) {
    handleAPIError(error);
    return [];
  }
};

export const getHistoriaClinica = async (
  id: number
): Promise<historiaC | null> => {
  try {
    const { data } = await api.get<historiaC>(
      `${BASE_URL}/api/historia-clinica/${id}`
    );
    return data;
  } catch (error) {
    handleAPIError(error);
    return null;
  }
};

export const createHistoriaClinica = async (
  historiaClinica: Omit<historiaC, "id">
): Promise<historiaC | null> => {
  try {
    const { data } = await api.post<historiaC>(
      `${BASE_URL}/api/historia-clinica`,
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
