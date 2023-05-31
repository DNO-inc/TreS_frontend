import axios from "axios";
import { endpoints } from "../../constants";

const axiosInstance = axios.create({
  baseURL: endpoints.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosBaseQuery =
  ({ baseUrl } = {}) =>
  async ({ url, method, data, auth }) => {
    const isParamsTrue = url.split("/").at(-1) !== "undefined";
    const response =
      isParamsTrue &&
      (await axiosInstance({
        url: url,
        method: method,
        data: data,
        auth: auth,
        headers: {
          Authorization:
            localStorage.getItem("jwt-token") &&
            `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }));
    return { data: response.data };
  };