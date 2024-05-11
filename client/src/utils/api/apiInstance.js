import axios from "axios"; 

const apiInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
  withCredentials: true, 
});

export default apiInstance;