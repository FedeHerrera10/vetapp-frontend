import { handleAPIError } from "@/utils/handleAPIError";
import { ServiciosObject, serviciosSchema, ServiciosType } from "../types";
import api from "@/lib/apiaxios";

const BASE_URL = import.meta.env.VITE_URL_BASE;

export const getServices = async (): Promise<ServiciosType | undefined> => {
  try {
    const url = `${BASE_URL}/api/servicios`;
    console.log(url);

    const { data } = await api.get<ServiciosType[]>(url);
    const response = serviciosSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleAPIError(error);
  }
};

export const createService = async (
  service: Omit<ServiciosObject, "id">
): Promise<ServiciosType> => {
  try {
    const response = await api.post<ServiciosType>(
      `${BASE_URL}/api/servicios`,
      service
    );
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const updateService = async (
  id: number,
  service: ServiciosObject
): Promise<ServiciosType> => {
  try {
    const response = await api.put<ServiciosType>(
      `${BASE_URL}/api/servicios/${id}`,
      service
    );
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const deleteService = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`${BASE_URL}/api/servicios/${id}`);
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};
