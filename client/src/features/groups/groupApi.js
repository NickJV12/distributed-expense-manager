import api from "../../api/axios";

export const getGroups = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/groups", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createGroup = async (data) => {
    const token = localStorage.getItem("token");
    const response = await api.post(
        "/groups",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};