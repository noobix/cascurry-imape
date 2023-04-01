import axios from "axios";

export const getEnquiry = async (token) => {
  const response = await axios.get(`/api/products/enquiries/get_all_enquiry`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const removeEnquiry = async ({ token, id }) => {
  const response = await axios.delete(
    `/api/products/enquiries/delete_enquiry/${id}`,
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
export const findEnquiry = async ({ token, id }) => {
  const response = await axios.get(
    `/api/products/enquiries/get_enquiry/${id}`,
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
export const amendEnquiry = async ({ token, id, data }) => {
  const response = await axios.put(
    `/api/products/enquiries/update_enquiry/${id}`,
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
