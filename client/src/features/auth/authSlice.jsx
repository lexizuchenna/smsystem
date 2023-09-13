import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authActions from "./authActions";

const user = JSON.parse(localStorage.getItem("user"));

const initialAuthState = {
  authData: user ? user : null,
  isAuthError: false,
  isAuthLoading: false,
  isAuthSuccess: false,
  authMessage: "",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      return await authActions.loginUser(formData);
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

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return authActions.logoutUser();
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    resetAuth: (state) => initialAuthState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthSuccess = true;
        state.authData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthError = true;
        state.authMessage = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authData = null;
        state.isAuthError = false
        state.isAuthSuccess = false
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
