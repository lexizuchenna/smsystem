import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import sTeacherActions from "./sTeacherActions"

const initialState = {
  sTeacherData: [],
  isSTeacherError: false,
  isSTeacherLoading: false,
  isSTeacherSuccess: false,
  sTeacherMessage: ""
};

export const saveResult = createAsyncThunk(
  "sTeacher/saveResult",
  async (formData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.authData;
      return await sTeacherActions.saveResult(formData, token);
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

export const sTeacherSlice = createSlice({
  name: "sTeacher",
  initialState: initialState,
  reducers: {
    resetSTeacher: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(saveResult.pending, (state) => {
      state.isSTeacherLoading = true;
    })
    .addCase(saveResult.fulfilled, (state, action) => {
      state.isSTeacherLoading = false;
      state.isSTeacherSuccess = true;
      state.sTeacherMessage = action.payload;
    })
    .addCase(saveResult.rejected, (state, action) => {
      state.isSTeacherLoading = false;
      state.isSTeacherError = true;
      state.sTeacherMessage = action.payload;
    });
  },
});

export const { resetSTeacher } = sTeacherSlice.actions;

export default sTeacherSlice.reducer;
