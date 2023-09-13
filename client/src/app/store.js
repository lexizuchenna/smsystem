import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/admin/adminSlice";
import studentReducer from "../features/student/studentSlice";
import sTeacherReducer from "../features/subTeacher/sTeacherSlice";
import fTeacherReducer from "../features/formTeacher/fTeacherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    student: studentReducer,
    sTeacher: sTeacherReducer,
    fTeacher: fTeacherReducer,
  },
});
