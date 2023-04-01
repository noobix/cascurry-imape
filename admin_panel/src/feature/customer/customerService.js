import axios from "axios";

export const listCustomers = async (token) => {
  const response = await axios.get(`/api/users/people`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
