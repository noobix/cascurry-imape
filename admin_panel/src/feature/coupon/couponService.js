import axios from "axios";

export const listCoupons = async (token) => {
  const response = await axios.get(`/api/products/coupons/all_coupons`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const addCoupon = async ({ token, data }) => {
  const response = await axios.post(`/api/products/coupons/new_coupon`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const fetchCoupon = async ({ token, id }) => {
  const response = await axios.get(`/api/products/coupons/find_coupon/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const updateCoupon = async ({ token, data, id }) => {
  const response = await axios.put(
    `/api/products/coupons/update_coupon/${id}`,
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
export const removeCoupon = async ({ token, id }) => {
  const response = await axios.delete(
    `/api/products/coupons/remove_coupon/${id}`,
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
