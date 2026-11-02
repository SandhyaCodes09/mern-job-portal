import axios from "axios";

const API = axios.create({
  baseURL: (
    process.env.REACT_APP_API_URL ||
    "https://job-frame.onrender.com"
  ).replace(/\/+$/, "") + "/api",
  withCredentials: true,
});

// Guard against accidental double "/api" prefix in requests
API.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith("/api/")) {
    config.url = config.url.replace(/^\/api/, "");
  }
  return config;
});

export default API;
