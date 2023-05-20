import axios from "axios";
import { config } from "../env-config";

export const baseAxiosClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

baseAxiosClient.defaults.headers.common["credentials"] = "include";
baseAxiosClient.defaults.headers.common[
  "Access-Control-Allow-Origin".toUpperCase()
] = "http://34.116.142.161";

export * from "./eventsApi";
export * from "./authApi";
