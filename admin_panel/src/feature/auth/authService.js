import axios from "axios";
import { base_URL } from "../../utils/base_url";

const login = async (userData) => {
  const response = await axios.post(`${base_URL}/users/admin`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
const logout = async () => {
  const response = await axios.get(`${base_URL}/users/person/logout`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
const listOrders = async (token) => {
  const response = await axios.get(`/api/users/person/all_fetch_order`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
const getOrder = async ({ token, id }) => {
  const response = await axios.get(`/api/users/person//get_user_order/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const authService = { login, logout, listOrders, getOrder };

export default authService;
