
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api`
    : "https://job-frame.onrender.com/api",
  withCredentials: true,
});

export default API;

