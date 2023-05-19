import axios from "axios";

export const creditCardPayment = async ({ token, data }) => {
  const response = await axios.post(
    `api/users/payment/credit_card/stripe`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  const { transaction } = response.data;
  localStorage.setItem("transact", transaction);
  return response.data;
};
