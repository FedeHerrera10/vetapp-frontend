import api from "@/lib/apiaxios";
import { handleAPIError } from "@/utils/handleAPIError";
import {
  Appointment,
  DataApi,
  MascotaSchema,
  MascotaType,
} from "@/types/index";

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

export const getAllTurnos = async (user): Promise<Appointment[]> => {
  try {
    const url =
      user.roles[0].name === "ROLE_VETERINARIO"
        ? `${BASE_URL}/api/turno/veterinario/${user.id}`
        : `${BASE_URL}/api/turno/user/${user.id}`;
    const { data } = await api.get<Appointment[]>(url);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
};
