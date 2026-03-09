import axios from "axios";

const api = axios.create({
    // baseURL : process.env.REACT_APP_API_URL || "http://localhost:5000/"
    baseURL : process.env.REACT_APP_API_URL || "https://api-production-eba7.up.railway.app/"
});

export default api