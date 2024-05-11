import axios from "axios"; 

const apiUrl = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
  withCredentials: true, 
});

export default apiInstance;