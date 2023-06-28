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
  const response = await axios.get(`/api/users/person/get_user_order/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
const getMonthlyOrderRevenue = async (token) => {
  const response = await axios.get(`/api/users/data/revenuebyMonth`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
const getYearlyOrderCount = async (token) => {
  const response = await axios.get(`/api/users/data/countbyyear`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
const ChangeOrderStatus = async ({ token, id, data }) => {
  const response = await axios.put(
    `/api/users/person/update_order/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
const fetchOrdersPagination = async ({ token, page }) => {
  const response = await axios.get(
    `/api/users/person/all_order_paginate?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
const fetchOrdersPaginated = async ({
  token,
  page,
  limit,
  skip,
  search,
  status,
}) => {
  const response = await axios.get(
    `/api/users/person/all_fetch_order?page=${page || ""}&limit=${
      limit || ""
    }&skip=${skip || ""}&search=${search || ""}&status=${status || ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const authService = {
  login,
  logout,
  listOrders,
  getOrder,
  getMonthlyOrderRevenue,
  getYearlyOrderCount,
  ChangeOrderStatus,
  fetchOrdersPagination,
  fetchOrdersPaginated,
};

export default authService;
