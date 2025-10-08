import { AxiosError } from "axios";

export type ApiErrorResponse = {
  message?: string | string[];
  errors?: Record<string, string[]>;
  statusCode?: number;
};

export type NormalizedError = {
  message: string;
  special?: string | undefined | unknown;
  status: number;
  isClientError: boolean;
};

export type ApiResponseError = AxiosError<ApiErrorResponse>;


