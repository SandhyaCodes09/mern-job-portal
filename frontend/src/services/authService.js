import API from "../api";

// 🔹 Auth Service: API calls related to authentication (register, login)

export const registerUser = async (data) =>{
    const res = await API.post("/auth/register", data);
    return res.data;
};

export const loginUser = async (data) =>{
    const res = await API.post("/auth/login", data);
    return res.data;
};