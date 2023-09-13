import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fTeacherActions from "./fTeacherActions";

const initialState = {
  fTeacherData: null,
  isFTeacherError: false,
  isFTeacherLoading: false,
  isFTeacherSuccess: false,
  fTeacherMessage: "",
};

export const createStudent = createAsyncThunk(
  "fTeacher/createStudent",
  async (formData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.authData;
      return await fTeacherActions.createStudent(formData, token);
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
export const updateStudent = createAsyncThunk(
  "fTeacher/updateStudent",
  async (formData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.authData;
      return await fTeacherActions.updateStudent(formData, token);
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
  "fTeacher/approveResult",
  async (formData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.authData;
      return await fTeacherActions.approveResult(formData, token);
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
  "fTeacher/rejectResult",
  async (formData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.authData;
      return await fTeacherActions.rejectResult(formData, token);
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

export const fTeacherSlice = createSlice({
  name: "fTeacher",
  initialState: initialState,
  reducers: {
    resetFTeacher: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.isFTeacherLoading = true;
        state.isFTeacherSuccess = false;
        state.fTeacherMessage = "";
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isFTeacherLoading = false;
        state.isFTeacherSuccess = true;
        state.fTeacherMessage = action.payload;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isFTeacherLoading = false;
        state.isFTeacherError = true;
        state.fTeacherMessage = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.isFTeacherLoading = true;
        state.isFTeacherSuccess = false;
        state.fTeacherMessage = "";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isFTeacherLoading = false;
        state.isFTeacherSuccess = true;
        state.fTeacherMessage = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isFTeacherLoading = false;
        state.isFTeacherError = true;
        state.fTeacherMessage = action.payload;
      })
      .addCase(approveResult.pending, (state) => {
        state.isFTeacherLoading = true;
        state.isFTeacherSuccess = false;
        state.fTeacherMessage = "";
      })
      .addCase(approveResult.fulfilled, (state, action) => {
        state.isFTeacherLoading = false;
        state.isFTeacherSuccess = true;
        state.fTeacherMessage = action.payload;
      })
      .addCase(approveResult.rejected, (state, action) => {
        state.isFTeacherLoading = false;
        state.isFTeacherError = true;
        state.fTeacherMessage = action.payload;
      })
      .addCase(rejectResult.pending, (state) => {
        state.isFTeacherLoading = true;
        state.isFTeacherSuccess = false;
        state.fTeacherMessage = "";
      })
      .addCase(rejectResult.fulfilled, (state, action) => {
        state.isFTeacherLoading = false;
        state.isFTeacherSuccess = true;
        state.fTeacherMessage = action.payload;
      })
      .addCase(rejectResult.rejected, (state, action) => {
        state.isFTeacherLoading = false;
        state.isFTeacherError = true;
        state.fTeacherMessage = action.payload;
      })
  },
});

export const { resetFTeacher } = fTeacherSlice.actions;

export default fTeacherSlice.reducer;
