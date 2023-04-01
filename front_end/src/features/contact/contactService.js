import axios from "axios";

export const createPost = async ({ token, data }) => {
  const response = await axios.post(
    `/api/products/enquiries/make_enquiry`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data.wishlist;
};
