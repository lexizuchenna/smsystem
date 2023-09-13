import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentData: [],
  isStudentError: false,
  isStudentLoading: false,
  isStudentSuccess: false,
  studentMessage: ""
};

export const studentSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {
    resetStudent: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { resetStudent } = studentSlice.actions;

export default studentSlice.reducer;
