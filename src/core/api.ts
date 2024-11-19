import axios, { AxiosInstance } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.defaults.headers.common["access-control-allow-origin"] = "*";
instance.defaults.headers.common["Content-Type"] = "application/json";

export const getInstance = (): AxiosInstance => {
  return instance;
};

export const updateAuthorization = (token: string) => {
  instance.defaults.headers.common["Authorization"] = token;
};
