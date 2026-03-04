import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_HOST,
  headers: {
    "Content-Type": "application/json"
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const message = error.response?.data?.message || "Erro inesperado";
    return Promise.reject(message);
  }
)


export default api