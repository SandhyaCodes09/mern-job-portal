import API from "../api";

// Register
export const registerUser = async (data) => {
    const res = await API.post("/auth/register", data);
    return res.data;
};

// Login
export const loginUser = async (data) => {
    const res = await API.post(
        "/auth/login",
        data,
        {
            withCredentials: true
        }
    );

    return res.data;
};

// Update Profile

export const updateProfile = async (formData) => {

    const res = await API.put(
        "/auth/update-profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return res.data;
};

// Get Employer Profile
export const getEmployerProfile = async () => {

    const res = await API.get(
        "/users/employer/profile",
        {
            withCredentials: true
        }
    );

    return res.data;
};

// Update Employer Profile
export const updateEmployerProfile = async (formData) => {

    const res = await API.put(
        "/users/employer/profile",
        formData,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return res.data;
};

