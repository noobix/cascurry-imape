import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  addCoupon,
  fetchCoupon,
  listCoupons,
  removeCoupon,
  updateCoupon,
} from "./couponService";

export const getCoupons = createAsyncThunk(
  "product/coupon_list",
  async (value, thunkAPI) => {
    try {
      return await listCoupons(value);
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
export const makeCoupon = createAsyncThunk(
  "product/create_coupon",
  async (value, thunkAPI) => {
    try {
      return await addCoupon(value);
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
export const clearState = createAction("reset_data");
export const findCoupon = createAsyncThunk(
  "product/get_coupon",
  async (value, thunkAPI) => {
    try {
      return await fetchCoupon(value);
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
export const reviseCoupon = createAsyncThunk(
  "product/update_coupon",
  async (value, thunkAPI) => {
    try {
      return await updateCoupon(value);
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
export const deleteCoupon = createAsyncThunk(
  "product/delete_coupon",
  async (value, thunkAPI) => {
    try {
      return await removeCoupon(value);
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
export const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(makeCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
      })
      .addCase(makeCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(findCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
      })
      .addCase(findCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(clearState, (state) => {
        state.brands = [];
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default couponSlice.reducer;
