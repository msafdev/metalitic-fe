import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

export class AxiosInterceptors {
  static checkUnauthorizedError(error: AxiosError): boolean {
    return error.response?.status === 401;
  }
}
