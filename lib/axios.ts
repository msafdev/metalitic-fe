import axios, { AxiosError, AxiosResponse } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { AxiosInterceptors } from "./interceptors";

export const api = axios.create({
  baseURL: process.env.API_URL
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors
    if (error.response) {
      if (
        typeof window !== "undefined" &&
        AxiosInterceptors.checkUnauthorizedError(error) &&
        !window.location.href.includes("/login")
      ) {
        deleteCookie("token");
        deleteCookie("user");
        window.location.href = "/login";
      }
    } else if (error.request) {
      // No response was received from the server
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Unexpected Error:", error.message);
    }

    return Promise.reject(error);
  }
);
