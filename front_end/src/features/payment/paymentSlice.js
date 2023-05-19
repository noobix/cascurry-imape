import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { creditCardPayment } from "./paymentService";

export const makeCCpayment = createAsyncThunk(
  "auth/order_products",
  async (value, thunkAPI) => {
    try {
      return await creditCardPayment(value);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    session: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeCCpayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeCCpayment.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.session = action.payload;
      })
      .addCase(makeCCpayment.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default paymentSlice.reducer;
