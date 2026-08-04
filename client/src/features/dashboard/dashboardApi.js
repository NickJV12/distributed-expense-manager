import api from "../../api/axios";

export const getDashboardSummary = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
