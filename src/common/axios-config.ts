import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
// BugFix: InternalAxiosRequestConfig instead of AxiosRequestConfig

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_MM_BACKEND_URL,
  timeout: import.meta.env.VITE_TIMEOUT,
});

const requestText = (config: InternalAxiosRequestConfig): string =>
  `Request ${config.method?.toUpperCase() ?? "GET"} on ${config.url}`;

const responseText = (response: AxiosResponse): string =>
  `Response from ${requestText(response.config)} with status code ${
    response.status
  }`;

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
