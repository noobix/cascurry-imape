import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, productWishlist } from "./itemService";

export const getProducts = createAsyncThunk(
  "products/get_products",
  async (value, thunkAPI) => {
    try {
      return await fetchProducts(value);
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
export const addWishlist = createAsyncThunk(
  "products/wishlist_products",
  async (value, thunkAPI) => {
    try {
      return await productWishlist(value);
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
export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(addWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
