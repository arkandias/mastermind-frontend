import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://mmapi.arkandias.synology.me";
const TIMEOUT = 120000;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

const requestText = (config: AxiosRequestConfig): string =>
  `Request ${config.method?.toUpperCase() ?? "GET"} on ${config.url}`;

const responseText = (response: AxiosResponse): string =>
  `Response from ${requestText(response.config)} with status code ${
    response.status
  }`;

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log(requestText(config), config);
    return config;
  },
  (error: any) => {
    console.log(error?.toString() ?? "Request Error", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(responseText(response), response);
    return response;
  },
  (error: any) => {
    console.log(error?.toString() ?? "Response Error", error);
    return Promise.reject(error);
  }
);
