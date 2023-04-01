import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBlogImages,
  fetchProductImages,
  uploadFiles,
} from "./uploadService";

export const uploadImages = createAsyncThunk(
  "product/upload_images",
  async (value, thunkAPI) => {
    try {
      const formdata = new FormData();
      value.images.forEach((image) => formdata.append("images", image));
      value = { ...value, formdata };
      return await uploadFiles(value);
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
export const getProductImages = createAsyncThunk(
  "product/fetch_product_images",
  async (value, thunkAPI) => {
    try {
      return await fetchProductImages(value);
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
export const getBlogImages = createAsyncThunk(
  "product/fetch_blog_images",
  async (value, thunkAPI) => {
    try {
      return await fetchBlogImages(value);
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
export const clearUploadData = createAsyncThunk(
  "product/remove-uploaded",
  (value, { getState, rejectWithValue }) => {
    const {
      upload: { images },
    } = getState();
    if (images.length) return images;
    else return rejectWithValue("No images were uploaded");
  }
);

export const UploadSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.images = action.payload;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(clearUploadData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearUploadData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.images = [];
      })
      .addCase(clearUploadData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getProductImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.images = action.payload;
      })
      .addCase(getProductImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getBlogImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.images = action.payload;
      })
      .addCase(getBlogImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default UploadSlice.reducer;
