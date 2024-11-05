import axios from "axios"
import { BASE_URL} from "./constants"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers:{
        "Content-Type": "multipart/form-data",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("PestToken");
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        console.error("Request error:", error);  
        return Promise.reject(error);
    }
);

export default axiosInstance;