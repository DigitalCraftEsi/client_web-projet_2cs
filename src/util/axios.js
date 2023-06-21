import axios from "axios";
import { BACKEND_URL } from "./constants";

/**
 * axios instance initialised with the backend URL
 */
export const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    // withCredentials: true
}) 
