import api from "@/lib/apiaxios";
import { handleAPIError } from "@/utils/handleAPIError";
import {
  horariosSchema,
  HorariosType,
  MascotaSchema,
  MascotaType,
  serviciosSchema,
  ServiciosType,
  VeterinarianType,
  veterinarioSchema,
} from "../types";

const BASE_URL = import.meta.env.VITE_URL_BASE;

type GetHorariosDisponiblesParams = {
  id: number;
  fecha: string | null;
};

export const listVeterinarios = async (): Promise<
  VeterinarianType | undefined
> => {
  try {
    const url = `${BASE_URL}/api/user/veterinarios`;
    const { data } = await api.get<VeterinarianType>(url);
    console.log(data);
    const response = veterinarioSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleAPIError(error);
  }
};

export const getFechasDisponibles = async (id: number) => {
  try {
    const url = `${BASE_URL}/api/disponibilidad/rango-fechas/${id}`;
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const getHorariosDisponibles = async ({
  id,
  fecha,
}: GetHorariosDisponiblesParams): Promise<HorariosType | undefined> => {
  try {
    const formdata = { fecha: fecha || "" };

    if (!fecha) {
      return [];
    }

    const url = `${BASE_URL}/api/disponibilidad/${id}`;
    const { data } = await api.post<HorariosType>(url, formdata);

    const response = horariosSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleAPIError(error);
  }
};

export const getMascotas = async (
  userId: number | null
): Promise<MascotaType | undefined> => {
  try {
    let url: string;
    if (userId) {
      url = `${BASE_URL}/api/mascota/user/${userId}`;
    } else {
      url = `${BASE_URL}/api/mascota`;
    }
    const { data } = await api.get<MascotaType>(url);
    const response = MascotaSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleAPIError(error);
  }
};

export const getServicios = async (): Promise<ServiciosType | undefined> => {
  try {
    const url = `${BASE_URL}/api/servicios`;
    const { data } = await api.get<ServiciosType[]>(url);
    const response = serviciosSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleAPIError(error);
  }
};
