import { isAxiosError } from "axios";

const ERROR_SOLICITUD = 'Error en la solicitud';
const ERROR_SERVIDOR = 'Error de red o servidor';

export function handleAPIError(error: unknown): never {
    if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || ERROR_SOLICITUD);
    } else {
        throw new Error(ERROR_SERVIDOR);
    }
}