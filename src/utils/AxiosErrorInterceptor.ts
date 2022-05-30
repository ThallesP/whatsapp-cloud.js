import { AxiosError } from "axios";

import { WhatsappAPIError } from "../errors/WhatsappAPIError";

interface IWhatsappErrorResponse {
  error: {
    message: string;
    code: number;
    error_data: {
      details: string;
    };
  };
}

export function AxiosErrorInterceptor(
  error: AxiosError<IWhatsappErrorResponse>
) {
  if (error.response?.data.error) {
    const whatsappError = error.response.data.error;

    return Promise.reject(
      new WhatsappAPIError(
        whatsappError.code,
        whatsappError.error_data.details,
        whatsappError
      )
    );
  }

  return Promise.reject(error);
}
