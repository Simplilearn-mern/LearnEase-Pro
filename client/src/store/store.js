import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authStore/authSlice";
import courseReducer from "../features/coursesStore/courseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer
  }
});