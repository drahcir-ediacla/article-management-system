import axios from "axios";

// Create an Axios instance
export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

