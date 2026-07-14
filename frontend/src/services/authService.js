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


// export const updateProfile = async (data) => {

//     const res = await API.put(
//         "/auth/update-profile",
//         data
//     );

//     return res.data;

// };