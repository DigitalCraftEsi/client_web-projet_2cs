import axios from "axios";
import { BACKEND_URL } from "./constants";

export const axiosInsance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
}) 