import axios from "axios";

export const listBrands = async (token) => {
  const response = await axios.get(`/api/products/brand/get_brands`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const addBrands = async ({ token, data }) => {
  const response = await axios.post(`/api/products/brand/add_brand`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const getBrand = async ({ token, id }) => {
  const response = await axios.get(`/api/products/brand/get_brand/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const updateBrands = async ({ token, data, id }) => {
  const response = await axios.put(
    `/api/products/brand/update_brand/${id}`,
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
export const removeBrand = async ({ token, id }) => {
  const response = await axios.delete(
    `/api/products/brand/remove_brand/${id}`,
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
export const configurePagination = async ({ token, page }) => {
  const response = await axios.get(
    `/api/products/brand/pagination?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const fetchBrandPaginated = async ({
  token,
  page,
  limit,
  skip,
  search,
}) => {
  const response = await axios.get(
    `/api/products/brand/get_brands?page=${page || ""}&limit=${
      limit || ""
    }&skip=${skip || ""}&search=${search || ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
