import api from "../../api/axios";

export const getDashboardSummary = async () => {
  const response = await api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};