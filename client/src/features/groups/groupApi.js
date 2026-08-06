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

// ✅ Add member to group
export const addMember = async (groupId, email) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    `/groups/${groupId}/members`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getGroupMembers = async (groupId) => {
  const response = await api.get(
    `/groups/${groupId}/members`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};