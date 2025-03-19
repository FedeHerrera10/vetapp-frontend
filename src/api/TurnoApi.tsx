import api from "@/lib/apiaxios";
import { handleAPIError } from "@/utils/handleAPIError";
import { DataApi, MascotaSchema, MascotaType } from "@/types/index";

const BASE_URL = import.meta.env.VITE_URL_BASE;

export const createTurno = async (turnoData: DataApi) => {
  try {
    const url = `${BASE_URL}/api/turno`;
    const { data } = await api.post(url, turnoData);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const getMascota = async (
  id: number
): Promise<MascotaType | undefined> => {
  try {
    const url = `${BASE_URL}/api/mascota/${id}`;
    const { data } = await api.get<MascotaType>(url);
    const response = MascotaSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleAPIError(error);
  }
};
