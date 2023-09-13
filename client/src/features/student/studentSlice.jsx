import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentData: [],
  isStudentError: false,
  isStudentLoading: false,
  isStudentSuccess: false,
  studentMessage: ""
};

// export const getAccount = createAsyncThunk("data/getAccount", async (id) => {
//   try {
//     return await dataService.getAccount(id);
//   } catch (error) {
//     console.log(error)
//   }
// })

export const studentSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {
    resetStudent: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder;
    //   .addCase(getAccount.pending, (state) => {
    //     state.isDataLoading = true;
    //   })
    //   .addCase(getAccount.fulfilled, (state, action) => {
    //     state.isDataLoading = false;
    //     state.isSuccess = true;
    //     state.account = action.payload;
    //   })
    //   .addCase(getAccount.rejected, (state, action) => {
    //     state.isDataLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //   })
  },
});

export const { resetStudent } = studentSlice.actions;

export default studentSlice.reducer;
