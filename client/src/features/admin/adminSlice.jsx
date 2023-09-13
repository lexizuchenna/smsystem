import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import adminActions from "./adminActions";

const initialState = {
  adminData: [],
  isAdminError: false,
  isAdminLoading: false,
  isAdminSuccess: false,
  adminMessage: "",
};

export const createTeacher = createAsyncThunk(
  "admin/createTeacher",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.authData.token;
      return await adminActions.createTeacher(formData, token);
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
export const createSession = createAsyncThunk(
  "admin/create-session",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.authData.token;
      return await adminActions.createSession(formData, token);
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
export const updateSession = createAsyncThunk(
  "admin/update-session",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.authData.token;
      return await adminActions.updateSession(formData, token);
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
export const deleteSession = createAsyncThunk(
  "admin/delete-session",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.authData.token;
      return await adminActions.deleteSession(formData, token);
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
export const approveResult = createAsyncThunk(
  "admin/approveResult",
  async (formData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.authData;
      return await adminActions.approveResult(formData, token);
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
export const rejectResult = createAsyncThunk(
  "admin/rejectResult",
  async (formData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.authData;
      return await adminActions.rejectResult(formData, token);
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

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    resetAdmin: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeacher.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminMessage = action.payload;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
      })
      .addCase(createSession.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminMessage = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
      })
      .addCase(updateSession.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminMessage = action.payload;
      })
      .addCase(updateSession.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
      })
      .addCase(deleteSession.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminMessage = action.payload;
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminError = true;
        state.adminMessage = action.payload;
      })
      .addCase(approveResult.pending, (state) => {
        state.isAdminLoading = true;
        state.isAdminSuccess = false;
        state.adminMessage = "";
      })
      .addCase(approveResult.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminMessage = action.payload;
      })
      .addCase(approveResult.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isFTeacherError = true;
        state.adminMessage = action.payload;
      })
      .addCase(rejectResult.pending, (state) => {
        state.isAdminLoading = true;
        state.isAdminSuccess = false;
        state.adminMessage = "";
      })
      .addCase(rejectResult.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.adminMessage = action.payload;
      })
      .addCase(rejectResult.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isFTeacherError = true;
        state.adminMessage = action.payload;
      })
  },
});

export const { resetAdmin } = adminSlice.actions;

export default adminSlice.reducer;
