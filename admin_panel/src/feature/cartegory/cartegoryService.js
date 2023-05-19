import axios from "axios";

export const listCartegory = async (token) => {
  const response = await axios.get(`/api/products/category/list_categories`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const addCartegory = async ({ token, data }) => {
  const response = await axios.post(`/api/products/category/add_new`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const fetchCartegory = async ({ token, id }) => {
  const response = await axios.get(
    `/api/products/category/get_category/${id}`,
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
export const updateCartegory = async ({ token, data, id }) => {
  const response = await axios.put(
    `/api/products/category/update_category/${id}`,
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
export const removeCartegory = async ({ token, id }) => {
  const response = await axios.delete(
    `/api/products/category/delete_category/${id}`,
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
    `/api/products/category/pagination?page=${page}`,
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
export const fetchCategoryPaginated = async ({
  token,
  page,
  limit,
  skip,
  search,
}) => {
  const response = await axios.get(
    `/api/products/category/list_categories?page=${page || ""}&limit=${
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
