import Axios, { InternalAxiosRequestConfig } from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const userToken = sessionStorage.getItem(
    "PfpO7Rj_eTDF8pEdvZsHS0f9GIeV0iq-Ijug-WWAnsc"
  );

  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

export default axios;
