import api from "../../api/axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createExpense = async (groupId, data) => {
  const response = await api.post(
    `/groups/${groupId}/expenses`,
    data,
    getAuthConfig()
  );

  return response.data;
};

export const getGroupExpenses = async (groupId) => {
  const response = await api.get(
    `/groups/${groupId}/expenses`,
    getAuthConfig()
  );

  return response.data;
};

export const getBalances = async (groupId) => {
  const response = await api.get(
    `/groups/${groupId}/balances`,
    getAuthConfig()
  );

  return response.data;
};

export const getSettlements = async (groupId) => {
  const response = await api.get(
    `/groups/${groupId}/settlements`,
    getAuthConfig()
  );
  return response.data;
};
