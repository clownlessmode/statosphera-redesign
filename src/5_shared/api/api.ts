import axios from "axios";

const API_URL_MOBILE = import.meta.env.VITE_MOBILE_API_URL;
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

export const api = axios.create({
  baseURL: `${API_DOMAIN}${API_URL_MOBILE}`,
  withCredentials: true,
});
