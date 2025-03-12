import { ROUTES } from "@shared/constants/routes";
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

export const BACKEND_URL: string = import.meta.env.VITE_BACKEND || "";
const createApiInstance = (version: string): AxiosInstance => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: `https://${BACKEND_URL}/api/${version}`,
    headers: {
      "Access-Control-Allow-Origin": import.meta.env.VITE_API_DOMAIN,
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "x-device-type": "web",
    },
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        // const { clearSession } = useSession.getState();
        // clearSession();
        window.location.href = ROUTES.AUTHORIZATION;
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api: AxiosInstance = createApiInstance("v1");
export const apiV2: AxiosInstance = createApiInstance("v2");
