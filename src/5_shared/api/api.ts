import axios from "axios";
import { useSessionStore } from "@entities/session";

const API_URL_MOBILE = import.meta.env.VITE_MOBILE_API_URL;
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

export const api = axios.create({
  baseURL: `${API_DOMAIN}${API_URL_MOBILE}`,
  withCredentials: true,
});

api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err.response?.status === 401) {
      useSessionStore.getState().clearSession();
      window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);
