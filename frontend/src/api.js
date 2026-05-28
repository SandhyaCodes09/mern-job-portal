import axios from "axios";

// Create axios instance
const api = axios.create({

    baseURL: "http://localhost:5000/api",

    // Allow cookies to be sent with requests
    withCredentials: true,

});

export default api;