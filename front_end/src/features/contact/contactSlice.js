import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPost } from "./contactService";

export const makeEnquiry = createAsyncThunk(
  "contact/make_enquiry",
  async (value, thunkAPI) => {
    try {
      return await createPost(value);
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
export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contact = action.payload;
      })
      .addCase(makeEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default contactSlice.reducer;
